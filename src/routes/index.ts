import express from 'express'
import Client from 'twitter-api-sdk'
import { getAuthClient, getTwitterClient } from '../twitter'
import { expressjwt, Request as JWTRequest } from "express-jwt";
import { Tweet, TwitterUser } from '../types/Twitter';
import { signUserJWT } from '../utils/jwt';
import { createQueryStringURL } from '../utils';
import config from '../config';

const router = express.Router()

router.get('/')

router.get('/login', async function (req: JWTRequest, res) {
  try {
    const { code, state } = req.query;
    if (state !== config.twitterApi.loginState) return res.status(500).send("State isn't matching");
    const authClient = getAuthClient()
    authClient.generateAuthURL({
      state: config.twitterApi.loginState,
      code_challenge: "code-challenge"
    })
    const token = await authClient.requestAccessToken(code as string);
    getAuthClient().token= token.token
    const jwt = signUserJWT({
      twitterToken: token.token
    })
    res.redirect(createQueryStringURL(`completeAuth?token=${jwt}`));
  } catch (error) {
    console.log(error);
    res.redirect(createQueryStringURL('failed-login'))
  }
});

router.get("/authorize", async function (req, res) {
  const authUrl = getAuthClient().generateAuthURL({
    state: config.twitterApi.loginState,
    code_challenge: "code-challenge"
  });
  res.redirect(authUrl);
});



router.get("/bookmarks", async function (req: JWTRequest, res) {
  try {
    const authClient = getAuthClient()
    authClient.token = req.auth!.twitterToken
    const twitterClient = new Client(authClient)
    const user = await twitterClient.users.findMyUser();
    const data = await twitterClient.bookmarks.getUsersIdBookmarks(user.data?.id!, {
      expansions: ['author_id',],
      "user.fields": ['name', 'profile_image_url', 'username'],
    })
    const users: TwitterUser[] = data.includes?.users as TwitterUser[]
    const tweets: Tweet[] = data.data as Tweet[]
    const info = []
    for (let i = 0; i < tweets.length; i++) {
      const tweet = tweets[i]
      const user = users.find((u) => u.id == tweet.author_id)!
      info.push({
        id: tweet.id,
        text: tweet.text,
        username: user.username,
        name: user.name,
        profile_image_url: user.profile_image_url,
      })
    }
    res.send(info);
  } catch (error) {
    console.log("tweets error", error);
  }
});

export default router
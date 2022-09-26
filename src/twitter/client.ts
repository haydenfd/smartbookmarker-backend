import Client, { auth } from "twitter-api-sdk";
import { User } from "../types/User";

export const getAuthClient = () => new auth.OAuth2User({
  client_id: 'c25UXzlnMkFlMm01cHNBY3lsUl86MTpjaQ',
  client_secret: 'Y_SX2dhiAHWgvQKUQbegOsdnB6fzxIf2TCKHHur7N5O3NdUbpx',
  callback: "http://127.0.0.1:5000/api/login",
  scopes: ["users.read", "tweet.read", "bookmark.read"]
})

export const getTwitterClient = (user: User) => {

}
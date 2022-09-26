export interface TwitterUser {
  username: string,
  name: string,
  id: string,
  name: string,
  profile_image_url: string
}

export interface Tweet {
  id: string,
  text: string,
  author_id: string
}
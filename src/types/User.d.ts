export interface User {
  twitterToken: {
    refresh_token?: string;
    access_token?: string;
    token_type?: string;
    expires_at?: Date;
    scope?: string;
  }
}
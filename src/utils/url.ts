import config from "../config"

export const createQueryStringURL = (query: string | "") => {
  return `${config.app.appUrl}/${query}`
}
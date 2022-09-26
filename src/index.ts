import app from './app';
import config from './config';

app.listen(config.app.port, () => {
  console.log(`Listening on ${config.app.port}`)
})
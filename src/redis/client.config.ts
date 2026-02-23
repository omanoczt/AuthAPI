import { createClient } from "redis";
import logger from "../internal/logger";

export const redis_client = createClient({
  socket: {
    host: process.env.REDIS_CLIENT_HOST!,
    port: 10000
  }
});

redis_client.on('error', (err) => {
  logger.redis.fail(`An error occurred:`);
  console.log(err);
})

redis_client.on('connect', () => {
  logger.redis.ok(`Started successfuly!`);
})

export const redis_connect = async () => {
  try {
    await redis_client.connect();
    return true;
  } catch (error) {
    logger.redis.fail(`An error occurred while trying to connect with client!`);
    return false;
  }
}
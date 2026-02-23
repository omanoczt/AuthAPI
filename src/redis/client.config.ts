import { createClient } from "redis";
import logger from "../internal/logger";

export const redis_client = createClient({
  url: process.env.REDIS_CLIENT_URI!
});

redis_client.on('error', (err) => {
  logger.redis.fail(`An error occurred: ${err.name}`);
})

redis_client.on('connect', () => {
  logger.redis.ok(`Started successfuly!`);
})

export const redis_connect = async () => {
  try {
    await redis_client.connect();
  } catch (error) {
    logger.redis.fail(`An error occurred while trying to connect with client!`);
  }
}
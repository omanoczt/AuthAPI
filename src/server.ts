import app from "./app";
import dotenv from "dotenv";
import logger from "./internal/logger";
import { Request, Response } from "express";
import { ConnectDatabase } from "./database/connection";
import { redis_connect } from "./redis/client.config";
dotenv.config({
  quiet: true
});

ConnectDatabase().then(success => {
  if(!success) {
    logger.server.fail('Server session stopped by: Database connection error.');
    return;  
  }

  redis_connect().then(_success => {
    if(!success) {
      logger.server.fail('Server session stopped by: Redis connection error.');
      return;
    }

    app.listen(process.env.PORT, () => {
      logger.server.ok('Running!');
    });
  })
})

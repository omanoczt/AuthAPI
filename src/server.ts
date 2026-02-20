import app from "./app";
import dotenv from "dotenv";
import logger from "./internal/logger";
import { Request, Response } from "express";
import { ConnectDatabase } from "./database/connection";
dotenv.config({
  quiet: true
});

app.get('/test', (req: Request, res: Response)=> {
  res.json({
    test: 'tested'
  });

  return;
})

ConnectDatabase().then(success => {
  if(!success) {
    logger.server.fail('Server session stopped by: Database connection error.');
    return;  
  }

  app.listen(process.env.PORT, () => {
    logger.server.ok('Running!');
  });
})

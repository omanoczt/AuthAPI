import mongoose from "mongoose";
import logger from "../internal/logger";

/**
 * Try to connect with the database
 * @returns boolean - `true` for connected | `false` for connection fail
 */
export async function ConnectDatabase(): Promise<boolean> {
  try {
    await mongoose.connect(process.env.DATABASE_URI!);
    logger.database.ok('Connected!');
    return true;
  } catch (err) {
    logger.database.fail(`${(err as Error).message}`);
    return false;
  }
}
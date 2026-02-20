import { ErrorCode } from "../types/ErrorCodes";
import Result, {Error} from "../types/Result";
import unknownError from "./error/unknownError";

export default <T>(success: boolean, error?: Error, data?: T): Result<T> =>{
  if(success) {
    return {
      success: true,
      data: data as T
    }
  }

  return {
    success: false,
    error: error ?? unknownError
  }
}
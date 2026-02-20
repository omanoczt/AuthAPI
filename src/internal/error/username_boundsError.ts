import { ErrorCode } from "../../types/ErrorCodes";
import { Limit } from "../../types/Limit";

export default {code: ErrorCode.username_bounds, name: 'Username length out of bounds', message: `The username length must be between ${Limit.MIN_USERNAME_LEN} and ${Limit.MAX_USERNAME_LEN} characters.`};
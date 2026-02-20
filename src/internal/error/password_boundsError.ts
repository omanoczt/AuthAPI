import { ErrorCode } from "../../types/ErrorCodes";
import { Limit } from "../../types/Limit";

export default {code: ErrorCode.password_bounds, name: 'Password length out of bounds', message: `The password length must be between ${Limit.MIN_PASSWORD_LEN} and ${Limit.MAX_PASSWORD_LEN} characters.`};
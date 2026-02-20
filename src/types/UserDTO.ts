import { Limit } from "./Limit";
import UserData from "./UserData";
import {z} from "zod";

export const UserInputSchema = z.object({
  username: z.string().min(Limit.MIN_USERNAME_LEN).max(Limit.MAX_USERNAME_LEN),
  password: z.string().min(Limit.MIN_PASSWORD_LEN).max(Limit.MAX_PASSWORD_LEN),
});

export type UserInputDTO = z.infer<typeof UserInputSchema>;

export type UserOutputDTO = Omit<UserData, 'password'>;
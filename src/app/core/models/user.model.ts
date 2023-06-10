import {LevelEnum} from "./level.enum";

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  level: LevelEnum;
  createdAt: Date;

}

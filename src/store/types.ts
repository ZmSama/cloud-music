/*
 * @Description:state类型声明
 * @Autor: ZmSama
 * @Date: 2021-06-09 11:09:51
 */
import { playModelType } from './playModel/type';
import { userModelType } from './userModel/typs';
export interface RooteStateType {
  name: string;
  playModel: playModelType;
  userModel: userModelType;
}

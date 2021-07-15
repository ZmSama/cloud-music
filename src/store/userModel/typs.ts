/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-07-14 15:54:15
 */
export interface UserInfo {
  name: string;
  id: string;
  avater: string;
  signature: string;
  gender: number;
  city: number;
  province: number;
}

export interface userModelType {
  info: UserInfo;
}

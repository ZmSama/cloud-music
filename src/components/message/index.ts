/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-06-03 10:10:04
 */
import Message from './src/message';
const _Message: any = Message;
_Message.install = app => {
  app.config.globalProperties.$message = _Message;
};

export default _Message;

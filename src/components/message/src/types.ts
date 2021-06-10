/*
 * @Description:类型文件
 * @Autor: ZmSama
 * @Date: 2021-06-03 13:54:09
 */
export type InfoType = 'success' | 'warning' | 'info' | 'error';
export type IMassgeOptions = {
  duration?: number; //持续时间
  message?: string; //内容
  type?: InfoType; //类型
  zIndex?: number; //层级
  icon?: string; //图标
  offset?: number; //偏移量
  onClose?: () => void;
};

/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-07-05 10:06:14
 */
import { h } from 'vue';
import { TableColumnCtx } from '../types/index';

/**
 * @msg:生成标定行
 * @param {TableColumnCtx} columns
 * @return {*}
 */
export function hColgroup(columns: TableColumnCtx[]) {
  return h('colgroup', {}, [
    ...columns.map(column =>
      h('col', {
        name: column.prop,
        key: column.id,
        width: column.width,
      })
    ),
  ]);
}

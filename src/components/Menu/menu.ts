/*
 * @Description:规定provide和inject类型接口
 * @Autor: ZmSama
 * @Date: 2021-05-20 14:44:59
 */
import { Ref } from 'vue';
import { Emitter } from 'mitt';
export interface MenuRootProvider {
    activeIndex: Ref<number>;
    menuEmiter: Emitter['emit'];
    menuOn: Emitter['on'];
}

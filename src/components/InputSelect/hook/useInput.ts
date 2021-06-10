/*
 * @Description:输入框的逻辑封装
 * @Autor: ZmSama
 * @Date: 2021-05-13 16:52:39
 */
import { Ref, ref, reactive, toRefs } from 'vue';

export default function useInput(arr: any) {
  const isFocus = ref(false);
  const isLookMore = ref(false);
  const inputContent = ref(null);
  const index: Ref<number | null> = ref(null);
  // 取出其中的6项历史记录渲染成按钮
  const state = reactive({
    HistoryBaseData: arr.slice(0, 6),
  });

  // 输入框获取焦点要做的事
  const inputFocusHandler = () => {
    isFocus.value = true;
  };
  // 清空输入框内容
  const cleanContent = () => {
    inputContent.value = null;
  };

  // 响应自定义指令的操作
  const handleCloseDrective = () => {
    isFocus.value = false;
  };

  // 清空历史记录
  const cleanHistory = () => {
    state.HistoryBaseData = [];
  };

  // 查看更多
  const lookMoreHandler = () => {
    state.HistoryBaseData = arr;
    isLookMore.value = true;
  };

  // 点击每个历史记录上的删除,为其绑上一个动画
  const deleteHistoryItem = (id, i) => {
    let findIndex = state.HistoryBaseData.findIndex(item => item.id == id);
    // 让index等于i就能绑定样式
    index.value = i;
    state.HistoryBaseData.splice(findIndex, 1);
  };

  const { HistoryBaseData } = toRefs(state);

  return {
    isFocus,
    inputContent,
    inputFocusHandler,
    cleanContent,
    handleCloseDrective,
    HistoryBaseData,
    lookMoreHandler,
    deleteHistoryItem,
    index,
    cleanHistory,
    isLookMore,
  };
}

/*
 * @Description:输入框的逻辑封装
 * @Autor: ZmSama
 * @Date: 2021-05-13 16:52:39
 */
import { HISTORY_KEY } from '@/utils/local-key';
import { getItem, removeItem, setItem } from '@/utils/localStorage';
import { ElMessageBox } from 'element-plus';
import { Ref, ref, reactive, onMounted, toRefs } from 'vue';

export default function useInput() {
  const index: Ref<number | null> = ref(null);
  const state = reactive({
    isFocus: false,
    isLookMore: false,
    inputContent: null,
    HistoryData: [],
  });

  // 输入框获取焦点要做的事
  const inputFocusHandler = () => {
    state.isFocus = true;
  };
  // 清空输入框内容
  const cleanContent = () => {
    state.inputContent = null;
  };

  // 响应自定义指令的操作
  const handleCloseDrective = () => {
    state.isFocus = false;
  };

  // 清空历史记录
  const cleanHistory = () => {
    state.isFocus = false;
    ElMessageBox.confirm('是否删除所有的历史记录？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      removeItem(HISTORY_KEY);
      updateLayout(0);
    });
  };

  // 查看更多
  const lookMoreHandler = () => {
    getItem(HISTORY_KEY).then((res: any[]) => {
      // 这时就加载全部
      state.HistoryData = res;
    });
    state.isLookMore = true;
  };

  // 点击每个历史记录上的删除,为其绑上一个动画
  const deleteHistoryItem = (item, i) => {
    let idx = state.HistoryData.findIndex(e => e === item);
    let rResult = state.HistoryData.splice(idx, 1)[0];

    getItem(HISTORY_KEY).then((res: any[]) => {
      let arr = [];
      // 得到非删除项目
      arr = res.filter(item => item !== rResult);
      // 保存回本地
      setItem(HISTORY_KEY, arr);
    });
    // 让index等于i就能绑定样式
    index.value = i;
  };

  // 加载视图数据
  const updateLayout = (total: number) => {
    getItem(HISTORY_KEY).then((res: any[]) => {
      // 一开始只取出6条数据
      if (res) {
        state.HistoryData = res.slice(0, total);
        state.isLookMore = false;
      } else {
        state.HistoryData = [];
      }
    });
  };

  // 点击输入框时
  const inputClick = () => {
    if (!state.isFocus) {
      state.isFocus = true;
    }
  };

  onMounted(() => {
    updateLayout(6);
  });

  return {
    inputFocusHandler,
    cleanContent,
    handleCloseDrective,
    lookMoreHandler,
    deleteHistoryItem,
    ...toRefs(state),
    index,
    cleanHistory,
    updateLayout,
    inputClick,
  };
}

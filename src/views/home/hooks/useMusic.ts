/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-07-07 16:00:04
 */
import { reactive, toRefs, computed, onMounted, watch } from 'vue';
import { useStore } from '@/store/index';
export function useMusic() {
  const state = reactive({
    isOpen: false,
    curIcon: 'bofang2',
    index: 0,
    timer: null,
    music: null,
    curMusic: null,
    curPlayPic: '',
    duration: '',
    current: '',
    progressBar: null as HTMLElement,
    progressBuffBar: null as HTMLElement,
  });

  const store = useStore();

  const { play, audioRef } = toRefs(store.state.playModel);
  /**
   * @msg: 播放音乐
   * @param {*}
   * @return {*}
   */
  const playMusic = () => {
    store.commit('playModel/PLAY_MUSIC');
  };

  /**
   * @msg: 暂停音乐
   * @param {*}
   * @return {*}
   */
  const pauseMusic = () => {
    store.commit('playModel/PAUSE_MUSIC');
  };

  /**
   * @msg: 更新状态
   * @param {*}
   * @return {*}
   */
  const updateMusicStatus = () => {
    audioRef.value.addEventListener('timeupdate', e => {
      // 得到总时长
      const duration = e.target['duration'];
      if (!state.duration) {
        // // 计算得到分钟
        let totalMin = Math.floor(duration / 60);
        // // 计算得到秒钟，不断对60取余数，不足60s的就是最终的秒钟
        let totalSec = Math.floor(duration % 60);
        // // 不足10s补0
        state.duration = `${totalMin}:${totalSec > 10 ? totalSec : '0' + totalSec}`;
      }
      audioRef.value.addEventListener('loadeddata', () => {
        // 得到音乐总时长
        let audioDuration = audioRef.value.duration;
        console.log(audioDuration);
        // 计算得到分钟
        let totalMin = Math.floor(audioDuration / 60);
        // 计算得到秒钟，不断对60取余数，不足60s的就是最终的秒钟
        let totalSec = Math.floor(audioDuration % 60);
        // 不足10s补0
        state.duration = `${totalMin}:${totalSec > 10 ? totalSec : '0' + totalSec}`;
      });
      // 得到当前播放的时间
      const currentTime = e.target['currentTime'];
      store.commit('playModel/SET_CURRENT_TIME', currentTime);
      // 相除乘于100后就可以得到百分比数,这个就是进度条的长度
      let progresswidt = (currentTime / duration) * 100;
      // 改变进度条
      state.progressBar.style.width = progresswidt + '%';
      let currMin = Math.floor(currentTime / 60);
      // 得到秒钟，不断对60取余数，不足60s的就是最终的秒钟
      let currSec = Math.floor(currentTime % 60);
      // 改变当前时间
      state.current = `${currMin}:${currSec}`;

      // 播放结束时
      audioRef.value.addEventListener('pause', () => {
        store.commit('playModel/PAUSE_MUSIC');
      });
    });

    audioRef.value.addEventListener('progress', e => {
      // console.log(e);
    });
  };

  /**
   * @msg: 重置音乐状态
   * @param {*}
   * @return {*}
   */
  const resetMusicState = () => {
    state.progressBar.style.width = '0';
    state.progressBuffBar.style.width = '0';
  };

  /**
   * @msg: 返回音乐总时长
   * @param {number} size
   * @return {*}
   */
  const getSongTime = (size: number) => {
    // 计算得到分钟
    let totalMin = Math.floor(size / 60);
    // 计算得到秒钟，不断对60取余数，不足60s的就是最终的秒钟
    let totalSec = Math.floor(size % 60);
    return `${totalMin < 10 ? '0' + totalMin : totalMin}:${
      totalSec < 10 ? '0' + totalSec : totalSec
    }`;
  };

  /**
   * @msg: 点击进度条时触发的事件
   * @param {MouseEvent} e
   * @return {*}
   */
  const clickProgressArea = (e: MouseEvent) => {
    // 得到容器长度
    let progressWidth = e.target['clientWidth'];
    // 得到点击的坐标
    let clickOffsetX = e.offsetX;
    //   得到播放总时长
    let songDuration = audioRef.value.duration;
    //  改变当前的时间
    audioRef.value.currentTime = (clickOffsetX / progressWidth) * songDuration;

    playMusic();
  };

  /**
   * @msg: 拖动小点点时触发
   * @param {MouseEvent} e
   * @return {*}
   */
  const draggerDot = (e: MouseEvent) => {
    console.log(e);
  };
  watch(
    () => play.value,
    val => {
      if (val) {
        updateMusicStatus();
      } else {
      }
    }
  );
  return {
    getSongTime,
    playMusic,
    pauseMusic,
    resetMusicState,
    ...toRefs(state),
    clickProgressArea,
    draggerDot,
  };
}

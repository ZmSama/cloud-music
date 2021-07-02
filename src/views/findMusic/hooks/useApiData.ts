/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-06-30 14:59:21
 */
import { toRefs, reactive } from 'vue';
import {
  HOMEPAGE_BLOCK_PAGE,
  GET_RECOMMAND_SONG,
  GET_NEW_RECOMMAND_SONG,
  GET_RECOMMAND_MV,
} from '@/api/modules/base';
import { PERSONALIZED_PRIVATECONTENT } from '@/api/modules/personalized';
export default function useApiData() {
  const HOMEPAGE = reactive({
    bannerList: [],
    recomendList: {},
    personalied: [],
    newRecommandSong: [],
    recommandMV: [],
  });

  /**
   * @msg: 得到首页轮播图数据
   * @param {*}
   * @return {*}
   */
  const getBannerData = async () => {
    let res = await HOMEPAGE_BLOCK_PAGE();
    const type: [
      {
        code: string;
        index: number;
      }
    ] = res.data.data.blocks.map((item, index) => {
      return {
        code: item.blockCode,
        index,
      };
    });
    type.forEach(item => {
      switch (item.code) {
        case 'HOMEPAGE_BANNER':
          HOMEPAGE.bannerList = res.data.data.blocks[item.index].extInfo.banners;
          break;
      }
    });
  };
  /**
   * @msg: 得到独家推送数据
   * @param {*}
   * @return {*}
   */
  const getPersonalizedData = async () => {
    let res = await PERSONALIZED_PRIVATECONTENT();
    HOMEPAGE.personalied = res.data.result;
  };

  /**
   * @msg: 得到推荐歌单
   * @param {*}
   * @return {*}
   */
  const getRecommandData = async () => {
    let res = await GET_RECOMMAND_SONG();
    let arr = res.data.result as Array<any>;
    HOMEPAGE.recomendList = arr.slice(0, 9);
  };

  /**
   * @msg: 得到推荐的最新音乐
   * @param {*}
   * @return {*}
   */
  const getNewRecommandSongData = async () => {
    let res = await GET_NEW_RECOMMAND_SONG({ limit: 12 });
    HOMEPAGE.newRecommandSong = res.data.result;
  };

  /**
   * @msg: 得到推荐的MV
   * @param {*}
   * @return {*}
   */
  const getRecommandMV = async () => {
    let res = await GET_RECOMMAND_MV();
    let arr = res.data.result as Array<any>;
    if (arr.length > 3) {
      HOMEPAGE.recommandMV = arr.slice(0, 3);
    } else {
      HOMEPAGE.recommandMV = arr;
    }
  };

  return {
    ...toRefs(HOMEPAGE),
    getBannerData,
    getPersonalizedData,
    getRecommandData,
    getNewRecommandSongData,
    getRecommandMV,
  };
}

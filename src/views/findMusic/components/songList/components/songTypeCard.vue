<!--
 * @Description: 歌单种类组件
 * @Autor: ZmSama
 * @Date: 2021-07-13 10:53:25
-->
<template>
  <div class="zm-type-card">
    <div class="zm-type-card__header" @click="changeAll">
      <span>全部歌单</span>
    </div>
    <div class="zm-type-card__content">
      <div class="item" v-for="(item, i) in songListType" :key="i">
        <div class="type">
          <i :class="iconClass(item.type)"></i>
          <span>{{ item.name }}</span>
        </div>
        <div class="type-details">
          <div
            class="details-item"
            :class="curType === item2.name && 'is-active'"
            @click="selectItem(item2.name)"
            v-for="(item2, i2) in item.children"
            :key="i2"
          >
            {{ item2.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { GET_SONG_LIST_TYPE } from '@/api/modules/music';
import { ISongList } from '@/typs/models/music';
export default defineComponent({
  name: 'SongTypeCard',
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: ['select-change', 'update:modelValue'],

  setup(props, { emit }) {
    const state = reactive({
      songListType: [] as ISongList[],
      curType: '',
    });
    //   得到歌单分类
    const getSongListType = async () => {
      let res = await GET_SONG_LIST_TYPE();
      let sub = res.data.sub as any[];
      let categories = res.data.categories;
      // 先把主类型放入
      for (const key in categories) {
        state.songListType.push({
          name: categories[key],
          type: parseInt(key),
          children: [],
        });
      }
      //   根据主类型的type寻找他的所有子类型
      state.songListType.forEach(item => {
        sub.forEach(item2 => {
          if (item2.category === item.type) {
            item.children.push({
              name: item2.name,
              type: item.type,
            });
          }
        });
      });
    };

    const iconClass = (type: number) => {
      switch (type) {
        case 0:
          return 'iconfont icon-diqiu';
        case 1:
          return 'iconfont icon-gangqin';
        case 2:
          return 'iconfont icon-kafei';
        case 3:
          return 'iconfont icon-lianxiaolianmanyi-';
        case 4:
          return 'iconfont icon-fengge';
      }
    };

    // 选择的类型
    const selectItem = (val: string) => {
      state.curType = val;
      emit('select-change', val);
      emit('update:modelValue', val);
    };

    // 选择全部
    const changeAll = () => {
      emit('select-change', 'all');
    };
    getSongListType();
    return {
      ...toRefs(state),
      iconClass,
      selectItem,
      changeAll,
    };
  },
});
</script>
<style lang="scss" scoped>
@include b(type-card) {
  width: 40vw;
  height: auto;
  font-size: 18px;
  @include e(header) {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: red;
    }
  }
  @include e(content) {
    margin-top: 10px;
    padding-left: 10px;
    @include jcc-aic;
    flex-direction: column;
    row-gap: 20px;
    .item {
      width: 100%;
      height: auto;
      @include jcc-aic-row;

      .type {
        @include jcc-aic-row;
        column-gap: 10px;
        color: #ccc;
      }
      .type-details {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        column-gap: 10px;
        margin-left: 30px;
        row-gap: 20px;
        width: 30vw;
        .details-item {
          padding: 3px 20px;
          font-size: 14px;
          cursor: pointer;
          transition: 0.3s all;
          &:hover {
            color: red;
          }
        }
        .is-active {
          color: red;
          background-color: rgb(254, 246, 245);
          border-radius: 14px;
        }
      }
    }
  }
}
</style>

<!--
 * @Description: 
 * @Autor: ZmSama
 * @Date: 2021-05-21 15:09:53
-->
<template>
  <div class="find-music">
    <tabs>
      <tab-pane label="个性推荐" height="74vh">
        <div class="zm-personalized">
          <Personalized :source="source" />
        </div>
      </tab-pane>
      <tab-pane label="歌单">
        <div>这是歌单内容</div>
      </tab-pane>
      <tab-pane label="主播电台">
        <div>这是主播电台内容</div>
      </tab-pane>
      <tab-pane label="排行榜">
        <div>这是排行榜内容</div>
      </tab-pane>
      <tab-pane label="歌手">
        <div>这是歌手内容</div>
      </tab-pane>
      <tab-pane label="最新音乐">
        <div>这是最新音乐内容</div>
      </tab-pane>
    </tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Personalized from './components/Personalized.vue';
export default defineComponent({
  name: 'findMusic',

  components: {
    Personalized,
  },
  setup() {
    const source = [
      {
        id: 1,
        label: 'Slider1',
        color: '#ff3399',
        pic: 'http://p1.music.126.net/O5hmcHHdJpABcArdHOXXZw==/109951166006223055.jpg?imageView&quality=89',
      },
      {
        id: 2,
        label: 'Slider2',
        color: '#99ffff',
        pic: 'http://p1.music.126.net/uhxClMS2xY2b48a-PsoG9g==/109951166006290269.jpg?imageView&quality=89',
      },
      {
        id: 3,
        label: 'Slider3',
        color: '#66cc00',
        pic: 'http://p1.music.126.net/Rgqg8zqkKiewTUMjh0GMCg==/109951166005126541.jpg?imageView&quality=89',
      },
      {
        id: 4,
        label: 'Slider4',
        color: '#0066ff',
        pic: 'http://p1.music.126.net/oMXHYkRHy5XbE0905ljqZg==/109951166005813356.jpg?imageView&quality=89',
      },
      {
        id: 5,
        label: 'Slider5',
        color: '#00ff33',
        pic: 'http://p1.music.126.net/IXXt2TECvZIeEVNUr1E_gA==/109951166004785770.jpg?imageView&quality=89',
      },
    ];
    return {
      source,
    };
  },
});
</script>
<style lang="scss" scoped>
.find-music {
  padding: 15px;
}

@include b(personalized) {
  padding-bottom: 30px;
}
</style>

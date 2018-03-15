<template>
  <section class="recom">
    <div :data="songListData" class="scroll">
      <div class="wrap" v-if="recommandData.slider">
        <div class="slider">
          <slider ref="slider">
            <div v-for="(item, index) of recommandData.slider" :key="index" class="slider-item">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <song-list :listData="radioListData" listTitle="电台" @click.native="linkToRadio"></song-list>
        <song-list :listData="songListData" listTitle="热门歌单" @linkToList="linkToList"></song-list>
        <music-footer></music-footer>
      </div>
    </div>
    <loading v-show="!recommandData.slider">
      {{recommandData.slider}}
    </loading>
    <transition name="radio">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { getRecommandData } from '@/api/data'
import { ERR_OK } from '@/api/config'
import Slider from '@/components/Slider/BaseSlider'
import Loading from '@/components/Loading/BaseLoading'
import SongList from '@/components/SongList/BaseSongList'
import MusicFooter from '@/views/Footer/MusicFooter'

export default {
  components: {
    Slider,
    Loading,
    SongList,
    MusicFooter
  },
  data() {
    return {
      recommandData: {}
    }
  },
  computed: {
    radioListData() {
      return this.recommandData.radioList
    },
    songListData() {
      return this.recommandData.songList
    }
  },
  created() {
    this.$_recommandData()
  },
  methods: {
    $_recommandData() {
      getRecommandData().then(res => {
        if (res.code === ERR_OK) this.recommandData = res.data
      })
    },
    linkToList(id) {
      location.href = `https://y.qq.com/w/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id=${id}`
    },
    linkToRadio() {
      this.$router.push('/radio')
    }
  }
}
</script>

<style lang="scss" scoped>
.recom {
  .scroll {
    overflow: hidden;
    .slider {
      margin-bottom: 20px;
      .slider-item {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a {
          display: block;
          width: 100%;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
          }
        }
      }
    }
  }
}
.radio-enter-active,
.radio-leave-active {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.radio-enter,
.radio-leave-to {
  transform: translate3d(0, -100%, 0);
}
</style>

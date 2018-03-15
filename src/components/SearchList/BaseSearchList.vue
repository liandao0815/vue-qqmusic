<template>
  <section class="wrapper">
    <div class="search-list">
      <div class="search-result" v-show="showSongList">
        <ul v-if="searchData.keyword">
          <li
            v-if="searchData.zhida.type === 2"
            class="singer"
            @click="linkToSinger(searchData.zhida.singermid)"
          >
            <div class="pic">
              <img
                :src="`https://y.gtimg.cn/music/photo_new/T001R68x68M000${searchData.zhida.singermid}.jpg`"
                class="avater">
            </div>
            <div class="content">
              <h6 class="main-tit">{{searchData.zhida.singername}}</h6>
              <p class="sub-tit">
                <span>单曲：{{searchData.zhida.songnum}}</span>
                <span>专辑：{{searchData.zhida.albumnum}}</span>
              </p>
            </div>
          </li>
          <li
            v-if="searchData.zhida.type === 3"
            class="album"
            @click="linkToalbum(searchData.zhida.albummid)"
          >
            <div class="pic">
              <img
                :src="`https://y.gtimg.cn/music/photo_new/T002R68x68M000${searchData.zhida.albummid}.jpg`"
                class="media">
            </div>
            <div class="content">
              <h6 class="main-tit">{{searchData.zhida.albumname}}</h6>
              <p class="sub-tit">{{searchData.zhida.singername}}</p>
            </div>
          </li>
          <li
            class="search-item"
            v-for="(item, index) of searchData.song.list"
            :key="index"
            @click="linkToSong(item.songmid)"
          >
            <div class="pic">
              <i class="song-icon"></i>
            </div>
            <div class="content">
              <h6 class="main-tit">{{item.songname}}</h6>
              <p class="sub-tit">{{getSinger(item.singer)}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="search-loading" v-show="showLoading">
        <i class="loading-icon"></i>
        <span class="loading-text">
          正在载入更多...
        </span>
      </div>
    </div>
    <div class="complete-loading" v-show="isShowAll">已加载全部</div>
  </section>
</template>

<script>
import Singer from '@/assets/js/singer'

export default {
  props: {
    searchData: Object,
    isShowAll: {
      type: Boolean,
      required: true,
      default: false
    },
    showLoading: {
      type: Boolean,
      required: true,
      default: false
    },
    showSongList: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    getSinger(singer) {
      let singerObj = new Singer(singer)
      return singerObj.getSinger()
    },
    linkToalbum(val) {
      location.href =
        `https://y.qq.com/w/album.html?albummid=${val}&ADTAG=myqq&from=myqq&channel=10007100`
    },
    linkToSinger(val) {
      location.href =
        `https://y.qq.com/w/singer.html?singermid=${val}&ADTAG=myqq&from=myqq&channel=10007100`
    },
    linkToSong(val) {
      location.href =
        `https://i.y.qq.com/v8/playsong.html?songmid=${val}&ADTAG=myqq&from=myqq&channel=10007100`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base';

.wrapper {
  width: 100%;
  background: $color-bg;
  .search-list {
    .search-result {
      li {
        display: flex;
        height: 110px;
        .pic {
          width: 110px;
          height: 100%;
          position: relative;
        }
        .content {
          flex: 1;
          overflow: hidden;
          .main-tit {
            margin: 20px 0 4px;
            line-height: 36px;
            font-size: 32px;
            font-weight: normal;
            color: #000;
            @include noWrap();
          }
          .sub-tit {
            color: #808080;
            @include noWrap();
            font-size: 24px;
            margin: 0;
            span {
              margin-right: 20px;
            }
          }
        }
      }
    }
    .search-loading {
      position: relative;
      height: 110px;
      line-height: 110px;
      text-align: center;
      .loading-icon {
        vertical-align: middle;
        position: relative;
        top: -4px;
        display: inline-block;
        width: 40px;
        height: 40px;
        @include bgImage('./loading-icon.webp');
        background-size: 40px 40px;
        animation: loading 1s infinite linear;
      }
      .loading-text {
        margin-left: 10px;
        font-size: 24px;
        color: #808080;
      }
    }
  }
  .complete-loading {
    line-height: 80px;
    text-align: center;
    color: #808080;
    font-size: 24px;
  }
}
@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.avater {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 999px;
  @include center();
}
.media {
  display: block;
  width: 80px;
  height: 80px;
  @include center();
}
.song-icon {
  position: absolute;
  top: 36px;
  left: 36px;
  width: 44px;
  height: 40px;
  background-position: 0 0;
  @include bgImage('./song-icon.png');
  background-size: 44px 60px;
}
</style>

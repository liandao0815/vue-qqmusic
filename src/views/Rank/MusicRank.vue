<template>
  <section class="rank">
    <div class="top-list" v-show="rankData.length">
      <ul>
        <li class="item" v-for="(item, index) of rankData" :key="index" @click="linkTo(item.id)">
          <div class="pic">
            <img :src="item.picUrl" width="100%" height="100%">
            <span class="listen-count">
              <i class="listen-icon"></i>
              {{item.listenCount | listenCount}}
            </span>
          </div>
          <ul class="song-list">
            <div class="info-wrap">
              <span class="top-title">{{item.topTitle}}</span>
              <li class="song" v-for="(song, index) of item.songList" :key="index">
                <span class="index">{{index + 1}}</span>
                <span><span class="text-name">{{song.songname}}</span> - {{song.singername}}</span>
              </li>
              <i class="topic-arrow"></i>
            </div>
          </ul>
        </li>
      </ul>
      <footer class="rank-more">
        <a class="rank-link" href="javascript:;">去客户端发现更多好音乐 ></a>
      </footer>
    </div>
    <loading v-show="!rankData.length"></loading>
  </section>
</template>

<script>
import { getRankData } from '@/api/data'
import { ERR_OK } from '@/api/config'
import Loading from '@/components/Loading/BaseLoading'

export default {
  components: {
    Loading
  },
  data() {
    return {
      rankData: []
    }
  },
  filters: {
    listenCount(value) {
      if (!value) return ''
      let newValue = (value / 10000).toFixed(1)
      return `${newValue}万`
    }
  },
  created() {
    this.$_getRankData()
  },
  methods: {
    $_getRankData() {
      getRankData().then(res => {
        if (res.code === ERR_OK) this.rankData = res.data.topList
      })
    },
    linkTo(id) {
      location.href = `https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=${id}&type=top`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base';

.rank {
  width: 100%;
  .top-list {
    margin: 20px;
    height: 100%;
    .item {
      display: flex;
      height: 200px;
      margin-bottom: 20px;
      .pic {
        flex: 0 0 200px;
        position: relative;
        .listen-count {
          position: absolute;
          display: block;
          left: 10px;
          bottom: 14px;
          line-height: 24px;
          color: #fff;
          opacity: 0.6;
          font-size: 18px;
          z-index: 10;
          .listen-icon {
            display: block;
            float: left;
            margin-right: 6px;
            width: 20px;
            height: 20px;
            background-position: 0 -100px;
            @include bgImage('./list-icon.png');
            background-size: 48px 120px;
            z-index: 10;
          }
        }
        &::after {
          content: '';
          position: absolute;
          display: block;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background-image: url('./shadow.png');
          background-size: 2px 234px;
          background-repeat: repeat-x;
        }
      }
      .song-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 200px;
        overflow: hidden;
        background: $color-bg;
        .info-wrap {
          margin: 0 20px 0 30px;
          position: relative;
          .top-title {
            display: block;
            font-size: 32px;
            color: #000;
            font-weight: 400;
            margin-top: 10px;
            margin-bottom: 20px;
          }
          .song {
            @include noWrap();
            font-size: 28px;
            margin: 10px -10px;
            color: $color-text;
            font-weight: 400;
            .text-name {
              color: #000;
            }
            .index {
              display: inline-block;
              margin: 0 10px 0;
            }
          }
          .topic-arrow {
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -8px;
            width: 12px;
            height: 12px;
            border-right: 2px solid #b2b2b2;
            border-bottom: 2px solid #b2b2b2;
            transform: rotate(-45deg);
          }
        }
      }
    }
    .rank-more {
      height: 80px;
      line-height: 80px;
      text-align: center;
      .rank-link {
        display: inline-block;
        padding: 0 20px;
        font-size: 28px;
        color: $color-text;
        text-decoration: none;
      }
    }
  }
}
</style>

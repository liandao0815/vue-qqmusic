<template>
  <section class="container">
    <div class="list">
      <h2 class="list-title">{{ listTitle }}</h2>
      <ul class="list-wrap">
        <li class="list-item"
            v-for="(item, index) of listData"
            :key="index"
            @click="linkToSongList(item.id ? item.id : '')"
        >
          <div class="list-content">
            <div class="list-main">
              <img :src="item.picUrl" @click.prevent>
              <i class="list-icon"></i>
            </div>
            <div class="list-info">
              <h3 class="list-tit">{{ item.Ftitle ? item.Ftitle : item.songListDesc }}</h3>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    listTitle: {
      type: String,
      default: '',
      required: true
    },
    listData: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    linkToSongList(id) {
      this.$emit('linkToList', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base';

.container {
  width: 100%;
  .list {
    margin: 0 20px;
    overflow: hidden;
    .list-title {
      font-size: 32px;
      line-height: 48px;
      color: #000;
      margin: 0 4px 22px;
      font-weight: normal;
    }
    .list-wrap {
      margin-right: -16px;
      margin-bottom: 10px;
      padding: 0;
      list-style: none;
      overflow: hidden;
      .list-item {
        float: left;
        width: 50%;
        padding-right: 16px;
        box-sizing: border-box;
        margin-bottom: 20px;
        overflow: hidden;
        .list-content {
          background: $color-bg;
          .list-main {
            position: relative;
            margin-bottom: 10px;
            &::before {
              content: '';
              display: block;
              padding-top: 100%;
            }
            img {
              position: absolute;
              top: 0;
              left: 0;
              display: block;
              width: 100%;
              z-index: 1;
            }
            .list-icon {
              position: absolute;
              bottom: 10px;
              right: 10px;
              width: 48px;
              height: 48px;
              display: block;
              @include bgImage('./list-icon.png');
              z-index: 10;
            }
          }
          .list-info {
            padding: 0 14px 10px;
            color: #000;
            .list-tit {
              margin: 0;
              height: 72px;
              line-height: 36px;
              font-size: 28px;
              white-space: normal;
              word-wrap: break-word;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
}
</style>

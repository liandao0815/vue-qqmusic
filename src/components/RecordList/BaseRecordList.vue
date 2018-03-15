<template>
  <div class="record-list">
    <ul class="record-wrap">
      <li
        class="record-main"
        v-for="(item, index) of allStorage"
        :key="index"
      >
        <i class="record-icon"></i>
        <span class="record-text" v-text="item[0]" @click="sendData(item[0])"></span>
        <span class="record-close" @click="removeStorage(item[0])"></span>
      </li>
    </ul>
    <p class="record-clear" v-show="allStorage.length" @click="clearStorage">
      <span>清除搜索记录</span>
    </p>
  </div>
</template>

<script>
import { removeStorage, clearStorage } from '@/assets/js/storage'

export default {
  props: {
    allStorage: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    sendData(val) {
      this.$emit('sendData', val)
    },
    removeStorage(val) {
      removeStorage(val)
      this.$emit('alterStorage')
    },
    clearStorage() {
      clearStorage()
      this.$emit('alterStorage')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base';

.record-list {
  width: 100%;
  background: $color-bg;
  .record-wrap {
    border-top: 2px solid #ededed;
    padding: 0 30px;
    .record-main {
      position: relative;
      display: block;
      height: 88px;
      line-height: 88px;
      .record-icon {
        position: absolute;
        left: 0;
        top: 24px;
        width: 40px;
        height: 40px;
        @include bgImage('./record-icon.png');
      }
      .record-text {
        position: absolute;
        left: 80px;
        right: 100px;
        display: block;
        height: 88px;
        line-height: 88px;
        color: #000;
        font-size: 28px;
        @include noWrap();
      }
      .record-close {
        position: absolute;
        right: 0;
        top: 24px;
        width: 40px;
        height: 40px;
        &::before {
          position: absolute;
          left: 0;
          top: 16px;
          width: 34px;
          height: 2px;
          content: '';
          background: rgba(0, 0, 0, 0.6);
          transform: rotate(45deg);
        }
        &::after {
          position: absolute;
          left: 0;
          left: 16px;
          width: 2px;
          height: 34px;
          content: '';
          background: rgba(0, 0, 0, 0.6);
          transform: rotate(45deg);
        }
      }
    }
  }
  .record-clear {
    text-align: center;
    height: 88px;
    line-height: 88px;
    span {
      display: inline-block;
      line-height: 88px;
      color: #47c88a;
      font-size: 24px;
    }
  }
}
</style>

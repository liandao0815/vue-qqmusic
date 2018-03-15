<template>
  <div class="mask">
    <div class="radio">
      <i class="icon" @click="$router.back()">&times;</i>
      <span class="radio-tips">很抱歉，没有抓到接口😭。请尝试其他功能~</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base';

.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  .radio {
    @include center();
    width: 84%;
    height: 30%;
    z-index: 100;
    background: rgba($color: #fff, $alpha: 0.9);
    border-radius: 20px;
    overflow: hidden;
    .radio-tips {
      display: block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      padding: 0 80px;
      text-align: center;
      color: rgba($color: #000, $alpha: 0.9);
    }
    .icon{
      position: absolute;
      right: 18px;
      font-size: 48px;
      color: $color-text;
    }
  }
}
</style>

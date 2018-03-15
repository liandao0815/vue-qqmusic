<template>
  <div class="m-header">
    <i class="icon"></i>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/css/base';

.m-header {
  width: 100%;
  height: 88px;
  background: $color-theme;
  .icon {
    float: left;
    display: block;
    width: 180px;
    height: 50px;
    margin: 18px 0 0 20px;
    @include bgImage('./logo.png')
  }
}
</style>

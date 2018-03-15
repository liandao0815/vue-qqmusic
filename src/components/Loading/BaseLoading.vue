<template>
  <div class="loading-wrap">
    <i class="loading"></i>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/css/base';

.loading-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .loading {
    display: block;
    @include center();
    width: 300px;
    height: 300px;
    @include bgImage('./loading.gif')
  }
}
</style>

<template>
  <nav class="tab">
    <router-link tag="div" class="tab-link" to="/recommand">推荐</router-link>
    <router-link tag="div" class="tab-link" to="/rank">排行榜</router-link>
    <router-link tag="div" class="tab-link" to="/search">搜索</router-link>
  </nav>
</template>

<style lang="scss" scoped>
@import '../../assets/css/base';

.tab {
  display: flex;
  width: 100%;
  .tab-link {
    position: relative;
    flex: 1;
    display: block;
    line-height: 80px;
    overflow: hidden;
    text-align: center;
    color: $color-text;
    background: $color-bg;
  }
  .router-link-active {
    color: $color-theme;
  }
  .router-link-active::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: $color-theme;
  }
}
</style>

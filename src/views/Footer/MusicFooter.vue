<template>
  <footer class="footer">
    <span class="icon"><span class="text">QQ音乐</span></span>
    <p class="copyright">Copyright © 1998 - 2018 Tencent. All Rights Reserved.</p>
    <p class="copyright">Cover With Mr.Li</p>
  </footer>
</template>

<style lang="scss" scoped>
@import '../../assets/css/base';

.footer {
  padding: 30px 0;
  .icon {
    display: block;
    width: 164px;
    height: 48px;
    margin: 0 auto 20px;
    @include bgImage('./logo.png');
    .text{
      position: relative;
      top: 8px;
      left: 60px;
    }
  }
  .copyright {
    font-size: 22px;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>

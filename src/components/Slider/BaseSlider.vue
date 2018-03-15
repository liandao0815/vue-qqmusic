<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <p class="dots">
      <b
        class="dot"
        :class="{active: currentPageIndex === index}"
        v-for="(item, index) of dots"
        :key="index">
      </b>
    </p>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    data: Array
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$_setSliderWidth()
      this.$_initDots()
      this.$_initSlider()

      if (this.autoPlay) {
        this.$_play()
      }
    })

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this.$_setSliderWidth(true)
      this.slider.refresh()
    })
  },
  activated() {
    if (this.autoPlay) {
      this.$_play()
    }
  },
  deactivated() {
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    $_setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth

      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) width += 2 * sliderWidth
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    $_initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this.$_play()
        }
      })

      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    $_initDots() {
      this.dots = new Array(this.children.length)
    },
    $_play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    refresh() {
      this.slider && this.slider.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    margin: 0;
    padding: 0 12px;
    text-align: center;
    > .dot {
      display: inline-block;
      margin: 0 8px;
      width: 12px;
      height: 12px;
      border-radius: 6px;
      background: rgba(144, 144, 144, 0.8);
    }
    > .active {
      background: #fff;
    }
  }
}
</style>

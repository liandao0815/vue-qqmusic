<template>
  <div id="app">
    <music-header></music-header>
    <music-tab></music-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MusicHeader from '@/views/Header/MusicHeader'
import MusicTab from '@/views/Tab/MusicTab'

export default {
  components: {
    MusicHeader,
    MusicTab
  }
}
</script>

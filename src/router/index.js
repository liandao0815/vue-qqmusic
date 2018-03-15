import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommand'
    },
    {
      path: '/recommand',
      component: () => import('@/views/Recommand/MusicRecommand'),
      children: [
        {
          path: '/radio',
          component: () => import('@/views/Radio/MusicRadio')
        }
      ]
    },
    {
      path: '/rank',
      component: () => import('@/views/Rank/MusicRank')
    },
    {
      path: '/search',
      component: () => import('@/views/Search/MusicSearch')
    }
  ]
})

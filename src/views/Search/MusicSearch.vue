<template>
  <section class="search-wrap">
    <div v-show="hotKeyData.hotkey">
      <div class="search-bar">
        <div class="input-wrap">
          <input
            type="search"
            class="search-input"
            autocomplete="off"
            placeholder="搜索歌曲、歌单、专辑"
            v-model="word"
            @focus="inputFocus"
            @keydown.enter="getData"
          >
          <i class="search-icon"></i>
          <i class="delete-icon" v-show="showIcon" @click="clickDelete"></i>
        </div>
        <div class="cancel-btn" v-show="!isShowKeys" @click="clickCancel">取消</div>
      </div>
      <div class="hot-keys" v-show="isShowKeys">
        <h3 class="result-tit">热门搜索</h3>
        <div class="result-tags">
          <a :href="hotKeyData.special_url" class="special-key">
            {{hotKeyData.special_key}}
          </a>
          <a href="javscript:;"
            v-for="(item, index) of subHotKeyData"
            :key="index"
            class="tag-s"
            @click="searchKey(item.k)"
          >
            {{item.k}}
          </a>
        </div>
      </div>
      <search-list
        :searchData="searchData"
        :isShowAll="isShowAll"
        :showLoading="showLoading"
        :showSongList="showSongList"
      ></search-list>
      <record-list
        v-show="showRecordList"
        @sendData="sendData"
        @alterStorage="alterStorage"
        :allStorage="allStorage"
      ></record-list>
    </div>
    <loading v-show="!hotKeyData.hotkey"></loading>
  </section>
</template>

<script>
import { getHotKeyData, getSearchData } from '@/api/data'
import { ERR_OK } from '@/api/config'
import { getAllStorage, setStorage } from '@/assets/js/storage'
import SearchList from '@/components/SearchList/BaseSearchList'
import RecordList from '@/components/RecordList/BaseRecordList'
import Loading from '@/components/Loading/BaseLoading'

export default {
  components: {
    SearchList,
    RecordList,
    Loading
  },
  data() {
    return {
      hotKeyData: {},
      searchData: {},
      word: '',
      isShowKeys: true,
      isShowAll: false,
      showIcon: false,
      showLoading: false,
      showSongList: false,
      showRecordList: false,
      p: 1,
      perpage: 20,
      catZhida: 1,
      allStorage: getAllStorage()
    }
  },
  computed: {
    subHotKeyData() {
      if (!this.hotKeyData.hotkey) return ''
      return this.hotKeyData.hotkey.slice(0, 10)
    }
  },
  mounted() {
    window.onscroll = this.$_getMoreData
  },
  watch: {
    word(newVal) {
      newVal.length > 0 ? (this.showIcon = true) : (this.showIcon = false)
      this.p = 1
      this.isShowAll = false
      window.onscroll = this.$_getMoreData
    }
  },
  created() {
    this.$_getHotKeyData()
  },
  methods: {
    $_getHotKeyData() {
      getHotKeyData().then(res => {
        if (res.code === ERR_OK) this.hotKeyData = res.data
      })
    },
    $_getSearchData() {
      getSearchData(this.word, this.p, this.perpage, this.catZhida).then(
        res => {
          if (res.code === ERR_OK) {
            this.searchData = res.data
            this.showLoading = false
            this.showSongList = true
          }
          if (this.searchData.song) {
            if (res.data.song.list.length < this.perpage) {
              this.isShowAll = true
              window.onscroll = null
            }
          }
        }
      )
    },
    $_getMoreData() {
      if (
        window.pageYOffset + window.innerHeight + 110 >=
        document.documentElement.scrollHeight
      ) {
        window.onscroll = null
        this.p += 1
        this.showLoading = true
        getSearchData(this.word, this.p, this.perpage).then(res => {
          if (res.code === ERR_OK) {
            this.showLoading = false
            this.showSongList = true
            if (this.searchData.song) {
              this.searchData.song.list.splice(
                this.searchData.song.list.length,
                0,
                ...res.data.song.list
              )
            }
            window.onscroll = this.$_getMoreData
            if (res.data.song.list.length < this.perpage) {
              this.isShowAll = true
              window.onscroll = null
            }
          }
        })
      }
    },
    inputFocus() {
      this.isShowKeys = false
      this.isShowAll = false
      this.showRecordList = true
    },
    clickDelete() {
      this.showSongList = false
      this.showRecordList = true
      this.showLoading = false
      this.searchData = {}
      this.word = ''
    },
    clickCancel() {
      this.showSongList = false
      this.showRecordList = false
      this.showLoading = false
      this.searchData = {}
      this.isShowKeys = true
      this.word = ''
    },
    getData() {
      if (!this.word.trim()) return
      this.showLoading = true
      this.showRecordList = false
      this.$_commonDo(this.word)
    },
    sendData(val) {
      this.word = val
      this.showLoading = true
      this.showRecordList = false
      this.$_commonDo(val)
    },
    searchKey(val) {
      this.word = val
      this.isShowKeys = false
      this.$_commonDo(val)
    },
    $_commonDo(val) {
      this.$_getSearchData()
      setStorage(val)
      this.allStorage = getAllStorage()
    },
    alterStorage() {
      this.allStorage = getAllStorage()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base';

.search-wrap {
  width: 100%;
  .search-bar {
    padding: 20px;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
    .input-wrap {
      position: relative;
      border-radius: 6px;
      background: $color-bg;
      height: 40px;
      padding: 16px 24px 16px 70px;
      -webkit-box-flex: 1;
      .search-input {
        height: 40px;
        line-height: 40px;
        width: 100%;
        color: rgba(0, 0, 0, 0.3);
        border: none;
        outline: 0;
        font-size: 28px;
        -webkit-appearance: textfield;
        &::-webkit-input-placeholder {
          color: rgba(0, 0, 0, 0.3);
        }
      }
      .search-icon {
        position: absolute;
        top: 18px;
        left: 20px;
        width: 36px;
        height: 36px;
        @include bgImage('./search-icon.png');
        text-indent: -999px;
      }
      .delete-icon {
        display: inline-block;
        position: absolute;
        top: 18px;
        right: 24px;
        width: 36px;
        height: 36px;
        background: #b1b1b1;
        text-indent: -9999px;
        border-radius: 99px;
        &::before {
          @extend .icon_delete;
          width: 20px;
          height: 4px;
          margin-left: -10px;
          margin-top: -2px;
        }
        &::after {
          @extend .icon_delete;
          width: 4px;
          height: 20px;
          margin-left: -2px;
          margin-top: -10px;
        }
      }
    }
    .cancel-btn {
      padding-right: 20px;
      padding-left: 20px;
      font-size: 28px;
      height: 72px;
      line-height: 72px;
      color: #555;
    }
  }
  .hot-keys {
    background: $color-bg;
    padding: 30px 30px 20px 30px;
    .result-tit {
      color: rgba(0, 0, 0, 0.6);
      margin: 0 0 20px 0;
      font-size: 28px;
    }
    .result-tags {
      font-size: 0;
      .special-key {
        @extend .tag-s;
        color: #fc4524 !important;
        border-color: #fc4524 !important;
      }
    }
  }
}
.icon_delete {
  content: '';
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 16px;
  background: $color-bg;
  transform: rotate(45deg);
}
.tag-s {
  display: inline-block;
  font-size: 28px;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  color: #000;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 99px;
  word-break: keep-all;
  margin-bottom: 20px;
  margin-right: 28px;
}
</style>

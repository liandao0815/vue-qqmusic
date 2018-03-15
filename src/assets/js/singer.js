export default class Singer {
  constructor(singer = []) {
    this.singer = singer
  }
  getSinger() {
    let singerArr = []
    this.singer.forEach(item => {
      singerArr.push(item.name)
    })
    return singerArr.join(' / ')
  }
}

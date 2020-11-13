//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    nickname:"晚安",
    src:"../../images/mine-image.png",
    borrow:1,
    return:2,
    deal:1,
    check:1,
    score:"信誉分：100分"
  },

  //获取个人信息
  getMyInfo:function(e){
    //console.log(e.detail.userInfo)
    let info = e.detail.userInfo
    this.setData({
      src:info.avatarUrl,
      nickname:info.nickName,
      isLogin:true
    })
  },

  onLoad: function () {
    
  }
})

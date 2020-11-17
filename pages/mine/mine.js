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
    
  },

  /**跳转到具体界面 */
  ToDetail:function(e){
    var nid = e.currentTarget.dataset.nid;

    wx.navigateTo({
      url: '/pages/return/return?id='+nid,
    })
  },

  ToSub:function( ){
    wx.navigateTo({
      url: '/pages/mine-detail/mine-detail',
    })
  },

  ToSet:function(){
    wx.navigateTo({
      url: '/pages/mine-setting/mine-setting',
    })
  },

  ToClar:function(){
    wx.navigateTo({
      url: '/pages/iden/iden',
    })
  },

  ToInfo:function(){
    wx.navigateTo({
      url: '/pages/mine-info/mine-info',
    })
  }

})

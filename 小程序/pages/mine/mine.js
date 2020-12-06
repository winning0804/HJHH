//logs.js
const util = require('../../utils/util.js')
const db = wx.cloud.database()

Page({
  data: {
    nickname:"晚安",
    src:"../../images/mine-image.png",
    score:"信誉分：100分"
  },

  //获取个人信息
  getMyInfo:function(e){
    var that = this;
    wx.login({
      success:(result)=>{
        console.log(result);
      }
    })
    let info = e.detail.userInfo;
    this.setData({
      isLogin:true
    })
    var app=getApp(); 
    db.collection('user').where({
      _openid: app.globalData.openid
    })
    .get({
      success: function(res) {
        if(res.data.length==0){
          db.collection('user').add({
            data:{
              username:info.nickName,
              userimg:info.avatarUrl
            }
          }),
          that.setData({
            src:info.avatarUrl,
            nickname:info.nickName
          })
        }
        else {
          that.setData({
            src:res.data[0].userimg,
            nickname:res.data[0].username
          })
        }
          
      }
    })
  },

  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
     name: 'getOpenID',
     success(res){
       var id = res.result.openId;
       var app=getApp(); 
       app.globalData.openid = id
     }
    })
   },


  onLoad: function () {
  },

  /**跳转到具体界面 */
  ToDetail:function(e){
    var nid = e.currentTarget.dataset.nid;
    var id = this.data.openid
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
    var that = this;
    wx.navigateTo({
      url: '/pages/mine-info/mine-info',
    })
  }

})

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
    this.setData({
      isLogin:true
    })
    var app=getApp(); 
    console.log(app.globalData.openid);
    db.collection('user').where({
      _openid: app.globalData.openid
    })
    .get({
      success: function(res) {
        console.log(res);
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
       app.globalData.openid = id;
       that.getMyInfo();
     }
    })
   },

  addorder:function(){
    db.collection('orders').add({
      data:{
        //myid:oc66o5J3_sfxSz4ZmvQaPrUjt5f8
        borrowerid:"oc66o5J3_sfxSz4ZmvQaPrUjt5f8",
        renterid:"oc66o5IhU5W2rh7NY3Yof-viRLBY",
        deposit:"0",
        rent:"60",
        img:["cloud://hjhh-3g93a1ut32a4515e.686a-hjhh-3g93a1ut32a4515e-1304375930/1606903770049-914"],
        kind:"其他",
        name:"发传单",
        status:"等待对方确认交易",
        datestart:"2020-9-8",
        dateend:"2020-12-12"
      },
      success:function(res){
        wx.showToast({
          title: '添加成功',
          duration:2000,//显示时长
          mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
          icon:'success'//图标，支持"success"、"loading"
        })
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

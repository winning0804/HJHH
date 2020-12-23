// pages/item/item.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objid:"",
    id:"",
    someone:"",
    array:[],
    imagesrc2:"",
    obj:"...",
    people:"...",
    time:"...",
    phone:"...",
    price:"...",
    func:"...",
    isShowConfirm1:false,
    isShowConfirm2:false,
    one_1: 0,
    two_1: 5,
    one_2: 0,
    two_2: 5,
    content1:"",
    text:false,
    but:false,
    situa:"",
    num:"",
    comment1:"",
    comment2:""
  },

  setValue1:function(e){
    this.setData({
      comment1:e.detail.value,
    })
  },

  setValue2:function(e){
    this.setData({
      comment2:e.detail.value,
    })
  },

  confirm:function(){
    var that = this;
    if(this.data.func=="待审核"){
      wx.showModal({
        title: '提醒',
        content: '是否通过审核？',
        success(res){
          if(res.confirm)
          {
            db.collection("orders").doc(that.data.objid).update({
              data:{
                bstatus:"待交易",
                rstatus:"待交易",
              },
              success(res){
                wx.showToast({
                  title: '已通过',
                  duration:2000,//显示时长
                  mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                  icon:'success'//图标，支持"success"、"loading"
                })
              }
            })
            
          }else if(res.cancel)
          {
            wx.showToast({
              title: '已拒绝',
              duration:2000,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
              icon:'success'//图标，支持"success"、"loading"
            })
          }
        }
      })
    }
    if(this.data.func=="待交易"){
      wx.showModal({
        title: '提醒',
        content: '是否成功交易？',
        success(res){
          if(res.confirm)
          {
            var rs,bs;
            db.collection("orders").doc(that.data.objid).get({
              success:function(res){
                if(that.data.id=="1"){
                  if(res.data.bstatus=="待交易"){
                    rs="等待对方确认交易",
                    bs="待交易"
                  }
                  if(res.data.bstatus=="等待对方确认交易"){
                    rs="借出中",
                    bs="待归还"
                  }
                }
                if(that.data.id=="2"){
                  if(res.data.rstatus=="待交易"){
                    bs="等待对方确认交易",
                    rs="待交易"
                  }
                  if(res.data.rstatus=="等待对方确认交易"){
                    rs="借出中",
                    bs="待归还"
                  }
                }
                db.collection("orders").doc(that.data.objid).update({
                  data:{
                    bstatus:bs,
                    rstatus:rs,
                  },
                  success(res){
                    wx.showToast({
                      title: '已确认交易',
                      duration:2000,//显示时长
                      mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                      icon:'success'//图标，支持"success"、"loading"
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
    if(this.data.func=="待归还"){
      wx.showModal({
        title: '提醒',
        content: '是否确认归还？',
        success(res){
          if(res.confirm){
            that.setData({
              isShowConfirm1:true
            })
          }
          else if(res.cancel)
          {
            wx.showToast({
              title: '已取消',
              duration:2000,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
              icon:'success'//图标，支持"success"、"loading"
            })
          }
        }
      })
    }
    if(this.data.func=="确认归还"){
      wx.showModal({
        title: '提醒',
        content: '是否确认归还？',
        success(res){
          if(res.confirm){
            that.setData({
            isShowConfirm1:true
            })
          }
          else if(res.cancel)
          {
            wx.showToast({
              title: '已取消',
              duration:2000,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
              icon:'success'//图标，支持"success"、"loading"
            })
          }
        }
      })
    }
      
  },

  in_xin1:function(e){
    var in_xin = e.currentTarget.dataset.in;
    var one_1;
    if (in_xin === 'use_sc2'){
      one_1 = Number(e.currentTarget.id);
    } else {
      one_1 = Number(e.currentTarget.id) + this.data.one_1;
    }
    this.setData({
      one_1: one_1,
      two_1: 5 - one_1
    })
  },

  in_xin2:function(e){
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'use_sc2'){
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
  },

  setValue: function (e) {
    this.setData({
      content1: e.detail.value
    })
  },

  confirmAcceptance:function(){
    var that = this;
    that.setData({
      isShowConfirm1: false,
    })
    if(that.data.func=="确认归还"){
      wx.showToast({
        title: '评论成功',
        duration:2000,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'success'//图标，支持"success"、"loading"
      })
    }
    if(that.data.func=="待归还"){
      that.setData({
        isShowConfirm2:true
      })
    }
    console.log(that.data.one_1+"星 "+that.data.comment1);
  },

  confirmAcceptance2:function(){
    var that = this;
    that.setData({
      isShowConfirm2: false
    })
    wx.showToast({
      title: '评论成功',
      duration:2000,//显示时长
      mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
      icon:'success'//图标，支持"success"、"loading"
    })
    console.log(that.data.one_2+"星 "+that.data.comment2);
  },

  chat:function(res){
    var that = this;
    wx.navigateTo({
      url: '/pages/message_detail/message_detail?id='+that.data.someone,
    })
  },

  getuserinfo:function(someone){
    var that = this;
    db.collection('user').where({ 
      _openid: someone
    })
    .get({
      success:function(res){
        that.setData({
          imagesrc2:res.data[0].userimg,
          people:res.data[0].username,
          someone:someone
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    db.collection("orders").doc(options.id).get({
      success:function(res){
        console.log('获取物品信息成功',res);
        that.setData({
          objid:options.id,
          id:options.page,
          array:res.data.img,
          obj:res.data.kind+"|"+res.data.name,
          price:"租金:"+res.data.rent+" 押金:"+res.data.deposit,
          time:"from "+res.data.datestart+" to "+res.data.dateend
        })
        if(options.page=="1"){
          that.getuserinfo(res.data.borrowerid);
          if(res.data.rstatus=="待审核"||res.data.rstatus=="待交易"||res.data.rstatus=="确认归还"){
            that.setData({
              but:true,
              func:res.data.rstatus
            })
          }
          if(res.data.rstatus=="等待对方确认交易"||res.data.rstatus=="借出中"){
            that.setData({
              text:true,
              situa:res.data.rstatus
            })
          }
        }
        else if(options.page=="2"){
        that.getuserinfo(res.data.renterid);
        if(res.data.bstatus=="待交易"||res.data.bstatus=="待归还"){
          that.setData({
            but:true,
            func:res.data.bstatus
          })
        }
        if(res.data.bstatus=="等待对方审核"||res.data.bstatus=="等待对方确认交易"||res.data.bstatus=="等待对方确认归还"){
          that.setData({
            text:true,
            situa:res.data.bstatus
          })
        }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
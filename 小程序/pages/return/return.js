// pages/return/return.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageid:0,
    array:[],
    block1:false,
    block2:false,
    block3:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    var that = this;
    var app=getApp(); 
    var id = app.globalData.openid;
    if(options.id==1){
      db.collection('orders').where({
        renterid: id
      })
      .get({
        success:function(res){
          console.log('获取我的物品成功',res);
          that.setData({
            array:res.data,
            block1:true,
            pageid:1
          })
        }
      })
    }
    if(options.id==2){
      db.collection('orders').where({
        borrowerid: id
      })
      .get({
        success:function(res){
          console.log('获取我的物品成功',res);
          that.setData({
            array:res.data,
            block2:true,
            pageid:2
          })
        }
      })
    }
    if(options.id==5){
      db.collection('goods').where({
        _openid: id,
        isrent:false
      })
      .get({
        success: function(res) {
          console.log('获取我的物品成功',res);
          that.setData({
            array:res.data,
            block3:true,
            pageid:5
          })
        }
      })
      
    }
  },

  newpage:function(e){
    wx.navigateTo({
      url: '/pages/mine-detail/mine-detail?id='+e.currentTarget.id,
    })
  },

  item:function(e){
    var that = this;
    wx.navigateTo({
      url:'/pages/item/item?id='+e.currentTarget.id+'&page='+that.data.pageid,
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

  },


  button1:function(e){
    var that = this;
    console.log(e);
    if(e.currentTarget.dataset.button=="隐藏物品"){
      wx.showModal({
        title: '提醒',
        content: '是否确认隐藏物品？',
        success(res){
          if(res.confirm)
          {
            db.collection('goods').doc(e.currentTarget.dataset.text).update({
              data:{
                show:false,
                button1:"取消隐藏",
              },
              success: function(res) {
                console.log(res.data);
                wx.showToast({
                  title: '已隐藏',
                  duration:2000,//显示时长
                  mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                  icon:'success'//图标，支持"success"、"loading"
                })
                that.onLoad();
              }
            })
          }else if(res.cancel)
          {
            console.log("用户点击了取消");
          }
        }
      })
    }
    if(e.currentTarget.dataset.button=="取消隐藏"){
      wx.showModal({
        title: '提醒',
        content: '是否取消隐藏物品？',
        success(res){
          if(res.confirm)
          {
            db.collection('goods').doc(e.currentTarget.dataset.text).update({
              data:{
                show:true,
                button1:"隐藏物品",
              },
              success: function(res) {
                console.log(res.data);
                wx.showToast({
                  title: '已取消隐藏',
                  duration:2000,//显示时长
                  mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                  icon:'success'//图标，支持"success"、"loading"
                })
                that.onLoad();
              }
            })
          }else if(res.cancel)
          {
            console.log("用户点击了取消");
          }
        }
      })
    }  
  },

  button2:function(e){
    var that = this;
    console.log(e);
      wx.showModal({
        title: '提醒',
        content: '是否确认删除？',
        success(res){
          if(res.confirm)
          {
            db.collection('goods').doc(e.currentTarget.dataset.text).remove({
              success: function(res) {
                console.log(res.data);
                wx.showToast({
                  title: '已删除',
                  duration:2000,//显示时长
                  mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                  icon:'success'//图标，支持"success"、"loading"
                })
                that.onLoad();
              }
            })
            
          }else if(res.cancel)
          {
            console.log("用户点击了取消");
          }
        }
      })
  }

})



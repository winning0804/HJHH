// pages/mine-info/mine-info.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:" ",
    src:" "
  },

  bindname:function(e){
    this.setData({
      username:e.detail.value
    })
  },

  change:function(){
    var that = this;
    wx.showModal({
      title: '提醒',
      content: '是否确认修改个人信息？',
      success(res){
        if(res.confirm){
          var app=getApp(); 
          db.collection('user').where({
            _openid: app.globalData.openid
          })
          .get({
            success: function(res) {
              var id = res.data[0]._id;
              db.collection('user').doc(id).update({
                data:{
                  username:that.data.username,
                  userimg:that.data.src
                },
                success:function(res) {
                  console.log('个人信息修改成功',res);
                  wx.showToast({
                    title: '修改成功',
                    duration:2000,//显示时长
                    mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                    icon:'success'//图标，支持"success"、"loading"
                  })
                }
              })
            }
          })
        }else if(res.cancel)
        {
          console.log("用户点击了取消");
        }
      }
    })
  },

  upload:function(){
    var that = this;

    wx.chooseImage({
      count: 1,
      sizeType:['original', 'compressed'],
      sourceType:['album', 'camera'],
      success:function(res){
        console.log(res),
        that.setData({
          src:res.tempFilePaths,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app=getApp(); 
    db.collection('user').where({
      _openid: app.globalData.openid
    })
    .get({
      success: function(res) {
        console.log('获取个人信息成功',res)
        that.setData({
          username:res.data[0].username,
          src:res.data[0].userimg
        })
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
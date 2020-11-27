// pages/mine-info/mine-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:" ",
    src:"../../images/unlogin.png"
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
        if(res.confirm)
        {
          wx.request({
            url: 'http://127.0.0.1:8000/def_user/user_list',
            data: { uname:that.data.username, ulogo:that.data.src },
            method: "POST",
            success:function(res){
              wx.showToast({
                title: '修改成功',
                duration:2000,//显示时长
                mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                icon:'success'//图标，支持"success"、"loading"
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
    console.log(options);
    this.setData({
      username:options.username,
      src:"../../images/mine-image.png"
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
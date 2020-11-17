// pages/mine-detail/mine-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    local:"点此获取位置",
    imgList:[],
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['电子产品', '日常用品', '交通出行','服务','其他'], //下拉列表的数据
    indexs: 0 //选择的下拉列 表下标,
  },

  getlocal:function(){
    var that = this;
    wx.chooseLocation({
      success:function(res){
        that.setData({local:res.address})
      }
    })
  },

  upload:function(){
    var that = this;

    wx.chooseImage({
      count: 9,
      sizeType:['original', 'compressed'],
      sourceType:['album', 'camera'],
      success:function(res){
        that.setData({
          imgList:that.data.imgList.concat(res.tempFilePaths)
        })
      }
    })
  },


  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
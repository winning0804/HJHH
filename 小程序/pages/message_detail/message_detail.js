// pages/message_detail/message_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:" ",
    messages_detail_text:" ",
    name:" ",
    ur1:"../../images/u22.svg",
    ur2:"../../images/mine-image.png",
    messages_detail_text1:[
      "租金可以便宜点吗？"
    ],
    messages_detail_text2:[
      "可以啊 ","多少你能接受？"
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url:options.image,
      name:options.name
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


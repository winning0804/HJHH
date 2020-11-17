// pages/return/return.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:"已借出",
    img:"../../images/u8.png",
    obj:"电子产品|蓝牙耳机",
    people:"借用人：美少女战士",
    price:"￥3.00/日",
    date:"20.11.11-20.11.13",
    button1:"提醒归还",
    button2:"确认归还",
    show:"true"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.id==2){
      that.setData({
        page:"待归还",
        img:"../../images/电动车.png",
        obj:"交通出行|电动车",
        people:"所属人：月野兔",
        price:"￥10.00/日",
        date:"20.08.04-20.11.23",
        button1:"申请退款",
        button2:"归还"
      })
    }
    if(options.id==3){
      that.setData({
        page:"待处理",
        img:"../../images/快递.png",
        obj:"服务|代取快递",
        people:"借用人：懒惰",
        price:"￥2.00/日",
        date:"20.10.04-20.11.27",
        button2:"确认借出",
        show:"false"
      })
    }
    if(options.id==4){
      that.setData({
        page:"待审核",
        img:"../../images/指甲剪.png",
        obj:"日常用品|指甲剪",
        people:"所属人：家长",
        price:"￥1.00/日",
        date:"20.11.04-20.11.22",
        button1:"取消申请",
        button2:"确认借到"
      })
    }
    if(options.id==5){
      that.setData({
        page:"我的物品",
        img:"../../images/电动车.png",
        obj:"交通出行|电动车",
        people:"所属人：晚安",
        price:"￥10.0/日",
        date:" ",
        button1:"删除物品",
        button2:"确认借出"
      })
    }
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
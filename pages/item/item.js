// pages/item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:"...",
    array:[
      "../../images/u8.png",
      "../../images/u19.svg",
      "../../images/u8.png",
      "../../images/u8.png",
      "../../images/u8.png",
    ],
    imagesrc2:"../../images/u19.svg",
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
    content1:""
  },

  confirm:function(){
      this.setData({
        isShowConfirm1:true
      })
    
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
    if(that.data.page=="已借出物品"){
      wx.showToast({
        title: '评论成功',
        duration:2000,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'success'//图标，支持"success"、"loading"
      })
    }
    if(that.data.page=="待归还物品"){
      that.setData({
        isShowConfirm2:true
      })
    }
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.id==1){
      that.setData({
        page:"已借出物品",
        array:[
          "../../images/u8.png",
          "../../images/电动车.png",
          "../../images/指甲剪.png",
        ],
        imagesrc2:"../../images/u19.svg",
        obj:"电子产品|蓝牙耳机",
        people:"所属人：阿达娃",
        time:"借用时间：2020.10.02-2020.11.20",
        phone:"所属人电话：2657843659",
        price:"￥3.00/日 免押金",
        func:"确认归还"
      })
    }
    if(options.id==2){
      that.setData({
        page:"待归还物品",
        array:[
          "../../images/u8.png",
          "../../images/u19.svg",
          "../../images/u8.png",
          "../../images/u8.png",
          "../../images/u8.png",
          "../../images/u8.png",
        ],
        imagesrc2:"../../images/u19.svg",
        obj:"交通出行|电动车",
        people:"所属人：月野兔",
        time:"借用时间：2020.08.04-2020.11.23",
        phone:"所属人电话：2657843659",
        price:"￥10.00/日 免押金",
        func:"归还"
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
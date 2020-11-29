// pages/item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    page:"物品详情",
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
    content1:"",
    text:false,
    but:false,
    situa:"",
    num:"",
    comment1:"请输入对对方的评价",
    comment2:"请输入对物品的评价"
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
    if(this.data.num==1){
      wx.showModal({
        title: '提醒',
        content: '是否通过审核？',
        success(res){
          if(res.confirm)
          {
            wx.showToast({
              title: '已通过',
              duration:2000,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
              icon:'success'//图标，支持"success"、"loading"
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
    if(this.data.num==2){
      wx.showModal({
        title: '提醒',
        content: '是否成功交易？',
        success(res){
          if(res.confirm)
          {
            wx.showToast({
              title: '已通过',
              duration:2000,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
              icon:'success'//图标，支持"success"、"loading"
            })
          }
        }
      })
    }
    if(this.data.num==4){
      that.setData({
        isShowConfirm1:true
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
    if(that.data.id==1){
      wx.showToast({
        title: '评论成功',
        duration:2000,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'success'//图标，支持"success"、"loading"
      })
    }
    if(that.data.id==2){
      that.setData({
        isShowConfirm2:true
      })
    }
    console.log(this.data.comment1+"   ");
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
    console.log(this.data.comment2+"   ");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.id==1){
      that.setData({
        id:1,
        array:[
          "../../images/u8.png",
          "../../images/car.png",
          "../../images/finger.png",
        ],
        imagesrc2:"../../images/u19.svg",
        obj:"电子产品|蓝牙耳机",
        people:"借用人：阿达娃",
        time:"借用时间：2020.10.02-2020.11.20",
        phone:"借用人电话：2657843659",
        price:"￥3.00/日 免押金"
      })
      if(options.num==1){
        that.setData({
          but:true,
          func:"审核",
          num:1
        })
      }
      if(options.num==2){
        that.setData({
          but:true,
          func:"已交易",
          num:2
        })
      }
      if(options.num==3){
        that.setData({
          text:true,
          situa:"等待对方确认交易",
          num:3
        })
      }
      if(options.num==4){
        that.setData({
          but:true,
          func:"已归还",
          num:4
        })
      }
      if(options.num==5){
        that.setData({
          text:true,
          situa:"等待对方确认归还",
          num:5
        })
      }
    }
    if(options.id==2){
      that.setData({
        id:2,
        array:[
          "../../images/u8.png",
          "../../images/u19.svg",
          "../../images/u8.png",
          "../../images/u8.png",
          "../../images/u8.png",
          "../../images/u8.png",
        ],
        imagesrc2:"../../images/u19.svg",
        obj:"交通出行|car",
        people:"所属人：月野兔",
        time:"借用时间：2020.08.04-2020.11.23",
        phone:"所属人电话：2657843659",
        price:"￥10.00/日 免押金",
        func:"归还"
      })
      if(options.num==1){
        that.setData({
          text:true,
          situa:"待审核",
          num:1
        })
      }
      if(options.num==2){
        that.setData({
          but:true,
          func:"已交易",
          num:2
        })
      }
      if(options.num==3){
        that.setData({
          text:true,
          situa:"等待对方确认交易",
          num:3
        })
      }
      if(options.num==4){
        that.setData({
          but:true,
          func:"已归还",
          num:4
        })
      }
      if(options.num==5){
        that.setData({
          text:true,
          situa:"等待对方确认归还",
          num:5
        })
      }
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
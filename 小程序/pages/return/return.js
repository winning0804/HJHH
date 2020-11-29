// pages/return/return.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      page:"我是xx人",
      array:[{
        id:"",
        num:"1",
        img:"../../images/u8.png",
        obj:"电子产品|蓝牙耳机",
        people:"借用人：美少女战士",
        price:"￥3.00/日",
        date:"20.11.11-20.11.13",
        situa:"待审核"
      },
      {
        id:"",
        num:"2",
        img:"../../images/car.png",
        obj:"交通出行|电动车",
        people:"借用人：圣代",
        price:"￥5.00/日",
        date:"20.10.10-20.11.11",
        button1:"待交易"
      }
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.id==1){
      that.setData({
        page:"我是所属人",
        array:[{
          id:"1",
          num:"1",
          img:"../../images/u8.png",
          obj:"电子产品|蓝牙耳机",
          people:"借用人：美少女战士",
          price:"￥3.00/日",
          date:"20.11.11-20.11.13",
          situa:"待审核"
        },
        {
          id:"1",
          num:"3",
          img:"../../images/car.png",
          obj:"交通出行|电动车",
          people:"借用人：圣代",
          price:"￥5.00/日",
          date:"20.10.10-20.11.11",
          situa:"等待对方确认交易"
        },
        {
          id:"1",
          num:"5",
          img:"../../images/car.png",
          obj:"交通出行|电动车",
          people:"借用人：圣代",
          price:"￥5.00/日",
          date:"20.10.10-20.11.11",
          situa:"等待对方确认归还"
        },
        {
          id:"1",
          num:"4",
          img:"../../images/car.png",
          obj:"交通出行|电动车",
          people:"借用人：圣代",
          price:"￥5.00/日",
          date:"20.10.10-20.11.11",
          situa:"待归还"
        }
      ]
      })
    }
    if(options.id==2){
      that.setData({
        page:"我是借方",
        array:[{
          id:"2",
          num:"2",
          img:"../../images/car.png",
          obj:"交通出行|电动车",
          people:"所属人：月野兔",
          price:"￥10.00/日",
          date:"20.08.04-20.11.23",
          situa:"待交易",
        },
        {
          id:"2",
          num:"5",
          img:"../../images/finger.png",
          obj:"日常用品|finger",
          people:"所属人：subs",
          price:"￥1.00/日",
          date:"20.10.04-20.11.23",
          situa:"等待对方确认归还"
        },
        {
          id:"2",
          num:"1",
          img:"../../images/car.png",
          obj:"交通出行|电动车",
          people:"所属人：月野兔",
          price:"￥10.00/日",
          date:"20.08.04-20.11.23",
          situa:"待审核"
        },
        {
          id:"2",
          num:"4",
          img:"../../images/car.png",
          obj:"交通出行|电动车",
          people:"所属人：月野兔",
          price:"￥10.00/日",
          date:"20.08.04-20.11.23",
          situa:"待归还"
        }
        ]
      })
    }
    if(options.id==5){
      that.setData({
        page:"我的物品",
        array:[{
          id:"5",
          img:"../../images/car.png",
          obj:"交通出行|电动车",
          people:"所属人：晚安",
          price:"￥10.0/日 押金：￥50.0",
          date:" ",
          button1:"隐藏物品",
          button2:"删除物品"
        }]
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

  },

  /*
  obj_detail:function(e){
    console.log(e);
    
    if(this.data.id==1){
      wx.navigateTo({
      url: '../../pages/item/item?id=1',
      })
    }
    if(this.data.id==2){
      wx.navigateTo({
      url: '../../pages/item/item?id=2',
      })
    }
    if(this.data.id==5){
      wx.navigateTo({
      url: '../../pages/mine-detail/mine-detail?id=5',
      })
    }
  },
*/

  button1:function(){
      wx.showModal({
        title: '提醒',
        content: '是否确认隐藏物品？',
        success(res){
          if(res.confirm)
          {
            wx.showToast({
              title: '已隐藏',
              duration:2000,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
              icon:'success'//图标，支持"success"、"loading"
            })
          }else if(res.cancel)
          {
            console.log("用户点击了取消");
          }
        }
      })
  },

  button2:function(){
      wx.showModal({
        title: '提醒',
        content: '是否确认删除？',
        success(res){
          if(res.confirm)
          {
            wx.showToast({
              title: '已删除',
              duration:2000,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
              icon:'success'//图标，支持"success"、"loading"
            })
          }else if(res.cancel)
          {
            console.log("用户点击了取消");
          }
        }
      })
  }

})



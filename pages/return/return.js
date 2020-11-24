// pages/return/return.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:"",
      page:"已借出",
      array:[{
        img:"../../images/u8.png",
        obj:"电子产品|蓝牙耳机",
        people:"借用人：美少女战士",
        price:"￥3.00/日",
        date:"20.11.11-20.11.13",
        button1:"提醒归还",
        button2:"确认归还",
      },
      {
        img:"../../images/电动车.png",
        obj:"交通出行|电动车",
        people:"借用人：圣代",
        price:"￥5.00/日",
        date:"20.10.10-20.11.11",
        button1:"提醒归还",
        button2:"确认归还"
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
        page:"已借出",
        id:"1",
        array:[{
          img:"../../images/u8.png",
          obj:"电子产品|蓝牙耳机",
          people:"借用人：美少女战士",
          price:"￥3.00/日",
          date:"20.11.11-20.11.13",
          button1:"提醒归还",
          button2:"确认归还",
        },
        {
          img:"../../images/电动车.png",
          obj:"交通出行|电动车",
          people:"借用人：圣代",
          price:"￥5.00/日",
          date:"20.10.10-20.11.11",
          button1:"提醒归还",
          button2:"确认归还"
        }
      ]
      })
    }
    if(options.id==2){
      that.setData({
        page:"待归还",
        id:"2",
        array:[{
          img:"../../images/电动车.png",
          obj:"交通出行|电动车",
          people:"所属人：月野兔",
          price:"￥10.00/日",
          date:"20.08.04-20.11.23",
          button2:"归还",
        },
        {
          img:"../../images/指甲剪.png",
          obj:"日常用品|指甲剪",
          people:"所属人：subs",
          price:"￥1.00/日",
          date:"20.10.04-20.11.23",
          button2:"归还",
        },
        {
          img:"../../images/电动车.png",
          obj:"交通出行|电动车",
          people:"所属人：月野兔",
          price:"￥10.00/日",
          date:"20.08.04-20.11.23",
          button2:"归还"
        }
        ]
      })
    }
    if(options.id==3){
      that.setData({
        page:"待处理",
        id:"3",
        array:[{
          img:"../../images/快递.png",
          obj:"服务|代取快递",
          people:"借用人：懒惰",
          price:"￥2.00/日",
          date:"20.10.04-20.11.27",
          button2:"确认借出"
        }
        ]
      })
    }
    if(options.id==4){
      that.setData({
        page:"待审核",
        id:"4",
        array:[{
          img:"../../images/指甲剪.png",
          obj:"日常用品|指甲剪",
          people:"所属人：家长",
          price:"￥1.00/日",
          date:"20.11.04-20.11.22",
          button1:"取消申请",
          button2:"确认借到",
        },
        {
          img:"../../images/指甲剪.png",
          obj:"日常用品|指甲剪",
          people:"所属人：家长",
          price:"￥1.00/日",
          date:"20.11.04-20.11.22",
          button1:"取消申请",
          button2:"确认借到",
        },
        {
          img:"../../images/指甲剪.png",
          obj:"日常用品|指甲剪",
          people:"所属人：家长",
          price:"￥1.00/日",
          date:"20.11.04-20.11.22",
          button1:"取消申请",
          button2:"确认借到",
        },
        {
          img:"../../images/指甲剪.png",
          obj:"日常用品|指甲剪",
          people:"所属人：家长",
          price:"￥1.00/日",
          date:"20.11.04-20.11.22",
          button1:"取消申请",
          button2:"确认借到"
        }
        ]
        
      })
    }
    if(options.id==5){
      that.setData({
        page:"我的物品",
        id:"5",
        array:[{
          img:"../../images/电动车.png",
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

  obj_detail:function(){
    console.log(this.data.id);
    
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

  button1:function(){
    if(this.data.id==1){
      console.log(this.data.button1+" "+this.data.id);
      wx.navigateTo({
        url:'../../pages/message_detail/message_detail',
      })
    }
    else if(this.data.id==4){
      wx.showModal({
        title: '提醒',
        content: '是否确认取消申请？',
        success(res){
          if(res.confirm)
          {
            wx.showToast({
              title: '已取消',
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
    else if(this.data.id==5){
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
    }
  },

  button2:function(){
      wx.showModal({
        title: '提醒',
        content: '是否继续操作？',
        success(res){
          if(res.confirm)
          {
            wx.showToast({
              title: '成功',
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



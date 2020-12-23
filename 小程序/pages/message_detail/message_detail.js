// pages/message_detail/message_detail.js
const util = require('../../utils/util.js');
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    me:"",
    chat:[],
    openid_me:"",
    openid_you:"",
    my_img:"",
    your_img:"",
    name:"",
    text:""
  },

  getmyinfo:function(res){
    var that = this;
    db.collection('user').where({
      _openid:res
    }).get({
      success:function(res){
        that.setData({
          my_img:res.data[0].userimg
        })
      },
      fail:function(res){
        console.log("fail");
      }
    })
  },

  getyourinfo:function(res){
    var that = this;
    db.collection('user').where({
      _openid:res
    }).get({
      success:function(res){
        that.setData({
          your_img:res.data[0].userimg,
          name:res.data[0].username
        })
      },
      fail:function(res){
        console.log("fail");
      }
    })
  },

  tobesend:function(res){
    this.setData({
      text:res.detail.value
    })
  },

  send:function(res){
    console.log(this.data.id);
    var that = this;
    var tem = this.data.chat;
    var me = that.data.me;
    var text = that.data.text;
    var time = util.formatTime(new Date());
    tem.push({me,text,time});
    that.setData({
      chat:tem
    })
    if(this.data.text){
        db.collection('chat').doc(that.data.id).update({
          data:{
            chat:that.data.chat
          },
          success:function(res){
            console.log("success send");
          },
          fail(res){
            console.log("fail send");
          }
        })
    }
    else{
      wx.showToast({
        title: '内容不可为空',
        duration:2000,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'loading'//图标，支持"success"、"loading"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var app=getApp(); 
    this.getmyinfo(app.globalData.openid);
    this.getyourinfo(options.id);
    this.setData({
      openid_you:options.id,
      openid_me:app.globalData.openid
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
    var that = this;
    db.collection('chat').where({
      openid_1:that.data.openid_me,
      openid_2:that.data.openid_you
    }).get({
      success:function(res){
        console.log(res);
        if(res.data.length==0){
          db.collection('chat').where({
            openid_1:that.data.openid_you,
            openid_2:that.data.openid_me
          }).get({
            success:function(e){
              console.log(e);
              if(e.data.length==0){
                //create
                db.collection('chat').add({
                  data:{
                    openid_1:that.data.openid_me,
                    openid_2:that.data.openid_you,
                    chat:[]
                  },
                  success:function(ee){
                    that.setData({
                      id:res._id,
                      me:"1"
                    })
                  }
                })
              }
              else{
                //me:2
                that.setData({
                  me:"2",
                  chat:e.data[0].chat,
                  id:e.data[0]._id
                })
              }
            }
          })
        }
        else{
          //me:1
          that.setData({
            me:"1",
            chat:res.data[0].chat,
            id:res.data[0]._id
          })
        }
      }
    })
    
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


//logs.js
//const util = require('../../utils/util.js')
const db = wx.cloud.database();
var app=getApp(); 
Page({
  data:{
    // text:"这是一个页面"
   youropenid:"",
    messages:[
     
    ]
  },

  detail:function(res){
    console.log(res.currentTarget.id);
    wx.navigateTo({
      url: '/pages/message_detail/message_detail?id='+res.currentTarget.id,
    })
  },
 
  onLoad:function(){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    db.collection('chat').where({
      openid_1:app.globalData.openid
    }).get({
      success:function(res){
        console.log(res);
        var time = [];
        var text = [];
        var img = [];
        var name = [];
        var openid = [];
        var openid2 = [];
        if(res.data.length!=0){
          var l,i;
          for(i = 0;i < res.data.length;i++){
            var tem = that.data.messages;
            l=res.data[i].chat.length;
            if(l!=0){
              time.push(res.data[i].chat[l-1].time);
              text.push(res.data[i].chat[l-1].text);
              openid2.push(res.data[i].openid_2);
              db.collection('user').where({
                _openid:res.data[i].openid_2
              }).get({
                success:function(e){
                  img.push(e.data[0].userimg);
                  openid.push(e.data[0]._openid);
                  name.push(e.data[0].username);
                  tem.push({img:e.data[0].userimg,openid:e.data[0]._openid,
                    name:e.data[0].username,text:text[i],time:time[i]})
                  that.setData({
                    messages:tem
                  })
                  console.log("i:"+i);
                  console.log(tem);
                },
                fail:function(e){
                  console.log("fail");
                }
              })
            }
          }
        }
      }
    })
    db.collection('chat').where({
      openid_2:app.globalData.openid
    }).get({
      success:function(res){
        console.log(res);
        var time = [];
        var text = [];
        if(res.data.length!=0){
          var l,i;
          for(i = 0;i < res.data.length;i++){
            var tem = that.data.messages;
            l=res.data[i].chat.length;
            if(l!=0){
              console.log(res.data[i].chat[l-1].text);
              time.push(res.data[i].chat[l-1].time);
              text.push(res.data[i].chat[l-1].text);
              db.collection('user').where({
                _openid:res.data[i].openid_1
              }).get({
                success:function(e){
                  tem.push({img:e.data[0].userimg,openid:e.data[0]._openid,
                    name:e.data[0].username,text:text[i],time:time[i]})
                  that.setData({
                    messages:tem
                  })
                  console.log(tem);
                },
                fail:function(e){
                  console.log("fail");
                }
              })
            }
          }
        }
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
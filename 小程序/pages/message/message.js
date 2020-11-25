//logs.js
//const util = require('../../utils/util.js')

Page({
  data:{
    // text:"这是一个页面"
   
    messages:[
      {
        borrower_name:"美少女战士",
        url:"../../images/u19.svg",
        borrower_message:"租金可以便宜点吗？",
        count:5
      },
      {
        borrower_name:"房东的猫",
        url:"../../images/u22.svg",
        borrower_message:"哈哈哈，我要一统江湖啦，",
        count:18
        },
        {
          borrower_name:"无名",
          url:"../../images/gerenzhongxin.png",
          borrower_message:"在吗？",
          count:2
          },
          {
            borrower_name:"cherss",
            url:"../../images/点赞2.png",
            borrower_message:"我现在没空",
            count:4
            },
     
    ]
  },
 
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
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
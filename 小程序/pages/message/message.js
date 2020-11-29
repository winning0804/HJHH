//logs.js
//const util = require('../../utils/util.js')

Page({
  data:{
    // text:"这是一个页面"
   
    messages:[
      { 
        nameid:'1',
        borrower_name:"美少女战士",
        url:"../../images/u22.svg",
        borrower_message:"租金可以便宜点吗？",
        count:5
      },
      {
        nameid:'2',
        borrower_name:"房东的猫",
        url:"../../images/u22.svg",
        borrower_message:"哈哈哈，这个耳机质量怎么样？",
        count:8
        },
        {
          nameid:'3',
          borrower_name:"马化腾",
          url:"../../images/gerenzhongxin.png",
          borrower_message:"在吗?想借电动车。",
          count:2
    
          },
          {
            nameid:'4',
            borrower_name:"马云",
            url:"../../images/点赞2.png",
            borrower_message:"我现在没时间，等下聊",
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
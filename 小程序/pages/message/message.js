//logs.js
//const util = require('../../utils/util.js')

Page({
  data:{
    // text:"这是一个页面"
   
    messages:[
      { 
        img:"https://thirdwx.qlogo.cn/mmopen/vi_32/IicYPOQN5rpniakqB4pHM56P3ajicTNHJr62yOmMVSKsic950JKkATIDicicGyhruGuxaAEVcJ2HrIzdCQTsr7pZhK0g/132",
        name:"耳机军",
        text:"你好牙",
        time:"22：20",
        tag:"5"
      }
     
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
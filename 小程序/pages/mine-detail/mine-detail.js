// pages/mine-detail/mine-detail.js
const DB = wx.cloud.database().collection("goods")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    change:false,
    local:"",
    imgList:[],
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['电子产品', '日常用品', '交通出行','服务','其他'], //下拉列表的数据
    index:null,
    objs:"",
    money1:"",
    money2:"",
    button:"发布",
    intro:"",
    id:"",
    modalName: null,
  },

  //输入框的绑定函数
  bindobjs:function(e){
    console.log(e.detail.value);
    this.setData({
      objs:e.detail.value
    })
  },

  intro:function(e){
    console.log(e.detail.value);
    this.setData({
      intro:e.detail.value
    })
  },

  bindmoney1:function(e){
    console.log(e.detail.value);
    this.setData({
      money1:e.detail.value
    })
  },

  bindmoney2:function(e){
    console.log(e.detail.value);
    this.setData({
      money2:e.detail.value
    })
  },

  //图片的预览和删除
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '提醒',
      content: '确定要删除这张图片吗？',
      cancelText: '再看看',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      console.log("options: ");
      console.log(options);
      var that = this;
      DB.doc(options.id).get({
        success: function(res) {
          console.log('获取物品详情信息成功',res);
          that.setData({
            id:options.id,
            change:true,
            index:res.data.index,
            objs:res.data.name,
            money1:res.data.rent,
            money2:res.data.deposit,
            local:res.data.address,
            imgList:res.data.img,
            intro:res.data.introduction,
            button:"修改"
          })
        }
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

  //获取地址信息
  getlocal:function(){
    var that = this;
    wx.chooseLocation({
      success:function(res){
        that.setData({local:res.address})
      }
    })
  },

  //上传图片到云端
  upload:function(){
    var that = this;
    var old = that.data.imgList;
    wx.chooseImage({
      count: 9,
      sizeType:['original', 'compressed'],
      sourceType:['album', 'camera'],
      success:function(res){
        var lists = that.data.imgList.concat(res.tempFilePaths)
        var length = lists.length;
        for(var i=0;i<length;i++){
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() +"-"+ Math.floor(Math.random() * 1000),//云储存的路径及文件名
            filePath : lists[i], //要上传的图片/文件路径 这里使用的是选择图片返回的临时地址
            success : (res) => { //上传图片到云储存成功
              console.log('图片上传成功',res);
              old.push(res.fileID);
              that.setData({
                  imgList:old,
              });
            }
          })
        }
        
        console.log(that.data.imgList);
        wx.showToast({
            title: '上传成功',
            duration:2000,//显示时长
            mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
            icon:'success'//图标，支持"success"、"loading"
        })
      }
    })
  },


  //单选框的绑定事件
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  //提交表单
  change:function(){
    var that = this;
    //添加物品
    if(this.data.change==false){
      wx.showModal({
        title: '确认发布？',
        success(res){
          if(res.confirm)
          {
            DB.add({
              data:{
                index:that.data.index,
                kind:that.data.selectDatas[that.data.index],
                name:that.data.objs,
                rent:that.data.money1,
                deposit:that.data.money2,
                address:that.data.local,
                img:that.data.imgList,
                introduction:that.data.intro,
                block3:true,
                show:true,
                button1:"隐藏物品",
                button2:"删除物品",
                isrent:false
              },
              success(res){
                console.log('物品上传成功',res);
                wx.showToast({
                  title: '发布成功',
                  duration:2000,//显示时长
                  mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                  icon:'success'//图标，支持"success"、"loading"
                })
              },
              fail(res){
                console.log("fail")
              }
            })
            
          }else if(res.cancel)
          {
            console.log("用户点击了取消");
          }
        }
      })
    }
    //修改物品
    else{
      wx.showModal({
        title: '确认修改？',
        success(res){
          if(res.confirm)
          {
            DB.doc(that.data.id).update({
              data:{
                index:that.data.index,
                kind:that.data.selectDatas[that.data.index],
                name:that.data.objs,
                rent:that.data.money1,
                deposit:that.data.money2,
                address:that.data.local,
                img:that.data.imgList,
                introduction:that.data.intro
              },
              success(res){
                console.log('修改物品信息成功',res);
                wx.showToast({
                  title: '修改成功',
                  duration:2000,//显示时长
                  mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                  icon:'success'//图标，支持"success"、"loading"
                })
              },
              fail(res){
                console.log("fail");
              }
            })
            
          }else if(res.cancel)
          {
            console.log("用户点击了取消");
          }
        }
      })
    }
  }

})
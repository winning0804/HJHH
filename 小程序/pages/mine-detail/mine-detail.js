// pages/mine-detail/mine-detail.js
const DB = wx.cloud.database().collection("goods")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    change:false,
    local:"点此获取位置",
    imgList:[],
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['电子产品', '日常用品', '交通出行','服务','其他'], //下拉列表的数据
    indexs: 0 ,//选择的下拉列 表下标,
    objs:"请输入物品名称",
    money1:"请输入理想日租金",
    money2:"请输入理想押金",
    button:"发布",
    intro:"",
    id:""
  },

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    DB.doc(options.id).get({
      success: function(res) {
        that.setData({
          id:options.id,
          change:true,
          indexs:res.data.index,
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

  getlocal:function(){
    var that = this;
    wx.chooseLocation({
      success:function(res){
        that.setData({local:res.address})
      }
    })
  },

  upload:function(){
    var that = this;

    wx.chooseImage({
      count: 9,
      sizeType:['original', 'compressed'],
      sourceType:['album', 'camera'],
      success:function(res){
        that.setData({
          imgList:that.data.imgList.concat(res.tempFilePaths)
        })
      }
    })
  },


  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    });

  },

  change:function(){
    var that = this;
    if(this.data.change==false){
      wx.showModal({
        title: '确认发布？',
        success(res){
          if(res.confirm)
          {
            DB.add({
              data:{
                kind:that.data.selectDatas[that.data.indexs],
                index:that.data.indexs,
                name:that.data.objs,
                rent:that.data.money1,
                deposit:that.data.money2,
                address:that.data.local,
                img:that.data.imgList,
                introduction:that.data.intro,
                id:5
              },
              success(res){
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
    else{
      wx.showModal({
        title: '确认修改？',
        success(res){
          if(res.confirm)
          {
            DB.doc(that.data.id).update({
              data:{
                kind:that.data.selectDatas[that.data.indexs],
                index:that.data.indexs,
                name:that.data.objs,
                rent:that.data.money1,
                deposit:that.data.money2,
                address:that.data.local,
                img:that.data.imgList,
                introduction:that.data.intro
              },
              success(res){
                wx.showToast({
                  title: '修改成功',
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
  }

})
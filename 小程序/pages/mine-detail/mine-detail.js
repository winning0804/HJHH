// pages/mine-detail/mine-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    local:"点此获取位置",
    imgList:[],
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['电子产品', '日常用品', '交通出行','服务','其他'], //下拉列表的数据
    indexs: 0 ,//选择的下拉列 表下标,
    objs:"请输入物品名称",
    money1:"请输入理想日租金",
    money2:"请输入理想押金",
    button:"发布"
  },

  bindobjs:function(e){
    console.log(e.detail.value);
    this.setData({
      objs:e.detail.value
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
    console.log(options.id);
    var that = this;
    if(options.id==5){
      that.setData({
        local:"福建省福州市福州大学",
        imgList:["../../images/car.png"],
        indexs: 2 ,//选择的下拉列 表下标,
        objs:"蓝牙耳机",
        money1:"10",
        money2:"50",
        button:"提交修改"
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
    console.log(this.data.selectDatas[this.data.indexs]+this.data.objs+this.data.money1+this.data.money2+this.data.local+this.data.imgList);
    wx.showModal({
      title: '确认发布？',
      success(res){
        if(res.confirm)
        {
          wx.showToast({
            title: '发布成功',
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
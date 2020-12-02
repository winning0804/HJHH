// pages/iden/iden.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    sex:"男",
    id:"",
    phone:"",
    radioItems: [
      {name: '男', value: 'b', checked: 'true'},
      {name: '女', value: 'g'}
    ],
    hidden: false
  },

  radioChange(e) {
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed);
    this.setData({ sex:e.detail.value });
  },

  bindname:function(e){
    this.setData({ name:e.detail.value });
  },

  bindid:function(e){
    this.setData({ id:e.detail.value });
  },

  bindphone:function(e){
    this.setData({ phone:e.detail.value });
  },

  submit:function(){
    var that = this;
    db.collection('identify').add({
      data:{
        realname:that.data.name,
        sex:that.data.sex,
        ID_number:that.data.id,
        phone:that.data.phone
      },
      success:function(res) {
        wx.showToast({
          title: '提交成功！',
          duration:2000,//显示时长
          mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
          icon:'success'//图标，支持"success"、"loading"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    var app=getApp(); 
    db.collection('identify').where({
      _openid: app.globalData.openid
    })
    .get({
      success: function(res) {
        console.log(res);
        if(res.data.length==0){
          wx.showToast({
            title: '您还未实名认证',
            duration:2000,//显示时长
            mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
            icon:'loading'//图标，支持"success"、"loading"
          })
        }
        else {
          that.setData({
            name:res.data[0].realname,
            sex:res.data[0].sex,
            id:res.data[0].ID_number,
            phone:res.data[0].phone
          })
        }
          
      }
    })
    if(this.data.sex=='女'){
      radioItems
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

  }
})
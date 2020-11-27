// pages/iden/iden.js
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
    console.log(this.data.sex);
    wx.request({
      url: 'http://127.0.0.1:8000/def_user/getUserInfo',
      data: { urealname:this.data.name, usex:this.data.sex, uzhengjian_tel:this.data.id, uphone:this.data.phone},
      method: "POST",
      success:function(res){
        console.log(res);
      } 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
//index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    thumb1: 20,
    thumb2: 21,
  },
  	clickme: function () {
    this.showModal();
  	},
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    const [start, end] = event.detail;
    this.setData({
      show: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
  },
  	torender: function(event){
		wx.navigateTo({
			url: '../render/render'
		})
    },
    tomessage: function(event){
      wx.switchTab({
        url: '../message/message'
      });
    },
    increase1: function(event){
      this.setData({
        thumb1: this.data.thumb1+1,
      });
    },
    increase2: function(event){
      this.setData({
        thumb2: this.data.thumb2+1,
      });
    },
})

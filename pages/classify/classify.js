// pages/classification/classify.js
Page({
  	data: {
		obj: [
			{
				id: "0",
				name: ""
			},
			{
				id: "1",
				name: "B"
			},
		]
	},
	toindex:function(event){
		wx.navigateTo({
			url: '../index/index'
		})
	},
	onLoad: function (options) {
	},
	clickme: function () {
	  this.showModal();
	},
	showModal: function () {
	  var animation = wx.createAnimation({
		duration: 200,
		timingFunction: "linear",
		delay: 0
	  })
	  this.animation = animation
	  animation.translateY(-600).step()
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
	hideModal: function () {
	  var animation = wx.createAnimation({
		duration: 200,
		timingFunction: "linear",
		delay: 0
	  })
	  this.animation = animation
	  animation.translateY(-600).step()
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
	}
})
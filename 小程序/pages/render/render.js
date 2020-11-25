//index.js
const app = getApp()

Page({
  	data: {
    date: '',
		tosend: true,
		sent: true,
  	},
	tomessage: function(event){
		wx.switchTab({
			url: '../message/message'
		});
	},
	back: function(event){
		wx.navigateBack({
			delta: 1
		})
	},
	tosend_select: function(event){
		this.setData({
			tosend: true,
			sent: false,
		}),
		this.style.display="none"
	},
	sent_select: function(event){
		this.setData({
			tosend: false,
			sent: true,
		})
		this.style.display="none"
	}
});


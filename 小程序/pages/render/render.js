//index.js
const app = getApp()

Page({
  	data: {
		tosend: true,
		sent: true,
		isMine: true,
		list:{
			titles:[
				{
					title:"可借",
				},
				{
					title:"已借",
				},
				{
					title:"隐藏",
				},
			],
			goods:[
				{
					name:"电子产品|蓝牙耳机",
					price:3.00,
					deposit:20,
				},
				{
					name:"电子产品|蓝牙耳机",
					price:3.00,
					deposit:20,
				}
			]
		},
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


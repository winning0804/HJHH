//index.js
const app = getApp()

Page({
  	data: {
		tosend: true,
		sent: false,
		hide:false,
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
			goods1:[
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
			],
			goods2:[
				{
					name:"电子产品|蓝牙耳机",
					price:3.00,
					deposit:20,
				}
			],
			goods3:[
				{
					name:"电子产品|蓝牙耳机",
					price:3.00,
					deposit:20,
				},
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
			],
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
			hide:false,
		})
	},
	sent_select: function(event){
		this.setData({
			tosend: false,
			sent: true,
			hide:false,
		})
	},
	hide_select: function(event){
		this.setData({
			tosend: false,
			sent: false,
			hide:true,
		})
	}
});


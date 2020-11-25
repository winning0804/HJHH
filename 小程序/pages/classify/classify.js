// pages/classification/classify.js
Page({
  	data: {
		list: [
			{
				obj: [
					{
						id: "0",
						name: "电子产品|蓝牙耳机",
						price: "￥ 3.00元/日",
						deposit: "押金：￥20"
					},
					{
						id: "1",
						name: "电子产品|蓝牙耳机",
						price: "￥ 3.00元/日",
						deposit: "押金：￥20"
					},
					{
						id: "2",
						name: "电子产品|蓝牙耳机",
						price: "￥ 3.00元/日",
						deposit: "押金：￥20"
					},
					{
						id: "3",
						name: "电子产品|蓝牙耳机",
						price: "￥ 3.00元/日",
						deposit: "押金：￥20"
					},
					{
						id: "4",
						name: "电子产品|蓝牙耳机",
						price: "￥ 3.00元/日",
						deposit: "押金：￥20"
					},
				]
			},
			{
				obj: [
					{
						id: "0",
						name: "日常用品|针线盒",
						price: "￥ 1.00元/日",
						deposit: "押金：免费"
					},
					{
						id: "1",
						name: "日常用品|针线盒",
						price: "￥ 1.00元/日",
						deposit: "押金：免费"
					},
				],
			},
			{
				obj: [
					{
						id: "0",
						name: "交通工具|电动车",
						price: "￥ 5.00元/日",
						deposit: "押金：￥20"
					},
					{
						id: "1",
						name: "交通工具|电动车",
						price: "￥ 5.00元/日",
						deposit: "押金：￥20"
					},
				],
			},
			{
				obj: [
					{
						id: "0",
						name: "服务|代取快递",
						price: "￥ 3.00元/次",
						deposit: "押金：免费"
					},
					{
						id: "1",
						name: "服务|代取快递",
						price: "￥ 3.00元/次",
						deposit: "押金：免费"
					},
					{
						id: "2",
						name: "服务|代取快递",
						price: "￥ 3.00元/次",
						deposit: "押金：免费"
					},
				],
			},
			{
				obj: [
					{
						id: "0",
						name: "其他|PPT制作",
						price: "￥ 20.00元/次",
						deposit: "押金：免费"
					}
				],
			}
		],
		all : true,
		s1: false,
		s2: false,
		s3: false,
		s4:false,
		s5: false,
		list1: [
			{
				id: "0",
				name: "电子产品|蓝牙耳机",
				price: "￥ 3.00元/日",
				deposit: "押金：￥20"
			},
			{
				id: "1",
				name: "电子产品|蓝牙耳机",
				price: "￥ 3.00元/日",
				deposit: "押金：￥20"
			},
			{
				id: "2",
				name: "电子产品|蓝牙耳机",
				price: "￥ 3.00元/日",
				deposit: "押金：￥20"
			},
			{
				id: "3",
				name: "电子产品|蓝牙耳机",
				price: "￥ 3.00元/日",
				deposit: "押金：￥20"
			},
			{
				id: "4",
				name: "电子产品|蓝牙耳机",
				price: "￥ 3.00元/日",
				deposit: "押金：￥20"
			},
		],
		list2: [
			{
				id: "0",
				name: "日常用品|针线盒",
				price: "￥ 1.00元/日",
				deposit: "押金：免费"
			},
			{
				id: "1",
				name: "日常用品|针线盒",
				price: "￥ 1.00元/日",
				deposit: "押金：免费"
			},
		],
		list3: [
			{
				id: "0",
				name: "交通工具|电动车",
				price: "￥ 5.00元/日",
				deposit: "押金：￥20"
			},
			{
				id: "1",
				name: "交通工具|电动车",
				price: "￥ 5.00元/日",
				deposit: "押金：￥20"
			},
		],
		list4: [
			{
				id: "0",
				name: "服务|代取快递",
				price: "￥ 3.00元/次",
				deposit: "押金：免费"
			},
			{
				id: "1",
				name: "服务|代取快递",
				price: "￥ 3.00元/次",
				deposit: "押金：免费"
			},
			{
				id: "2",
				name: "服务|代取快递",
				price: "￥ 3.00元/次",
				deposit: "押金：免费"
			},
		],
		list5: [
			{
				id: "0",
				name: "其他|PPT制作",
				price: "￥ 20.00元/次",
				deposit: "押金：免费"
			}
		],
	
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
	},
	select1: function(event){
		this.setData({
			all: false,
			s1: true,
			s2:false,
			s3: false,
			s4: false,
			s5:false,
			showModalStatus:false,
		})
	},
	select2: function(event){
		this.setData({
			all: false,
			s1: false,
			s2:true,
			s3: false,
			s4: false,
			s5:false,
			showModalStatus:false,
		})
	},
	select3: function(event){
		this.setData({
			all: false,
			s1: false,
			s2:false,
			s3: true,
			s4: false,
			s5:false,
			showModalStatus:false,
		})
	},
	select4: function(event){
		this.setData({
			all: false,
			s1: false,
			s2:false,
			s3: false,
			s4: true,
			s5:false,
			showModalStatus:false,
		})
	},
	select5: function(event){
		this.setData({
			all: false,
			s1: false,
			s2:false,
			s3: false,
			s4: false,
			s5:true,
			showModalStatus:false,
		})
	},
})
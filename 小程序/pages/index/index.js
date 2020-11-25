//index.js
const app = getApp()

Page({
  	data: {
    	userInfo: {},
		ctcshow: false,
		show22: false,
		sum:0,
		comments:[
			{
				img: "../../images/u22.svg",
				name: "铲屎官",
				islend: "借过",
				starnum: 3,
				comment:"耳机很好用，租金也很便宜，好评~",
				like: true,
				thumb: 10,
				ctcshow: false,
				ctc:[
					{
						img: "../../images/u22.svg",
						name: "铲屎官",
						date: "2222",
						comment:"耳机很好用，租金也很便宜，好评~",	
					}
				]
			},
			{
				img: "../../images/u22.svg",
				name: "csg",
				islend: "借过",
				starnum: 4,
				comment:"还行吧",
				like: false,
				thumb: 20,
				ctcshow: false,
			},
		]
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
		this.setData({ show: true ,toaffirm: true});
	},
	onClose() {
		this.setData({ show: false ,toaffirm: false });
	},
	formatDate(date) {
		date = new Date(date);
		return `${date.getMonth() + 1}/${date.getDate()}`;
	},
	onConfirm(event) {
		const [start, end] = event.detail;
		this.setData({
		//show: false,
		date: `${this.formatDate(start)} - ${this.formatDate(end)}`,		
		sum: (end-start)/(24*60*60*1000)+1,
	});
	},
	torender: function(event){
		wx.navigateTo({
			url: '../render/render'
		})
	},
	tomessage: function(event){
	wx.navigateTo({
		url: '../message_detail/message_detail'
	});
	},
	thumbChange: function(event){
		var arrindex = event.currentTarget.dataset.index;
		var list = this.data.comments;
		if(list[arrindex].like)
		{list[arrindex].thumb = list[arrindex].thumb - 1;}
		else 
		{list[arrindex].thumb = list[arrindex].thumb + 1;}
		list[arrindex].like = !list[arrindex].like
		this.setData({
			comments: list,
		});
	},
	ctcShow: function(event){
		var arrindex = event.currentTarget.dataset.index;
		var list = this.data.comments;
		list[arrindex].ctcshow = !list[arrindex].ctcshow;
		this.setData({
			comments: list,
		})
	},

	clickbutton: function () {
		this.showShade();
	},
	showShade: function () {// 显示遮罩层
		this.setData({
			popupshow: true
		})
	},
	hideShade: function () {// 隐藏遮罩层
		this.setData({
			popupshow: false
		})
	},
	confirmbutton: function(){
		this.hideShade();
		this.setData({ show: false ,toaffirm: false });
	},
	cancelbutton: function(){
		this.hideShade();
	},
	printaffirm:function(){
		wx.showToast({
			title: '发布成功',
			icon: 'none', 
			duration: 2000     
		  });
		this.onLoad();
	}
})

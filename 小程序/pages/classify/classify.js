// pages/classification/classify.js
const good = wx.cloud.database().collection("goods")
Page({
  	data: {
		list: [],
		all : true,
		s1: false,
		s2: false,
		s3: false,
		s4:false,
		s5: false,
		
	},
	onRefresh(){
        wx.showLoading({
		  title: '刷新中...',
		  duration: 1500, 
        })
        //this.getData();获取数据，重置数据
	},
	onPullDownRefresh: function () {
    	this.onRefresh();
    },
	toindex:function(event){
		wx.navigateTo({
			url: '../index/index?id='+this.data.list._id
		})
	},
	onLoad: function (options) {
		var that = this;
		good.get({
			success:function(res){
				console.log('获取成功',res)
				that.setData({
					list:res.data
				})
			},
			fail:function(res){
				console.log('获取失败')
			}
		})
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
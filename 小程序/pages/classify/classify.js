// pages/classification/classify.js
const db = wx.cloud.database()
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
		text:'',
	},
	onPullDownRefresh: function () {
		this.onLoad();
		wx.stopPullDownRefresh();
    },
	toindex:function(event){
		console.log(this.data.list[event.currentTarget.dataset.index]._id);
		wx.navigateTo({
			url: '../index/index?id='+this.data.list[event.currentTarget.dataset.index]._id,
		})
	},
	onLoad: function (options) {
		var that = this;
		good.where({
		})
		.get({
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
			showModalStatus:false,
		});
		var that = this;
		good.where({
			kind:"电子产品"
		})
		.get({
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
	select2: function(event){
		this.setData({
			showModalStatus:false,
		});
		var that = this;
		good.where({
			kind:"日常用品"
		})
		.get({
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
	select3: function(event){
		this.setData({
			showModalStatus:false,
		});
		var that = this;
		good.where({
			kind:"交通出行"
		})
		.get({
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
	select4: function(event){
		this.setData({
			showModalStatus:false,
		});
		var that = this;
		good.where({
			kind:"服务"
		})
		.get({
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
	select5: function(event){
		this.setData({
			showModalStatus:false,
		});
		var that = this;
		good.where({
			kind:"其他"
		})
		.get({
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
	inputBind(e){
		this.setData({
			text : e.detail.value
		})
		
	},
	tosearch:function(){
		var that=this;
		db.collection('goods').where({
			name:{
				$regex:'.*'+ this.data.text + '.*',
				$options: 'i'
			},
		}).get({
		  success: res => {
			var that = this;
			that.setData({
				list:res.data
			})
		  }
		})
	},
})
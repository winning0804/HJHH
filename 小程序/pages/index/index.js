const db = wx.cloud.database()
const app = getApp()

Page({
	data: {
		userInfo: {},
		ctcshow: false,
		show22: false,
		sum: 0,
		autoplay: false,
		interval: 3000,
		duration: 1000,
		dateend: '2020-12-23',
		datestart:'2020-12-23',
		detail: [{
			"_id": "0bcbdde05fc76808008e51c9320508c3",
			"_openid": "oc66o5J3_sfxSz4ZmvQaPrUjt5f8",
			"address": "福建省福州市闽侯县学府北路",
			"deposit": 0,
			"intorduction": "请直接拍当天接当天还噢~",
			"name": "贷人表情包",
			"rent": 2,
			"img": [
				{ img: "https://www.appcgn.com/uploadfile/2020/0921/20200921105101945.jpg" },
				{ img: "https://tse1-mm.cn.bing.net/th/id/OIP.u6xcEtz9yVSU6b-iMlXyiwHaDu?pid=Api&rs=1" },
			]
		}],
		goodsid: '',
		comment: [],
		comments: [
			{
				img: "cloud://hjhh-3g93a1ut32a4515e.686a-hjhh-3g93a1ut32a4515e-1304375930/img/1606902133245-893",
				name: "铲屎官",
				islend: "借过",
				starnum: 3,
				comment: "耳机很好用，租金也很便宜，好评~",
			},
			{
				img: "cloud://hjhh-3g93a1ut32a4515e.686a-hjhh-3g93a1ut32a4515e-1304375930/img/1606902133245-893",
				name: "csg",
				islend: "借过",
				starnum: 4,
				comment: "还行吧",
			},
		],
		holder:[],
		cardCur: 0,
	},
	onLoad(option) {
		console.log(app.globalData.openid);
		var that = this;
		db.collection('goods').doc(option.id).get({
			success: function(res) {
				that.setData({
					detail: res.data,
				});
				console.log(that.data.detail);
			},
			fail:function(res){
				console.log('获取失败')
			}
		});
		console.log(that.data.detail);
		db.collection('user').where({
			_openid: that.data.detail[0]._openid,
		  }).get({
			success: function(res) {
				that.setData({
					holder: res.data,
				});
				console.log(res.data);
			},
			fail:function(res){
				console.log('获取失败')
			}
		});
		db.collection('comments').where({
			goods_id: option.id,
			})
			.get({
			success: function(res) {
				that.setData({
					comment:res.data,
				})
				console.log(res.data)
			},
			fail:function(){
				console.log("comments required failure.");
			}
	  });
		this.towerSwiper(this.data.detail.img);
	  },
	  DotStyle(e) {
		this.setData({
		  DotStyle: e.detail.value
		})
	  },
	  cardSwiper(e) {
		this.setData({
		  cardCur: e.detail.current
		})
	  },
	  towerSwiper(name) {
		let list = this.data[name];
		for (let i = 0; i < list.length; i++) {
		  list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
		  list[i].mLeft = i - parseInt(list.length / 2)
		}
		this.setData({
		  swiperList: list
		})
	  },
	  towerStart(e) {
		this.setData({
		  towerStart: e.touches[0].pageX
		})
	  },
	  towerMove(e) {
		this.setData({
		  direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
		})
	  },
	  towerEnd(e) {
		let direction = this.data.direction;
		let list = this.data.swiperList;
		if (direction == 'right') {
		  let mLeft = list[0].mLeft;
		  let zIndex = list[0].zIndex;
		  for (let i = 1; i < list.length; i++) {
			list[i - 1].mLeft = list[i].mLeft
			list[i - 1].zIndex = list[i].zIndex
		  }
		  list[list.length - 1].mLeft = mLeft;
		  list[list.length - 1].zIndex = zIndex;
		  this.setData({
			swiperList: list
		  })
		} else {
		  let mLeft = list[list.length - 1].mLeft;
		  let zIndex = list[list.length - 1].zIndex;
		  for (let i = list.length - 1; i > 0; i--) {
			list[i].mLeft = list[i - 1].mLeft
			list[i].zIndex = list[i - 1].zIndex
		  }
		  list[0].mLeft = mLeft;
		  list[0].zIndex = zIndex;
		  this.setData({
			swiperList: list
		  })
		}
	  },

	  showModal(e) {
		this.setData({
		  modalName: e.currentTarget.dataset.target
		});

	  },
	  hideModal(e) {
		this.setData({
		  modalName: null
		})
	  },

	  DateChange1(e) {
		this.setData({
		  datestart: e.detail.value
		})
	  },
	  DateChange2(e) {
		this.setData({
		  dateend: e.detail.value
		})
	  },
	  applicationsend(){
		  if(app.globalData.openid==''){
			wx.showToast({
				title: '请先登录！',
				icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
				duration: 2000     
			  })
		  }
		  else{
			db.collection('goods').doc(this.data.detail._id).update({
				// data 传入需要局部更新的数据
				data: {
				  // 表示将 done 字段置为 true
				  isrent: true
				},
				success: function(res) {
				  console.log(res.data)
				}
			  });
			  console.log(this.globalData);
			  db.collection('orders').add({
				// data 字段表示需新增的 JSON 数据
				data: {
					goodsid:this.data.detail._id,
					kind:this.data.detail.kind,
					borrowerid:app.globalData.openid,
					bstatus:"等待对方审核",
					dateend:this.data.dateend,
					datestart:this.data.datestart,
					deposit: this.data.detail.deposit,
					img: this.data.detail.img,
					name: this.data.detail.name,
					rent: this.data.detail.rent,
					renterid:this.data.holder[0]._openid,
					rstatus:"待审核"
				},
				success: function(res) {
				  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
				  console.log(res)
				}
			  });
			  wx.showToast({
				title: '申请发送成功！',
				icon: '',
				duration: 2000,
			  })
		  }
		
	  },
	
	//onLoad: function (option) {
		/*
		var that = this;
		db.collection('goods').doc(option.id).get({
			success: function(res) {
				that.setData({
					detail: res.data,
				});
				console.log('获取成功',res);
			},
			fail:function(res){
				console.log('获取失败')
			}
		});
		db.collection('comments').where({
				goods_id: option.id,
				})
				.get({
				success: function(res) {
					that.setData({
						comment:res.data,
					})
						console.log(res.data)
				},
				fail:function(){
					console.log("comments required failure.");
				}
		  });
		that.setData({
			goodsid:option.id,
		})*/
	//},
	/*
	swiperchange: function (e) {
		//console.log(e.detail.current)
		this.setData({
			swiperCurrent: e.detail.current
		})
	},*/
	clickme: function () {
		this.showModal();
	},
	/*showModal: function () {
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
	},*/
	onDisplay() {
		this.setData({ show: true, toaffirm: true });
	},
	onClose() {
		this.setData({ show: false, toaffirm: false });
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
			sum: (end - start) / (24 * 60 * 60 * 1000) + 1,
		});
	},
	torender: function (event) {
		wx.navigateTo({
			url: '../render/render?openid='+this.data.holder[0]._openid,
		})
	},
	tomessage: function (event) {
		wx.navigateTo({
			url: '../message_detail/message_detail'
		});
	},
	thumbChange: function (event) {
		var arrindex = event.currentTarget.dataset.index;
		var list = this.data.comments;
		if (list[arrindex].like) { list[arrindex].thumb = list[arrindex].thumb - 1; }
		else { list[arrindex].thumb = list[arrindex].thumb + 1; }
		list[arrindex].like = !list[arrindex].like
		this.setData({
			comments: list,
		});
	},
	ctcShow: function (event) {
		var arrindex = event.currentTarget.dataset.index;
		var list = this.data.comments;
		list[arrindex].ctcshow = !list[arrindex].ctcshow;
		this.setData({
			comments: list,
		})
	},

	clickbutton: function () {
		this.showShade();
		this.hideModal();
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
	confirmbutton: function () {
		this.hideShade();
		this.setData({ show: false, toaffirm: false });
		db.collection('goods').doc(this.data.goodsid).remove({
			success: function (res) {
				console.log("update success")
			},
			fail: function () {
				console.log("update failure");
			}
		});
		db.collection('orders').add({
			data: {
				kind: this.data.detail.kind,
				index: this.data.detail.index,
				name: this.data.detail.name,
				rent: this.data.detail.rent,
				deposit: this.data.detail.deposit,
				address: this.data.detail.address,
				img: this.data.detail.img,
				introduction: this.data.detail.introduction,
				id: this.data.detail.id,
				data: this.data.sum,
			},
			success: function (res) {
				console.log(res)
			}
		})
	},
	cancelbutton: function () {
		this.hideShade();
	},
	printaffirm: function () {
		wx.showToast({
			title: '发布成功',
			icon: 'none',
			duration: 2000
		});
		this.onLoad();
	}
})

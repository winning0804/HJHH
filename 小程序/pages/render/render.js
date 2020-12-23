//index.js
const app = getApp()
const db = wx.cloud.database()
let col1H = 0;
let col2H = 0;
let images = [
    { pic: "../../images/1.jpg", name:"蓝牙耳机", rent:30, deposit: 50, id:"01"},
    { pic: "../../images/2.jpg", name:"蓝牙耳机", rent:30, deposit: 50, id:"02"},
    { pic: "../../images/3.jpg", name:"蓝牙耳机", rent:30, deposit: 50, id:"03"},
    { pic: "../../images/4.jpg", name:"蓝牙耳机", rent:30, deposit: 50, id:"04"},
    { pic: "../../images/5.jpg", name:"蓝牙耳机", rent:30, deposit: 50, id:"05"},
    { pic: "../../images/6.jpg", name:"蓝牙耳机", rent:30, deposit: 50, id:"06"},
    { pic: "../../images/7.jpg", name:"蓝牙耳机", rent:30, deposit: 50, id:"07"},
    { pic: "../../images/8.jpg", name:"蓝牙耳机", rent:30, deposit: 50, id:"08"},
];
Page({
  	data: {
          iiid:'',
          i0:false,
          i1:true,
		scrollH: 0,
        imgWidth: 0,
        loadingCount: 0,
        images: [],
        col1: [],
        col2: [],
		tosend: true,
		sent: false,
		hide:false,
        isMine: false,
        holder:[],
	  },
	  
	  select1:function (e){
        this.setData({
            sortid:0,
            col1:[],
            col2:[],
            images: [],
        });
        var that = this;
        that.setData({
            i0:false,
            i1:true,
        })
        var that = this;
        db.collection('goods').where({
            isrent: this.data.i0,
            show:this.data.i1,
            _openid:this.data.iiid,
          })
          .get({
            success: function(res) {
              console.log(res.data);
              let ii = [];
              let iiii = res.data;
              console.log(iiii);
              for(var i = 0;i<iiii.length;i++){
                var i0 = {};
                i0._id = iiii[i]._id;
                i0.img = iiii[i].img[0];
                i0.name = iiii[i].name;
                i0.rent = iiii[i].rent;
                i0.deposit = iiii[i].deposit;
                i0.height = 180;
                ii.push(i0);
            }
              that.setData({
                  images:ii,
              });
            }

        });
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh;

                this.setData({
                    scrollH: scrollH,
                    imgWidth: imgWidth
                });

				this.loadImages();
            }
        })
        //此处获取可借物品
	},
	select2:function (e){
        this.setData({
            sortid:0,
            col1:[],
            col2:[],
            images: [],
        });
        var that = this;
        that.setData({
            i0:true,
            i1:true,
        })
        //此处获取已借物品
        var that = this;
        db.collection('goods').where({
            isrent: this.data.i0,
            show:this.data.i1,
            _openid:this.data.iiid,
          })
          .get({
            success: function(res) {
              console.log(res.data);
              let ii = [];
              let iiii = res.data;
              console.log(iiii);
              for(var i = 0;i<iiii.length;i++){
                var i0 = {};
                i0._id = iiii[i]._id;
                i0.img = iiii[i].img[0];
                i0.name = iiii[i].name;
                i0.rent = iiii[i].rent;
                i0.deposit = iiii[i].deposit;
                i0.height = 180;
                ii.push(i0);
            }
              that.setData({
                  images:ii,
              });
            }

        });
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh;

                this.setData({
                    scrollH: scrollH,
                    imgWidth: imgWidth
                });

				this.loadImages();
            }
        })
	},
	select3:function (e){
        this.setData({
            sortid:0,
            col1:[],
            col2:[],
            images: [],
        });
        var that = this;
        that.setData({
            i0:false,
            i1:false,
        })
        //此处获取隐藏物品
        var that = this;
        db.collection('goods').where({
            isrent: this.data.i0,
            show:this.data.i1,
            _openid:this.data.iiid,
          })
          .get({
            success: function(res) {
              console.log(res.data);
              let ii = [];
              let iiii = res.data;
              console.log(iiii);
              for(var i = 0;i<iiii.length;i++){
                var i0 = {};
                i0._id = iiii[i]._id;
                i0.img = iiii[i].img[0];
                i0.name = iiii[i].name;
                i0.rent = iiii[i].rent;
                i0.deposit = iiii[i].deposit;
                i0.height = 180;
                ii.push(i0);
            }
              that.setData({
                  images:ii,
              });
            }

        });
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh;

                this.setData({
                    scrollH: scrollH,
                    imgWidth: imgWidth
                });

				this.loadImages();
            }
        })
    },
	  onLoad: function (Option) {
        console.log(Option.openid)
        var that = this;
        db.collection('user').where({   
			_openid: Option.openid,
		  }).get({
			success: function(res) {
				that.setData({
                    holder: res.data,
                    iiid:Option.openid,
				});
			},
			fail:function(res){
				console.log('获取失败')
			}
        });
        var that = this;
        db.collection('goods').where({
            isrent: this.data.i0,
            show:this.data.i1,
            _openid:Option.openid,
          })
          .get({
            success: function(res) {
              console.log(res.data);
              let ii = [];
              let iiii = res.data;
              console.log(iiii);
              for(var i = 0;i<iiii.length;i++){
                var i0 = {};
                i0._id = iiii[i]._id;
                i0.img = iiii[i].img[0];
                i0.name = iiii[i].name;
                i0.rent = iiii[i].rent;
                i0.deposit = iiii[i].deposit;
                i0.height = 180;
                ii.push(i0);
            }
              that.setData({
                  images:ii,
              });
            }

        });
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh;

                this.setData({
                    scrollH: scrollH,
                    imgWidth: imgWidth
                });

				this.loadImages();
            }
        })
	},
	onImageLoad: function (e) {
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width;         //图片原始宽度
        let oImgH = e.detail.height;        //图片原始高度
        let imgWidth = this.data.imgWidth;  //图片设置的宽度
        let scale = imgWidth / oImgW;        //比例计算
        let imgHeight = oImgH * scale;      //自适应高度
        let images = this.data.images;
        let imageObj = null;

        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            if (img._id === imageId) {
                imageObj = img;
                break;
            }
		}
		imageObj.height = imgHeight;

        let loadingCount = this.data.loadingCount - 1;
        let col1 = this.data.col1;
        let col2 = this.data.col2;

        if (col1H <= col2H) {
            col1H += imgHeight;
            col1.push(imageObj);
        } else {
            col2H += imgHeight;
            col2.push(imageObj);
        }

        let data = {
            loadingCount: loadingCount,
            col1: col1,
            col2: col2
        };

        if (!loadingCount) {
            data.images = [];
        }
        this.setData(data);
    },
	loadImages: function () {
        col1H = 0;
        col2H = 0;
        this.setData({
            loadingCount: images.length,
            //images: images
        });
	},
	
    toindex1:function(event){
		console.log(this.data.col1[event.currentTarget.dataset.index]._id);
		wx.navigateTo({
			url: '../index/index?id='+this.data.col1[event.currentTarget.dataset.index]._id,
		})
    },
	toindex2:function(event){
		console.log(this.data.col2[event.currentTarget.dataset.index]._id);
		wx.navigateTo({
            url: '../index/index?id='+this.data.col2[event.currentTarget.dataset.index]._id,
		})
    },



	tomessage: function(event){
		wx.switchTab({
			url: '../message_detail/message_detail?openid='+this.data.iiid,
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


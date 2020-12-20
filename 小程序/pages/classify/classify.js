// pages/classification/classify.js
const db = wx.cloud.database()
const good = wx.cloud.database().collection("goods")
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
		tablist:[{"tabid":0,"title":"全部商品"},
                {"tabid":1,"title":"电子产品"},
				{"tabid":2,"title":"日常用品"},
				{"tabid":3,"title":"交通出行"},
				{"tabid":4,"title":"服务"},
				{"tabid":5,"title":"其他"}],
		searchtext:'',
		scrollH: 0,
        imgWidth: 0,
        loadingCount: 0,
        images: [],
        col1: [],
        col2: [],
        sortid:0,
        classifyid:0,
	},
    sortselect0:function (e){
        this.setData({
            sortid:0,
            col1:[],
            col2:[],
        });
        //此处将当前所有商品（可能已经经过了分类筛选）按综合（默认）方式排序返回并赋值给images数组，所需信息参照images数组
        this.onLoad();
    },
    sortselect1:function (e){
        this.setData({
            sortid:1,
            col1:[],
            col2:[],
        });
        //此处将当前所有商品（可能已经经过了分类筛选）按价格排序返回并赋值给images数组，所需信息参照images数组
        this.onLoad();
    },
    sortselect2:function (e){
        this.setData({
            sortid:2,
            col1:[],
            col2:[],
        });
        //此处将当前所有商品（可能已经经过了分类筛选）按信誉排序返回并赋值给images数组，所需信息参照images数组
        this.onLoad();
    },
    sortselect3:function (e){
        this.setData({
            sortid:3,
            col1:[],
            col2:[],
        });
        //此处将当前所有商品（可能已经经过了分类筛选）按距离排序返回并赋值给images数组，所需信息参照images数组
        this.onLoad();
    },
    classifyselect:function (e){
        this.setData({
            classifyid:e.currentTarget.dataset.index,
            col1:[],
            col2:[],
        })
        //此处返回经过分类筛选后的商品信息
        //如果classifyid=0:全部商品
        //如果classifyid=1:电子产品
        //如果classifyid=2:日常用品
        //如果classifyid=3:交通出行
        //如果classifyid=4:服务
        //如果classifyid=5:其他
        this.onLoad();
    },
    search:function(e){
        this.setData({
            classifyid:e.currentTarget.dataset.index,
            col1:[],
            col2:[],
        });
        //此处为搜索功能，根据关键字(即searchtext的值)返回商品并赋值给images数组
        this.onLoad();
    },
    onLoad: function () {
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
            if (img.id === imageId) {
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
        this.setData({
            loadingCount: images.length,
            images: images
        });
    },
    searchinput: function(e){
        this.setData({
            searchtext:e.detail.value,
        })
    },
    onPullDownRefresh: function () {
		wx.showNavigationBarLoading();
		this.onLoad();
		wx.hideNavigationBarLoading();
		wx.stopPullDownRefresh();
    },
	toindex:function(event){
		console.log(this.data.list[event.currentTarget.dataset.index]._id);
		wx.navigateTo({
			url: '../index/index?id='+this.data.list[event.currentTarget.dataset.index]._id,
		})
    },
    showModal(e) {
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
          modalName: null
        })
    },
})
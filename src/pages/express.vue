<!--suppress CssInvalidPropertyValue -->
<style lang="less">
	@import url("../less/config");
	page {
		background-image: url("https://raw.githubusercontent.com/SixOld/djtu-MyCampus-Six/master/img/recharge1.png");
		background-position: 50% calc(~"100% + 0rpx");
		background-repeat: no-repeat;
		background-size: 100%;
		background-attachment: fixed;
		height: 100%;
	}
	
	.navbar {
		flex: none;
		display: flex;
		background: #fff;
	}
	
	.navbar .item {
		position: relative;
		flex: auto;
		text-align: center;
		line-height: 80rpx;
	}
	
	.navbar .item.active {
		color: #67c6e6;
	}
	
	.navbar .item.active:after {
		content: "";
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 4rpx;
		background: #67c6e6;
	}
	
	.help {
		font-size: 0.8rem;
		color: #888;
		padding: 0 3%;
		text-align: center;
	}
	
	.input-group {
		&:hover {
			transition: all 1s;
			border: 2px solid @base-color;
		}
		display: flex;
		align-items: center;
		padding: 25rpx 10rpx;
		margin: 40rpx 3%;
		background: #fff;
		border-radius: 5px;
		border: 2px solid #f4f4f4;
		.input-label {
			color: #888;
			font-size: 13pt;
			height: 25rpx;
			line-height: 25rpx;
			padding: 0 25rpx;
			border-right: 1px solid #d8d8d8;
		}
		input {
			flex: 1;
			font-size: 13pt;
			min-height: 52rpx;
			height: 52rpx;
			line-height: 52rpx;
			padding: 0 25rpx;
		}
		textarea {
			flex: 1;
			font-size: 13pt;
			padding: 0 25rpx;
			width: 300px;
			height: 100px;
			display: block;
			position: relative;
		}
		image {
			height: 300rpx;
			width: 300rpx;
			margin-left: 120rpx;
		}
		picker {
			flex: 1;
			font-size: 12pt;
			min-height: 52rpx;
			height: 52rpx;
			line-height: 52rpx;
			padding: 0 25rpx;
			text-align: center;
			view {
				display: inline-block;
				margin: 0 50rpx;
			}
		}
		.input-placeholder,
		picker.placeholder {
			color: #ccc;
		}
	}
	
	#hidden {
		display: none;
	}
	
	#express {
		height: 100%;
		#title {
			width: 100%;
			display: flex;
			justify-content: center;
			height: 30%;
			flex-wrap: wrap;
			font-size: 1.5rem;
			text-align: center;
			view {
				margin-top: calc(~"15% - 1rem");
			}
			text {
				display: block;
				width: 100%;
			}
		}
		form {
			padding-top: 1rem;
			display: block;
			width: 100%;
			height: calc(~"60% - 1rem");
		}
	}
	
	button {
		background: rgba(255, 255, 255, 0.15);
		color: #000000;
		border-color: @base-color;
		margin: 20rpx; // width: calc(~"100% - 40rpx");
	}
</style>

<template>
	<view id="{{hidden[0]}}">
		<form @submit="express" id="express" report-submit="true">
			<view class="input-group" hover-class="active">
				<text class="user_name">姓名</text>
				<input name="user_name" type="text" placeholder="请输入您的姓名" />
			</view>
			<view class="input-group" hover-class="active">
				<text class="phone_number">手机</text>
				<input name="phone_number" type="number" placeholder="请输入您的手机号" />
			</view>
			<view class="input-group" hover-class="active">
				<text class="area">地点</text>
				<picker name="area" @columnchange="columnchange" @change="change" mode="multiSelector" range="{{range}}" range-key="name" value="{{choose}}">
					<view class="start">{{range[0][choose[0]].name}}</view>
					<view class="iconfont icon-switch"></view>
					<view class="end">{{range[1][choose[1]].name}}</view>
				</picker>
			</view>
			<view class="input-group" hover-class="active">
				<text class="place">寝室号</text>
				<input name="place" type="number" />
			</view>
			<view class="input-group" hover-class="active">
				<text class="sms_content">内容</text>
				<textarea name="sms_content" placeholder="请将短信内容复制到此" />
			</view>
			<view class="input-group">
				<text class="sms_img">短信截图</text>
				<image bindtap="chooseimg" src="{{chooseimg}}"></image>
			</view>
			<button formType="submit">提交</button>
		</form>
	</view>
	<view id="{{hidden[1]}}">
		<form @submit="pay" id="express" report-submit="true">
			<view id="title">代取编号：<text>{{help}}</text></view>
			<view class="help">请将代取编号填入留言中</view>
			<view class="help">请选择两元付款，支付其他金额小程序方概不负责</view>
			<button bindtap="Clipboard">一键复制编号</button>
			<button formType="submit">付款</button>
		</form>
	</view>
</template>

<script>
	import wepy from 'wepy'
	import HttpMixin from "mixins/http"
	import ToastMixin from "mixins/toast"
	import db from "util/db"
	import { domain } from '../config'
	export default class Express extends wepy.page {
		config = {
			navigationBarTitleText: '校园代取',
			navigationBarBackgroundColor: '#67c6e6',
		}
		data = {
			choose: [0, 0],
			range: [
				[{
					name: "本部",
					value: ""
				}, {
					name: "旅顺",
					value: "LS"
				}, {
					name: "爱恩",
					value: "aien"
				}]
			],
			hidden: ["", "hidden"],
			chooseimg: "../icon/chooseimg.png",
			help: ""
		}
		mixins = [HttpMixin, ToastMixin]
		components = {}
		methods = {
			change(e) {
				this.choose = e.detail.value
				db.Set("roomChoose", this.choose)
			},
			columnchange(e) {
				if(e.detail.column === 0) {
					this.changeColumn(e.detail.value)
				}
			},
			express(e) {
				let params = e.detail.value
				if(!params.user_name || !params.phone_number || !params.place || !params.sms_content) {
					this.ShowToast('内容不能有空')
					return
				}
				if(this.data.chooseimg === "../icon/chooseimg.png") {
					this.ShowToast("请上传图片")
					return
				}
				if(params.user_name.indexOf(">") >= 0 || params.user_name.indexOf("<") >= 0 || params.phone_number.indexOf("<") >= 0 || params.phone_number.indexOf(">") >= 0 || params.place.indexOf(">") >= 0 || params.place.indexOf("<") >= 0|| params.sms_content.indexOf(">") >= 0 || params.sms_content.indexOf("<") >= 0){
					this.ShowToast("小伙子你不乖哦")
					return
				}
				params.area = this.range[0][params.area[0]].name + this.range[1][params.area[1]].name
				params.openid = db.Get("openid")
				this.Formid(e.detail.formId)
				this.upimg(params)
			},
			pay(e) {
				let params = e.detail
				wepy.previewImage({
					urls: ["https://raw.githubusercontent.com/SixOld/djtu-MyCampus-Six/master/img/pay.jpg"],
				})
				this.Formid(e.detail.formId)
				this.sendFormid()
			},
			//复制到剪切板
			Clipboard(e) {
				let that = this
				if(that.data.help != "") {
					wepy.setClipboardData({
						data: this.data.help,
						success: function(res) {
							wepy.showToast({
								title: "成功",
								icon: 'success',
								duration: 2000
							})
						}
					})
				} else {
					wepy.showModal({
						title: '错误提示',
						content: '复制失败',
						showCancel: false,
						success: function(res) {}
					})
				}
			},
			chooseimg(e) {
				const that = this
				wepy.chooseImage({
					count: 1, //最多可以选择的图片总数  
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
					success: function(res) {
						let path = res.tempFilePaths
						that.chooseimg = path[0]
						that.$apply()
					},
					fail: function(res) {
						wepy.showModal({
							title: '错误提示',
							content: '图片选择失败',
							showCancel: false,
							success: function(res) {}
						})
					}
				})
			}
		}
		async upimg(params) {
			let that = this
			wepy.showToast({
				title: '正在上传...',
				icon: 'loading',
				mask: true,
				duration: 10000
			})
			wepy.uploadFile({
				url: domain + "/upload_exmsg",
				filePath: that.chooseimg,
				name: 'file',
				formData: params,
				header: {
					"Content-Type": "multipart/form-data"
				},
				success: function(res) {
					wepy.hideToast()
					let data = JSON.parse(res.data)
					if(data.status === 1) {
						that.hidden = ["hidden", ""]
						that.help = data.express_spid
						that.$apply()
					}
					console.log(data)
				},
				fail: function(res) {
					wepy.hideToast()
					wepy.showModal({
						title: '错误提示',
						content: '信息提交失败',
						showCancel: false,
						success: function(res) {}
					})
				}
			})
		}
		changeColumn(v) {
			if(v == 0) {
				this.range[1] = [{
					name: "一号楼",
					value: "1s"
				}, {
					name: "二号楼",
					value: "2s"
				}, {
					name: "三号楼",
					value: "3s"
				}, {
					name: "四号楼",
					value: "4s"
				}, {
					name: "五号楼",
					value: "5s"
				}]
			} else if(v == 1) {
				this.range[1] = [{
					name: "三号楼",
					value: "3s"
				}, {
					name: "四号楼",
					value: "4s"
				}, {
					name: "五号楼",
					value: "5s"
				}, {
					name: "六号楼",
					value: "6s"
				}, {
					name: "七号楼",
					value: "7s"
				}, {
					name: "八号楼",
					value: "8s"
				}, {
					name: "九号楼",
					value: "9s"
				}, {
					name: "十号楼",
					value: "10s"
				}, {
					name: "十一号楼",
					value: "11s"
				}, {
					name: "十二号楼",
					value: "12s"
				}, {
					name: "十三号楼",
					value: "13s"
				}]
			} else if(v == 2) {
				this.range[1] = [{
					name: "寝室楼",
					value: "s"
				}]
			} else {
				this.range[1] = [{
					name: "寝室楼",
					value: ""
				}]
			}
		}
		async Formid(formId) {
			let i = 0
			while(1) {
				let pass = db.Get("formid" + i)
				if(!pass) {
					db.Set("formid" + i, formId)
					break
				}
				i++
			}
		}
		async sendFormid(){
			let i = 0
			let params = []
			while(2){
				let pass = db.Get("formid"+i)
				db.Clean("formid"+i)
				if(!pass){
					break
				}
				params.push(pass)
				i++
			}
			try {
				this.data.formid.openid = db.Get("openid")
				this.data.formid.params = params
				const res = await this.POST('/get_formids', this.data.formid)
			} catch(error) {
				console.log(error);
			}
		}
		onLoad() {
			this.choose = db.Get("roomChoose") || [0, 0]
			this.changeColumn(this.choose[0])
			this.height = wx.getSystemInfoSync().windowHeight - 80
		}
	}
</script>
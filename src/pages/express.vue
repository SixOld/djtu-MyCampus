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
		}
		picker {
			flex: 1;
			font-size: 12pt;
			min-height: 52rpx;
			height: 52rpx;
			line-height: 52rpx;
			padding: 0 25rpx;
			text-align: center;
		}
		.input-placeholder,
		picker.placeholder {
			color: #ccc;
		}
	}
	
	#hidden {
		display: none;
	}
	
	#recharge {
		height: 100%;
		#title {
			width: 100%;
			display: flex;
			justify-content: center;
			height: 30%;
			flex-wrap: wrap;
			font-size: 2rem;
			text-align: center;
			view {
				margin-top: calc(~"15% - 1rem");
			}
			text {
				display: block;
				width: 100%;
			}
		}
		button {
			background: rgba(255, 255, 255, 0.15);
			color: #000000;
			border-color: @base-color;
			margin: 20rpx; // width: calc(~"100% - 40rpx");
		}
		form {
			padding-top: 1rem;
			display: block;
			width: 100%;
			height: calc(~"60% - 1rem");
		}
	}
</style>

<template>
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
			<text class="school_place">收件地址</text>
			<input name="school_place" type="text" placeholder="请输入您收件的地址" />
		</view>
		<view class="input-group" hover-class="active">
			<text class="area">地点</text>
			<picker name="area" @change="pickerHandle" value="{{areaindex}}" range="{{area}}">
				<view class="area">
					<text>{{area[areaindex]}}</text>
				</view>
			</picker>
		</view>
		<view class="input-group" hover-class="active">
			<text class="sms_content">内容</text>
			<textarea name="sms_content" placeholder="请输入短信内容" />
		</view>
		<button formType="submit">提交</button>
	</form>
</template>

<script>
	import wepy from 'wepy'
	import HttpMixin from "mixins/http"
	import ToastMixin from "mixins/toast"
	import db from "util/db"
	import ImgMixin from "mixins/img"
	export default class Express extends wepy.page {
		config = {
			navigationBarTitleText: '校园网充值',
			navigationBarBackgroundColor: '#67c6e6',
			"enablePullDownRefresh": true
		}
		data = {
			area: ['本部', '旅顺', '爱恩'],
			areaindex: 0
		}
		mixins = [HttpMixin, ToastMixin, ImgMixin]
		components = {}
		methods = {
			pickerHandle(e) {
				this.areaindex = e.detail.value
			},
			express(e) {
				let params = e.detail.value
				if(!params.user_name || !params.phone_number || !params.school_place || !params.sms_content) {
					this.ShowToast('内容不能有空')
					return
				}
				params.area = this.area[params.area]
				params.openid = db.Get("openid")
				params.text = "123456"
				this.Chooseimage("/upload_file",params)
				console.log(params)
			}
		}
	}
</script>
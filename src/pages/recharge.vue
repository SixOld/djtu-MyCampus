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
		font-size: 0.7rem;
		color: #888;
		padding: 0 3%;
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
			color: #fff;
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
	<!--导航条-->
	<view class="navbar">
		<text wx:for="{{navbar}}" data-idx="{{index}}" class="item {{currentTab==index ? 'active' : ''}}" wx:key="unique" bindtap="navbarTap">{{item}}</text>
	</view>

	<!--有卡充值-->
	<view hidden="{{currentTab!==0}}">
		<form @submit="recharge" id="recharge" report-submit="true">
			<view class="input-group" hover-class="active">
				<text class="input-label">账号</text>
				<input name="userAccount" type="number" placeholder="请输入您要充值的账号" />
			</view>
			<view class="input-group" hover-class="active">
				<text class="input-label">卡号</text>
				<input name="cardno" type="text" placeholder="请输入您的充值卡号" />
			</view>
			<view class="input-group" hover-class="active">
				<text class="input-label">密码</text>
				<input name="cardpwd" type="text" placeholder="请输入充值卡的密码" />
			</view>
			<button formType="submit">充值</button>
		</form>
	</view>

	<!--代充值-->
	<view hidden="{{currentTab!==1}}">
		<form @submit="pay" id="recharge" report-submit="true">
			<button formType="submit">充值</button>
		</form>
	</view>
</template>

<script>
	import wepy from 'wepy'
	import HttpMixin from "mixins/http";
	import ToastMixin from "mixins/toast";
	import db from "util/db";
	export default class Recharge extends wepy.page {
		config = {
			navigationBarTitleText: '校园网充值',
			navigationBarBackgroundColor: '#67c6e6'
		}
		data = {
			navbar: ['有卡充值', '代充值'],
		}
		mixins = [HttpMixin, ToastMixin]
		components = {}
		methods = {
			recharge(e) {
				let params = e.detail.value
				if(params.userAccount == 0 || params.cardno == 0 || params.cardpwd == '') {
					this.ShowToast('卡号密码必填！')
					return
				}
				if(params.userAccount.indexOf(">") >= 0 || params.userAccount.indexOf("<") >= 0 || params.cardno.indexOf("<") >= 0 || params.cardno.indexOf(">") >= 0 || params.cardpwd.indexOf(">") >= 0 || params.cardpwd.indexOf("<") >= 0) {
					this.ShowToast('小伙子你不乖哦')
					return
				}
				params.formId = e.detail.formId
				this.Recharge(params)
			},
			navbarTap(e) {
				this.setData({
					currentTab: e.target.dataset.idx
				})
			},
			pay(e) {
				let params = e.detail
				wepy.previewImage({
					urls: ["https://raw.githubusercontent.com/SixOld/djtu-MyCampus-Six/master/img/pay.jpg"],
				})
				this.Recharge(params.formid)
			}
		}
		async Recharge(params) {
			try {
				const res = await this.POST('/chargecard', params)
				wepy.showToast({
					title: "成功",
					icon: 'success',
					duration: 2000
				})
				wepy.navigateBack({
					delta: 1
				})
			} catch(error) {
				console.log(error);
			}
		}
	}
</script>
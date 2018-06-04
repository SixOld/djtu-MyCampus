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
	
	.swiper-tab {
		width: 100%;
		border-bottom: 2rpx solid #777777;
		text-align: center;
		line-height: 80rpx;
	}
	
	.swiper-tab-list {
		font-size: 30rpx;
		display: inline-block;
		width: 50%;
		color: #777777;
	}
	
	.on {
		color: #67c6e6;
		border-bottom: 5rpx solid #67c6e6;
	}
	
	.swiper-box {
		display: block;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	
	.swiper-box view {
		text-align: center;
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
	<view class="swiper-tab">
		<view class="swiper-tab-list {{currentTab==0 ? 'on' : ''}}" bindtap="swichNav0">有卡充值</view>
		<view class="swiper-tab-list {{currentTab==1 ? 'on' : ''}}" bindtap="swichNav1">代充值</view>
	</view>

	<swiper current="{{currentTab}}" class="swiper-box" duration="300" style="height:{{winHeight - 31}}px" bindchange="bindChange">
		<!-- 有卡充值 -->
		<swiper-item>
			<form @submit="recharge" id="recharge" report-submit = "true">
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
		</swiper-item>
		<!-- 代充值 -->
		<swiper-item>
			<form @submit="pay" id="recharge" report-submit = "true">
				<button formType="submit">充值</button>
			</form>
		</swiper-item>
	</swiper>
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
		};
		data = {
			currentTab: 0
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
			bindChange(e) {
				this.data.currentTab = e.detail.current
			},
			swichNav0(e) {
				this.data.currentTab = 0
				console.log(this.data)
				this.$apply()
			},
			swichNav1(e){
				this.data.currentTab = 1
				console.log(this.data)
				this.$apply()
			},
			pay(e) {
				let params = e.detail
				wepy.previewImage({
					urls: ["https://scuplus-1251451068.coscd.myqcloud.com/q.png"],
				})
				this.Recharge(formid)
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
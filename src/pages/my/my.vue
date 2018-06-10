<style lang="less">
	@import "./src/less/config";
	page {
		background: @bg-color;
	}
	
	.lists {
		.list {
			padding: 10rpx 20rpx;
			display: flex;
			justify-content: space-between;
			&:nth-child(1) {
				border-top: 3rpx solid #eee;
			}
			border-bottom: 3rpx solid #eee;
			background: #fff;
			.name {
				font-size: 32rpx;
			}
		}
	}
	
	.user-info {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin: 80rpx 0;
		flex-wrap: wrap;
		.avatar {
			@size: 150rpx;
			width: @size;
			height: @size;
			border-radius: 50%;
			border: 2rpx solid #eee;
			overflow: hidden;
			box-shadow: 4rpx 4rpx 4rpx #eee;
		}
		.name {
			text-align: center;
			margin-top: 20rpx;
			width: 100%;
		}
	}
</style>

<template>
	<view class="my">
		<view class="user-info">
			<view class="avatar">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<view class="name">
				<open-data type="userNickName" lang="zh_CN"></open-data>
			</view>
		</view>
		<view class="lists">
			<repeat for="{{items}}" item="item" key="index">
				<mview @mtap.user="to" :arg.sync="item">
					<view slot="content" class="list">
						<view class="name">{{item.name}}</view>
						<view class="iconfont icon-arrow-right"></view>
					</view>
				</mview>
			</repeat>
			<kefu>
				<view slot="content" class="list">
					<view class="name">联系客服</view>
					<view class="iconfont icon-arrow-right"></view>
				</view>
			</kefu>
		</view>
	</view>
</template>

<script>
	import wepy from "wepy";
	import MView from "components/mview";
	import kefu from "components/kefu";
	import HttpMixin from "mixins/http";
	import db from "util/db";
	export default class My extends wepy.page {
		config = {
			navigationBarTitleText: "个人中心"
		};
		components = {
			mview: MView,
			kefu:kefu
		};
		mixins = [HttpMixin];
		data = {
			items: [{
				name: "账号绑定",
				url: "/pages/bind"
			}, {
				name: "问题反馈",
				url: "/pages/my/feedback"
			}, {
				name: "账号解绑",
				url: "/pages/unbindwx"
			}],
			nickName: "未授权",
			avatar: ""
		};
		methods = {
			to(item) {
				wepy.navigateTo({
					url: item.url
				});
			}
		};
		onLoad() {}
	}
</script>
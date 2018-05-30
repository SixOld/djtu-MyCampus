<style lang="less">
  @import "./src/less/config.less";
  page {
    background-image: url("https://raw.githubusercontent.com/SixOld/djtu-MyCampus-Six/master/img/background1.png");
		background-position: 50% calc(~"100% + 0rpx");
		background-repeat: no-repeat;
		background-size: 100%;
		background-attachment: fixed;
		color: #3e3c3d;
		padding-top: 90rpx;
  }
  .func {
    background: #fff;
    margin: 20rpx;
    margin-top: -40rpx;
    position: relative;
    border-radius: 10rpx;
    box-shadow: 0rpx 4rpx 10rpx #ddd;
    z-index: 999;
    .func-row {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .login {
        &.no-verify {
          .iconfont {
            background: #ccc !important;
          }
        }
      }
    }
  }
  .mview {
    padding-top: 30rpx;
    width: 20%; // border-bottom: 1px solid #eee;
  }
  .icon-btn {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    flex-wrap: wrap;
    .icon {
      @size: 80rpx;
      width: @size;
      height: @size;
    }
    text {
      width: 100%;
      display: block;
      margin-top: 2rpx;
      font-size: 28rpx;
    }
  }
  .swiper {
    width: 100%;
    z-index: 99;
    margin-top: -40px;
    swiper-item {
      width: 100%;
    }
    image {
      z-index: 30;
      width: 100%;
    }
  }
  .ecard {
    display: flex;
    align-items: center;
    justify-content: center;
    color: @base-color;
    font-size: 70rpx;
    height: 150rpx;
    border-bottom: 2rpx dashed #fff;
  }
</style>

<template>
	<view>
		<!-- 公告区, 用于置放最新公告,头条新闻,推广消息 -->
		<swiper style="height: {{swiper_height}}px;" class="swiper" autoplay="true" interval="4000" duration="1000">
			<block wx:for="{{notices}}" wx:key="{{index}}">
				<swiper-item>
					<image style="height: {{swiper_height}}px;" @tap="noticeTo({{item.id}})" src="{{item.cover}}" class="slide-image" />
				</swiper-item>
			</block>
		</swiper>
		<!-- 功能区 -->
		<view class="func">
			<view class="func-row">
				<repeat for="{{funcs}}" item="item" key="index">
					<mview @mtap.user="to" class="mview {{item.type}} {{verify === 1 ? '' : 'no-verify'}}" :arg.sync="item">
						<view class="icon-btn" slot="content">
							<image class="icon" src="/icon/{{item.icon}}.png"></image>
							<text>{{item.name}}</text>
						</view>
					</mview>
				</repeat>
			</view>
		</view>
		<!-- 卡片区, 置放通知卡片 -->
		<notice iconBg="#eacdd1" icon="kechengbiao" title="公告" bg="card-schedule.png" :isShow.sync="notice" url="" footText="最新公告" noneText="暂无公告">
			<block slot="content" wx:for="{{notice}}" wx:if="{{item.course_name}}" wx:key="{{index}}">
				<view class="card-list">
					<view class="card-left">
						<text class="class-name">{{item.course_name}}</text>
					</view>
				</view>
			</block>
		</notice>
		<empty wx:if="{{verify == 0}}" msg="尚未绑定账号"></empty>
	</view>
</template>

<script>
	import wepy from 'wepy'
	import HttpMixin from "../mixins/http";
	import ToastMixin from '../mixins/toast';
	import index from '../util/index/index'
	import MView from '../components/mview'
	import Card from '../components/card'
	import Empty from '../components/empty'
	import db from "../util/db"
	export default class Index extends wepy.page {
		config = {};
		components = {
			"mview": MView,
			"notice": Card,
			"empty": Empty
		}
		mixins = [HttpMixin, ToastMixin]
		data = {
			notices: [{
				cover: 'https://raw.githubusercontent.com/SixOld/djtu-MyCampus-Six/master/img/index1.jpg',
				id: 1
			}],
			funcs: index.funcs,
			swiper_height: 200,
		};
		computed = {
			verify() {
				return db.Get('verify')
			},
			notice() {
				const notice = [{
					course_name: "很抱歉该小程序只能连数据流量，连接djtu无法使用，如果造成不便敬请谅解"
				}]
				return notice
			}
		}
		navigate(item) {
			let url = item.url
			if((item.type == 'login' && this.verify == 0) || (item.type == 'unbind' && this.verify == 0)) {
				wepy.showModal({
					title: '账号信息错误',
					content: '统一身份认证账号未绑定或密码错误！是否前往绑定？',
					success: function(res) {
						if(res.confirm) {
							wepy.navigateTo({
								url: 'bind'
							})
						}
					}
				})
				return
			} else if(item.type == 'unbind' && this.verify == 1) {
				this.UnbindIP()
			} else {
				wepy.navigateTo({
					url: url
				})
			}
		}
		async UnbindIP() {
			try {
				const openid = db.Get('openid')
				const res = await this.POST('/unbindip', {
					"openid": openid
				})
				wepy.showToast({
		      title: "IP解绑成功",
		      icon: 'success',
		      duration: 2000
		    })
			} catch(error) {
				console.log(error);
			}
		}
		methods = {
			/*noticeTo(id) {
        wepy.navigateTo({
          url: `details?id=${id}&&from=notice`
        })
      },*/
			to(item) {
				this.navigate(item)
			}
		}
		onLoad() {
			// 设置swipe高度 2:1
			this.swiper_height = wepy.getSystemInfoSync().windowWidth / 2
			// this.notices = []
		}
		onShareAppMessage(options) {
			return {}
		}
	}
</script>
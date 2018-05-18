<style lang="less">
  page {
    background: #efefef;
    padding-bottom: 20rpx;
  }
  .card {
    margin: 0 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 4rpx 4rpx 20rpx #a82413;
    background-image: url("https://scuplus.oss-cn-shenzhen.aliyuncs.com/ecard/1.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    .money {
      margin-top: -4rem;
      color: #fff;
      font-size: 2.3rem;
    }
  }
  .title {
    margin: 0.5rem 1rem;
    color: #888;
    font-size: 0.8rem;
  }
  .table {
    padding: 0.5rem;
    .row {
      background: #efefef;
      box-shadow: 4rpx 4rpx 8rpx #ddd;
      &:nth-child(1) {
        background: #efefef;
      }
      margin-top: 0.5rem;
      display: flex;
      view {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.2rem;
      }
      .item {
        padding: 0.2rem 0;
        color: #fffafa;
        border-radius: 0.1rem;
        view {
          padding: 0.3rem 0;
        }
      }
      .use {
        box-shadow: 4rpx 4rpx 4rpx #ccc;
        background: red;
      }
      .not-use {
        box-shadow: 4rpx 4rpx 4rpx #ccc;
        background: #008e59;
      }
    }
  }
</style>

<template>
  <view>
    <!-- 上网数据 -->
    <view class="ulli">
      <view class="table">
	      <view class="row">
	        <view>开始时间</view>
	        <view>{{trans.LimitTime}}</view>
	      </view>
	      <view class="row">
	        <view>结束时间</view>
	        <view>{{trans.LimitTime}}</view>
	      </view>
	      <view class="row">
	        <view>账号</view>
	        <view>{{trans.code}}</view>
	      </view>
	      <view class="row">
	        <view>流量详情</view>
	        <view>{{trans.flow}}</view>
	      </view>
	      <view class="row">
	        <view>套餐</view>
	        <view>{{trans.packageName}}</view>
	      </view>
	      <view class="row">
	        <view>姓名</view>
	        <view>{{trans.userName}}</view>
	      </view>
	    </view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import EcardMixin from '../mixins/ecard';
  import HttpMixin from '../mixins/http';
  import ToastMixin from '../mixins/toast';
  import DataMixin from "../mixins/data";
  import db from "../util/db";
  export default class Demand extends wepy.page {
    config = {
      navigationBarTitleText: '我的校园网',
      navigationBarBackgroundColor: '#b92c18',
      enablePullDownRefresh: true
    }
    mixins = [EcardMixin, HttpMixin, ToastMixin, DataMixin]
    components = {}
    data = {
      height: 0,
      trans: []
    }
    computed = {
    }
    async onPullDownRefresh() {
      try {
        await this.UpdateECard()
        await this.get()
      } catch (error) {
        console.log(error);
      }
      wepy.stopPullDownRefresh()
    }
    async get() {
      try {
      	const openid = db.Get("openid")
        let trans = await this.PostWithBind('/myinfo',{"openid":openid})
        this.trans = trans
        this.$apply()
        this.InitSet("trans", trans)
      } catch (error) {
        console.log(error);
      }
    }
    async onLoad() {
      this.height = wx.getSystemInfoSync().windowWidth / 1.6
      this.Init("trans")
    }
  }
</script>

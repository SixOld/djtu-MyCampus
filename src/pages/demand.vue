<style lang="less">
  page {
    background-image: url("https://raw.githubusercontent.com/SixOld/djtu-MyCampus-Six/master/img/demand.png");
    background-position: 50% calc(~"100% + 150rpx");
    background-repeat: no-repeat;
    background-size: 100%;
    background-attachment: fixed;
    padding-bottom: 20rpx;
  }
  .title {
    margin: 0.5rem 1rem;
    color: #888;
    font-size: 0.8rem;
  }
  .hidden{
  	display: none;
  }
  .show{
  	text-align: center;
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
    button {
      background: #efefef;
      color: #000000;
      border-color: #efefef;
      margin-top: 120rpx;
      bottom: 2rem;
      width: calc(~"100% -20rpx");
    }
  }
</style>

<template>
  <view>
    <!-- 上网数据 -->
    <view class="ulli">
    	<view class="{{hidden[1].value}}">
    		下拉有惊喜
    	</view>
      <view class="{{hidden[0].value}}">
	      <view class="row">
	        <view>周期开始时间</view>
	        <view>{{trans.LimitTime}}</view>
	      </view>
	      <view class="row">
	        <view>周期结束时间</view>
	        <view>{{trans.LimitTime}}</view>
	      </view>
	      <view class="row">
	        <view>账号</view>
	        <view>{{trans.accountId}}</view>
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
      navigationBarBackgroundColor: '#d32002',
      enablePullDownRefresh: true
    }
    mixins = [EcardMixin, HttpMixin, ToastMixin, DataMixin]
    components = {}
    data = {
      height: 0,
      trans: [],
      hidden:[{
      	value:"hidden"
      },{
      	value:"show"
      }],
    }
    computed = {
    }
    methods = {
    }
    async onPullDownRefresh() {
      try {
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
        if(trans.status === 1){
 	       	this.data.hidden[0].value = "table"
 	       	this.data.hidden[1].value = "hidden"
        }
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

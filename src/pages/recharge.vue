<!--suppress CssInvalidPropertyValue -->
<style lang="less">
  @import url("../less/config");
  page {
   	background-image: url("https://raw.githubusercontent.com/SixOld/djtu-MyCampus-Six/master/img/recharge.png");
    background-position: 50% calc(~"100% + 300rpx");
    background-repeat: no-repeat;
    background-size: 100%;
    background-attachment: fixed;
    height: 100%;
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
  #recharge {
    height: 100%;
    #title {
      width: 100%;
      display: flex;
      justify-content: center;
      height: 30%;
      flex-wrap: wrap;
      background: @base-color;
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
      background: #fefefe;
    }
  }
</style>

<template>
  <view id="recharge">
    <form @submit="recharge">
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
</template>

<script>
  import wepy from 'wepy'
  import HttpMixin from "mixins/http";
  import ToastMixin from "mixins/toast";
  import db from "util/db";
  export default class Recharge extends wepy.page {
    config = {
      navigationBarTitleText: '校园网充值',
      navigationBarBackgroundColor: '#003ec6'
    };
    mixins = [HttpMixin, ToastMixin]
    components = {}
    methods = {
      recharge(e) {
        let params = e.detail.value
        if (params.userAccount == 0 ||params.cardno == 0 || params.cardpwd == '') {
          this.ShowToast('卡号密码必填！')
          return
        }
        if ( params.userAccount.indexOf(">") >= 0|| params.userAccount.indexOf("<") >= 0|| params.cardno.indexOf("<") >= 0|| params.cardno.indexOf(">") >= 0||params.cardpwd.indexOf(">") >= 0|| params.cardpwd.indexOf("<") >= 0) {
          this.ShowToast('小伙子你不乖哦')
          return
        }
        this.Recharge(params)
      }
    };
    async Recharge(params) {
      try {
        const res = await this.POST('/chargecard',params)
        wepy.showToast({
		      title: "成功",
		      icon: 'success',
		      duration: 2000
		    })
        wepy.navigateBack({
          delta: 1
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
</script>

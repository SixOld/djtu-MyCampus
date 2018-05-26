<!--suppress CssInvalidPropertyValue -->
<style lang="less">
  @import "./src/less/bind";
  @base-color: #333;
  page {
    width: 100%;
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
      border: 1px solid #fefefe;
      .input-label {
        color: #fefefe;
        border-right: 1px solid #fefefe;
      }
    }
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    padding: 25rpx 10rpx;
    margin: 40rpx 3%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    .input-label {
      color: #fefefe;
      font-size: 13pt;
      height: 25rpx;
      line-height: 25rpx;
      padding: 0 25rpx;
      border-right: 1px solid #d8d8d8;
    }
    input {
      color: #fefefe;
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
  #bind {
    width: 100%;
    height: 100%;
    #content {
      border-radius: 10rpx;
      margin: 100rpx auto;
      padding-top: 40rpx;
      background: rgba(255, 255, 255, 0.15);
      width: 95%;
      height: 700rpx;
      #title {
        font-size: 40rpx;
        text-align: center;
        color: #fefefe;
      }
      button {
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
        border-color: @base-color;
        margin: 20rpx; // width: calc(~"100% - 40rpx");
      }
      form {
        padding-top: 20rpx;
        display: block;
        width: 100%;
      }
    }
  }
</style>

<template>
  <view id="bind">
    <view id="stars"></view>
    <view id="stars2"></view>
    <view id="stars3"></view>
    <view id="content">
      <view id="title">绑定</view>
      <form @submit="bind">
        <view class="input-group" hover-class="active">
          <text class="input-label">账号</text>
          <input name="userAccount" type="number" placeholder="请输入您的校园网账号" />
        </view>
        <view class="input-group" hover-class="active">
          <text class="input-label">密码</text>
          <input name="password" type="password" placeholder="请输入您的密码" />
        </view>
        <view class="help">
        </view>
        <button formType="submit">绑定</button>
      </form>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import HttpMixin from "mixins/http";
  import ToastMixin from "mixins/toast";
  import db from "util/db";
  export default class BindJwc extends wepy.page {
    config = {
      navigationBarTitleText: '绑定',
      navigationBarBackgroundColor: '#090a0f',
      navigationBarTextStyle: 'white',

    }
    mixins = [HttpMixin, ToastMixin]
    components = {}
    methods = {
      bind(e) {
        let params = e.detail.value
        if (params.userAccount == 0 || params.password == '') {
          this.ShowToast('学号密码必填！')
          return
        }
        if ( params.userAccount.indexOf(">") >= 0|| params.userAccount.indexOf("<") >= 0) {
          this.ShowToast('小伙子你不乖哦')
          return
        }
        this.Bind(params)
      }
    }
    async Bind(params) {
      try {
      	params.openid = db.Get("openid")
      	params= JSON.stringify(params)
        const res = await this.POST('/bindwx',params)
        let Base64 = require("js-base64").Base64
      	const token = Base64.encode(res.token+":3456834518")
	    	db.Set('token', token)
	    	db.Set('verify', res.verify)
	    	db.Set('user',res.user)
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

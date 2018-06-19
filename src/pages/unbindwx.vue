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
    text-align: center ;
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
  #unbind {
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
      form {
        padding-top: 20rpx;
        display: block;
        width: 100%;
      }
    }
  }
  button {
	  background: rgba(255, 255, 255, 0.15);
		color: #fff;
		border-color: @base-color;
	  margin: auto 20rpx;
	  position: absolute;
	  bottom: 2rem;
	  width: calc(~"100% - 40rpx");
	}
	#egg{
    	border-radius: 10rpx;
      margin: 100rpx auto;
      margin-top: 1800rpx;
      padding: 50rpx;
      background: rgba(255, 255, 255, 0.15);
      width: 95%;
      height: 700rpx;
      image {
      	text-align: center;
      	width: 600rpx;
      	height: 650rrpx;
      }
    }
</style>

<template>
  <view id="unbind">
  	<view id="stars"></view>
    <view id="stars2"></view>
    <view id="stars3"></view>
    <form @submit="unbindwx">
    	<view class="help">真的要离开我们么QAQ？？</view>
      <button formType="submit">解绑微信</button>
    </form>
    <view id="egg">
    	<block  wx:for="{{egg}}" wx:key="{{index}}">
    		<image src="{{item.value}}"></image>
    	</block>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import HttpMixin from "mixins/http";
  import ToastMixin from "mixins/toast";
  import db from "util/db"
  export default class Unbindwx extends wepy.page {
  	data = {
    	egg:[{
    		value:"https://raw.githubusercontent.com/SixOld/djtu-MyCampus-Six/master/img/qrcode_for_gh_901209664f05_1280.jpg"
    	}]
    }
    config = {
      navigationBarTitleText: '解绑微信',
      navigationBarBackgroundColor: '#090a0f',
      navigationBarTextStyle: 'white'

    }
    mixins = [HttpMixin, ToastMixin]
    components = {}
    methods = {
      unbindwx(){
      	this.Formid()
		  	this.Unbindwx()
      }
    }
    async Unbindwx() {
      try {
      	const openid = db.Get('openid')
        const res = await this.POST('/unbindwx',{"openid":openid})
        db.Set('token',res.token)
        db.Set('verify',res.verify)
        wepy.navigateBack({
	        delta: 1
	      })
      } catch (error) {
        console.log(error);
      }      
    }
    async Formid(formId) {
			let i = 0
			while(1) {
				let pass = db.Get("formid" + i)
				console.log(pass)
				if(!pass) {
					db.Set("formid" + i, formId)
					break
				}
				i++
			}
		}
  }
</script>

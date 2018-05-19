<!--suppress CssInvalidPropertyValue -->
<style lang="less">
  @import url("../less/config");
  page {
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
  #unbind {
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
  <view id="unbind">
    <form @submit="unbindwx">
      <button formType="submit">解绑微信</button>
    </form>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import HttpMixin from "mixins/http";
  import ToastMixin from "mixins/toast";
  import db from "util/db"
  export default class Unbindwx extends wepy.page {
    config = {
      navigationBarTitleText: '解绑微信'
    }
    mixins = [HttpMixin, ToastMixin]
    components = {}
    methods = {
      unbindwx() {
        this.Unbindwx()
      }
    }
    async Unbindwx() {
      try {
      	const openid = db.Get('openid')
        const res = await this.POST('/unbindwx',{"openid":openid})
        this.ShowToast('成功')
        db.Set('token',res.token)
        db.Set('verify',res.verify)
        wepy.navigateBack({
          delta: 1
        })
      } catch (error) {
        console.log(error);
      }      
    }
  }
</script>

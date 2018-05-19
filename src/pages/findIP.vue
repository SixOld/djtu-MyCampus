<style lang="less">
  @import "./src/less/config";
  page {
  	background-image: url("https://raw.githubusercontent.com/SixOld/djtu-MyCampus-Six/master/img/findip.png");
    background-position: 50% calc(~"100% + 380rpx");
    background-repeat: no-repeat;
    background-size: 100%;
    background-attachment: fixed;
    color: #3e3c3d;
    padding-top: 90rpx;
  }
  .header {
    top: 0rpx;
    display: flex;
    width: 100%;
    height: 80rpx;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    z-index: 100;
    background: #ab96c5;
    color: @white;
  }
  .timeline {
    position: relative;
    margin: 0 auto;
    padding: 1em 0;
    list-style-type: none;
  }
  .timeline:before {
    position: absolute;
    left: 50%;
    top: 0;
    content: ' ';
    display: block;
    width: 6rpx;
    height: 100%;
    @bg: #857e95;
    margin-left: -3px;
    background: @bg;
    background: linear-gradient(to bottom, #fff 0%, @bg 8%, @bg 92%, #fff 100%);
    z-index: 5;
  }
  .timeline .li {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 30rpx;
    height: 80rpx;
    .left {
      width: 300rpx;
      text-align: center;
    }
    .right {
      width: 300rpx;
      text-align: center;
    }
  }
  .timeline .li:before {
    position: absolute;
    content: ' ';
    display: block;
    width: 20rpx;
    height: 20rpx;
    right: calc(~"50% - 10rpx");
    background: #fff;
    border-radius: 20rpx;
    border: 4rpx solid #c3a6cb;
    z-index: 10;
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
  .hide{
  	display:none;
  }
  .show{
    padding: 0.5rem;
    display: block;
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
    <picker @columnchange="columnchange" @change="change" mode="multiSelector" range="{{range}}" range-key="name" value="{{choose}}">
      <view class="header">
        <view class="start">{{range[0][choose[0]].name}}</view>
        <view class="iconfont icon-switch"></view>
        <view class="end">{{range[1][choose[1]].name}}</view>
      </view>
    </picker>
    <form @submit="room">
      <view class="input-group" hover-class="active">
        <input name="roomid" type="number" placeholder="请输入您的寝室号" />
      </view>
      <button formType="submit">查询</button>
    </form>
    <view class="{{hidden[0].value}}">
      <view class="row">
        <view>开始ip</view>
        <view>{{res.start_ip}}</view>
      </view>
      <view class="row">
        <view>结束ip</view>
        <view>{{res.end_ip}}</view>
      </view>
      <view class="row">
        <view>Subnet</view>
        <view>{{res.Subnet}}</view>
      </view>
      <view class="row">
        <view>gateway</view>
        <view>{{res.gateway}}</view>
      </view>
      <view class="row">
        <view>dns1</view>
        <view>{{res.SDNS}}</view>
      </view>
      <view class="row">
        <view>dns2</view>
        <view>{{res.FDNS}}</view>
      </view>
      <view class="row">
        <view>tongji</view>
        <view>{{res.tongji}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy'
  import db from "util/db"
  import DataMixin from "mixins/data";
  import ToastMixin from "mixins/toast";
  import HttpMixin from "mixins/http";
  export default class Find extends wepy.page {
    config = {
      navigationBarBackgroundColor: '#ab96c5',
      navigationBarTitleText: '查ip'
    }
    mixins = [DataMixin,HttpMixin,ToastMixin]
    changeColumn(v) {
      if (v == 0) {
        this.range[1] = [{
          name: "一号楼",
          value: "1s"
        }, {
          name: "二号楼",
          value: "2s"
        }, {
          name: "三号楼",
          value: "3s"
        }, {
          name: "四号楼",
          value: "4s"
        }, {
          name: "五号楼",
          value: "5s"
        }]
      } else if(v == 1) {
        this.range[1] = [{
          name: "三号楼",
          value: "3s"
        },{
          name: "四号楼",
          value: "4s"
        },{
          name: "五号楼",
          value: "5s"
        },{
          name: "六号楼",
          value: "6s"
        },{
          name: "七号楼",
          value: "7s"
        },{
          name: "八号楼",
          value: "8s"
        },{
          name: "九号楼",
          value: "9s"
        },{
          name: "十号楼",
          value: "10s"
        },{
          name: "十一号楼",
          value: "11s"
        },{
          name: "十二号楼",
          value: "12s"
        },{
          name: "十三号楼",
          value: "13s"
        }]
      }else if(v == 2){
      	this.range[1]= [{
      		name:"寝室楼",
      		value:"s"
      	}]
      }else{
      	this.range[1]= [{
      		name:"寝室楼",
      		value:""
      	}]
      }
    }
    methods = {
      change(e) {
        this.choose = e.detail.value
        db.Set("roomChoose", this.choose)
      },
      columnchange(e) {
        if (e.detail.column === 0) {
          this.changeColumn(e.detail.value)
        }
      },
      room(e) {
        this.room = e.detail.value
        db.Set("room",this.room.roomid)
        if (this.room.roomid == 0) {
          this.ShowToast('寝室号必填！')
          return
        }
        if ( this.room.roomid.indexOf(">") >= 0|| this.room.roomid.indexOf("<") >= 0) {
          this.ShowToast('小伙子你不乖哦，有想法的话联系我们一起干怎么样')
          return
        }
       	this.Room(this.room)
      }
    }
    watch = {
      choose(n, o) {
        this.chooseStr = this.range[0][n[0]].value + this.range[1][n[1]].value + this.room
      }
    }
    onLoad() {
      this.choose = db.Get("roomChoose") || [0, 0]
      this.changeColumn(this.choose[0])
      this.room = db.Get("room")
      this.height = wx.getSystemInfoSync().windowHeight - 80
    }
    async Room(params) {
      try {
      	const res = await this.POST('/selectip',{"room":this.chooseStr})
      	this.res = res
      	if(res.status === 1){
       		this.data.hidden[0].value = "show"
       	}
      } catch (error) {
        console.log(error);
      }
    }
    data = {
      choose: [0, 0],
      range: [
        [{
          name: "本部",
          value: ""
        }, {
          name: "旅顺",
          value: "LS"
        }, {
          name: "南区",
          value: "NQ"
        },{
        	name: "爱恩",
          value: "aien"
        }]
      ],
      res:[],
      hidden:[{
      	value:"hide"
      }],
      height: 300,
    }
  }
</script>

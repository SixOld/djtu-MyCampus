<style lang="less">
  @import "./icon/iconfont";
  @import "./less/config";
</style>

<script>
  import wepy from 'wepy'
  import 'wepy-async-function'
  import {
    POST
  } from './util/http'
  import db from './util/db'
  export default class extends wepy.app {
    config = {
      pages: [
        'pages/index',
        'pages/bind',
        'pages/unbindwx',
        'pages/findIP',
        'pages/recharge',
        'pages/demand', 
        'pages/express', 
        'pages/my/my',
      ],
      window: {
        navigationBarBackgroundColor: '#28c9a9',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: '我的校园',
        backgroundColor: '#dddddd'
      },
      tabBar: {
        selectedColor: '#2c2c2c',
        color: '#e6e6e6',
        backgroundColor:'#28c9a9',
        list: [{
            pagePath: 'pages/index',
            text: '首页',
            iconPath: 'icon/home.png',
            selectedIconPath: 'icon/home@select.png'
          },
          {
            pagePath: 'pages/my/my',
            text: '个人中心',
            iconPath: 'icon/user.png',
            selectedIconPath: 'icon/user@select.png'
          }
        ]
      }
    };
    constructor() {
      super()
      this.use('requestfix')
    }
    onLaunch() {
      this.getToken()
    }
    onShow() {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
      })
      updateManager.onUpdateReady(function() {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，请重启应用',
          showCancel: false,
          success: function(res) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        })
      })
      updateManager.onUpdateFailed(function() {
        // 新的版本下载失败
        console.log("新版本下载失败！");
      })
    }
    // 微信登录
    wxLogin() {
      return new Promise((resolve, reject) => {
        wepy.login({
          success: res => {
            if (res.code) {
              resolve(res.code)
            } else {
              reject(res.errMsg)
            }
          },
          fail: err => reject(err)
        })
      })
    }
    async login() {
      try {
        // 微信登录
        const code = await this.wxLogin()
        // 登录服务器
        const resp = await POST('/login',{"code":code})
        let Base64 = require("js-base64").Base64
      	const token = Base64.encode(resp.data.token+":3456834518")
        if (resp.data.status === 1) {
          db.Set('openid',resp.data.openid)
          db.Set('token', token)
          db.Set('verify', resp.data.verify)
          db.Set('card_num', resp.data.card_num)
          if (resp.data.verify === 0) {
            wepy.navigateTo({
              url: 'bind'
            })
          }
        } else {
          throw '用户登录失败！'
        }
      } catch (err) {
        console.log('err', err)
      }
    }
    checkSession() {
      return new Promise((resolve, reject) => {
        wepy.checkSession({
          success: () => resolve(),
          fail: () => reject()
        })
      })
    }
    async getToken() {
      let token = db.Get('token')
      this.login()
    }
  };
</script>

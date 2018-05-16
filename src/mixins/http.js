import wepy from 'wepy';
import {
  domain
} from '../config';
import db from '../util/db';

export default class HttpMixin extends wepy.mixin {
  GetWithBind(url, params = {}, showToast = true, handler = {}) {
    return this.requestWithBind('GET', url, params, showToast, handler)
  }

  PostWithBind(url, params = {}, showToast = true, handler = {}) {
    return this.requestWithBind('POST', url, params, showToast, handler)
  }

  async requestWithBind(method, url, params = {}, showToast = true, handler = {}) {
    if (db.Get('verify') === 0) {
      wepy.showModal({
        title: '绑定',
        content: '统一认证平台未绑定或密码错误，是否跳转到绑定页面？',
        success: function (res) {
          if (res.confirm) {
            wepy.navigateTo({
              url: '/pages/bind'
            })
          } else if (res.cancel) {
            wepy.navigateBack({
              delta: 1
            })
          }
        }
      })
      throw '未绑定账号'
    } else {
      return this.request(method, url, params, showToast, handler)
    }
  }

  // GET请求
  GET(url, params = {}, showToast = true, handler = {}) {
    return this.request('GET', url, params, showToast, handler)
  }

  // POST请求
  POST(url, params = {}, showToast = true, handler = {}) {
    return this.request('POST', url, params, showToast, handler)
  }

  request(method, url, params = {}, showToast = true, handler = {}) {
    handler.url = domain + url
    handler.data = params
    handler.header = {
      'Authorization': 'Basic ' + db.Get('token')
    }
    handler.method = method
    if (method === 'POST') {
      handler.header['content-type'] = 'application/json; charset=UTF-8'
    }

    wepy.showLoading && wepy.showLoading({
      title: '加载中...'
    })

    return new Promise((resolve, reject) => {
      handler.success = res => {
        wepy.hideLoading && wepy.hideLoading()
        if (res.data.status === 1) {
          if (showToast) {this.ShowToast('success')}
          resolve(res.data)
        } 
        else if(res.data.status === 0){
        	if (showToast) {this.ShowToast("密码错误")}
          reject(res)
        }
        else {
          if (showToast) {this.ShowToast("网络错误")}
          reject(res)
        }
      }
      handler.fail = () => {
        wepy.hideLoading && wepy.hideLoading()
        if (showToast) {this.ShowToast('网络错误', 'error', 3000)}
        reject('Network request failed')
      }
      wepy.request(handler)
    })
  }
}

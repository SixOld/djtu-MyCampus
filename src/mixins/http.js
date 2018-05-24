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
    
      return this.request(method, url, params, showToast, handler)
    
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
        else if (res.data.errorCode === 101) {
          if (showToast) {this.ShowToast('未知错误')}
          resolve(res.data)
        } 
        else if(res.data.errorCode === 102){
        	if (showToast) {this.ShowToast("没有该房间号")}
          reject(res)
        }
        else if(res.data.errorCode === 103){
          if (showToast) {this.ShowToast("用户已经绑定微信小程序")}
          reject(res)
        }
        else if(res.data.errorCode === 104){
          if (showToast) {this.ShowToast("绑定账号的用户名或者密码错误")}
          reject(res)
        }
        else if(res.data.errorCode === 105){
          if (showToast) {this.ShowToast("账号没有绑定")}
          reject(res)
        }
        else if(res.data.errorCode === 106){
          if (showToast) {this.ShowToast("信息查询错误")}
          reject(res)
        }
        else if(res.data.errorCode === 107){
          if (showToast) {this.ShowToast("账号没有IP可以解绑")}
          reject(res)
        }
        else if(res.data.errorCode === 108){
          if (showToast) {this.ShowToast("解绑ip错误")}
          reject(res)
        }
        else if(res.data.errorCode === 109){
          if (showToast) {this.ShowToast("非法访问")}
          reject(res)
        }
        else if(res.data.errorCode === "30001"){
          if (showToast) {this.ShowToast("用户不存在，请重新输入")}
          reject(res)
        }
        else if(res.data.errorCode === "30014"){
          if (showToast) {this.ShowToast("充值卡不存在")}
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

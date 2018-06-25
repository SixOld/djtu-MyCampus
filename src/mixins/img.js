import wepy from 'wepy'
import { domain } from '../config'

export default class ImgMixin extends wepy.mixin {
		Chooseimage(url , params) {
			wx.chooseImage({
					count: 1, //最多可以选择的图片总数  
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
					success: function(res) {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
						var tempFilePaths = res.tempFilePaths;
						//启动上传等待中...  
						wx.showToast({
							title: '正在上传...',
							icon: 'loading',
							mask: true,
							duration: 10000
						})
							wx.uploadFile({
								url: domain + url,
								filePath: tempFilePaths[0],
								name: 'file',
								formData: params,
								header: {
									"Content-Type": "multipart/form-data"
								},
								success: function(res) {
									let resp = res.data
									console.log(resp)
								}
							})
						}
					})
			}
		}
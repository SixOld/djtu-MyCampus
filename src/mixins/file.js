import wepy from 'wepy'
import { domain } from '../config'

export default class ImgMixin extends wepy.mixin {
	UploadFile(url , Path , params) {
		wx.uploadFile({
			url: domain + url, //仅为示例，非真实的接口地址
			filePath: Path[0],
			name: 'file',
			header: {
				"Content-Type": "multipart/form-data"
			},
			formData: params,
			success: function(res) {
				return res.data
			}
		})
	}
}
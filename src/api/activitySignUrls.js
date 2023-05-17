import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/activitySignUrls',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/activitySignUrls/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/activitySignUrls',
    method: 'put',
    data
  })
}
// 生成二维码url
export function generateQR(params) {
  return request({
    url: 'api/activitySignUrls/generate_sign_qrcode',
    method: 'get',
    params: params
  })
}

export default { add, edit, del, generateQR }

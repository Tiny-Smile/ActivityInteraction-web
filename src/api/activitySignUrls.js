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

//获取签到二维码
export function getSignQrcode(acti_id){
  return request({
    url: 'api/activitySignUrls/generate_sign_qrcode?acti_id='+acti_id,
    method: 'get'
  })
}

export default { add, edit, del, getSignQrcode }

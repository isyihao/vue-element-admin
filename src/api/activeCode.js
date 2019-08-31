import request from '@/utils/request'

/**
 * 获取激活码分页列表
 */
export function getActiveCodePagination(data) {
  return request({
    url: '/activeCode/activeCodes',
    method: 'get',
    params: data
  })
}

/**
 * 批量生成激活码
 */
export function generateActiveCodes(data) {
  return request({
    url: '/activeCode/activeCodes',
    method: 'post',
    data
  })
}

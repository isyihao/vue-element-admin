import { getActiveCodePagination, generateActiveCodes } from '@/api/activeCode'

const state = {
  tableData: [],
  pagination: {
    pageSize: 10,
    currentPage: 1,
    total: 0
  }
}

const mutations = {
  SET_PAGINATION: (state, data) => {
    state.pagination = data
  },
  SET_TABLE_DATA: (state, data) => {
    state.tableData = data
  }
}

const actions = {
  getActiveCodePagination({ commit }, data) {
    return new Promise((resolve, reject) => {
      getActiveCodePagination(data).then(response => {
        console.info(response)
        const { data } = response
        const tableData = data.content
        commit('SET_TABLE_DATA', tableData)
        const pagination = {
          pageSize: data.pageable.pageSize,
          currentPage: data.pageable.pageNumber + 1,
          total: data.totalElements
        }
        commit('SET_PAGINATION', pagination)
        resolve(data)
      })
    })
  },
  generateActiveCodes({ commit }, data) {
    return new Promise((resolve, reject) => {
      generateActiveCodes(data).then(response => {
        resolve(data)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

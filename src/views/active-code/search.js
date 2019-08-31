import store from '@/store'

export default {
  data() {
    return {
      loading: true,
      searchForm: {
        // 激活码
        codeValue: null,
        status: null,
        codeType: null
      }
    }
  },
  methods: {
    // 切换页数
    handleSizeChange(val) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = val
      this.searchData()
    },
    // 切换每页显示数据数量
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.searchData()
    },
    searchData() {
      var data = Object.assign(this.searchForm, this.pagination)
      data.currentPage--
      if (data.currentPage < 0) { data.currentPage = 0 }
      this.loading = true
      store.dispatch('activeCode/getActiveCodePagination', data).then(() => {
        this.loading = false
      }).catch((error) => {
        this.loading = false
        console.info(error)
      })
    },
    // 清空
    clearSearchForm() {
      this.$refs['searchForm'].resetFields()
      this.searchData()
    }
  },
  computed: {
    tableData() {
      return store.state.activeCode.tableData
    },
    pagination() {
      return store.state.activeCode.pagination
    }
  },
  mounted: function() {
    this.searchData()
  },
  watch: {
    tableData: {
      handler: function(val, oldval) {
      },
      deep: true
    }
  }

}

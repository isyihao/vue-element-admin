import store from '@/store'

export default {
  data() {
    return {
      // 其他数据

      // 新增数据的表单
      addForm: {
        number: 1,
        codeType: 0
      },
      // 新增数据的表单校验规则
      addFormRules: {

      },
      addDialogVisible: false
    }
  },
  created() {

  },
  methods: {

    // 关闭新增对话框的回调 清空表单数据
    onCloseAddDialog(formName) {
      this.$refs[formName].resetFields()
    },
    // 显示新增对话
    showAddDialog() {
      this.addDialogVisible = true
    },
    // 提交表单 新增
    submitAdd(formName) {
      const data = JSON.parse(JSON.stringify(this.addForm))
      store.dispatch('activeCode/generateActiveCodes', data).then(() => {
        this.searchData()
        this.addDialogVisible = false
        this.$message({
          message: '生成成功!' || 'Success',
          type: 'success',
          duration: 3 * 1000
        })
      })
      // 最后需要清除表单数据
      this.$refs[formName].resetFields()
    }
  }
}

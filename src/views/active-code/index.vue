<template>
  <div class="app-container">

    <el-row>
      <el-col :span="21">
        <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="100" label-position="right">
          <el-form-item prop="codeValue" label="激活码">
            <el-input v-model="searchForm.codeValue" placeholder="请输入激活码值" />
          </el-form-item>
          <el-form-item prop="codeType" label="类型">
            <el-select v-model="searchForm.codeType" placeholder="请选择类型">
              <el-option :value="null" label="所有" />
              <el-option :value="0" label="日卡" />
              <el-option :value="1" label="周卡" />
              <el-option :value="2" label="季卡" />
              <el-option :value="3" label="年卡" />
              <el-option :value="4" label="永久卡" />
            </el-select>
          </el-form-item>
          <el-form-item prop="state" label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态">
              <el-option :value="null" label="所有" />
              <el-option :value="0" label="未激活" />
              <el-option :value="1" label="已激活" />
              <el-option :value="2" label="已过期" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3">
        <el-button-group>
          <el-button
            v-loading="loading"
            icon="el-icon-search"
            type="primary"
            size="small"
          />
          <el-button
            v-loading="loading"
            size="small"
            icon="el-icon-refresh"
            type="primary"
          />
          <el-popover
            placement="bottom-start"
            width="100"
            trigger="hover"
          >
            <div>
              <el-button type="text" @click="addDialogVisible = true">生成激活码</el-button>
            </div>
            <div>
              <el-button type="text">导出Excel</el-button>
            </div>
            <el-button slot="reference" type="primary" icon="el-icon-more" size="small" />
          </el-popover>
        </el-button-group>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >

      <el-table-column
        align="center"
        prop="codeValue"
        label="激活码"
        width="200"
      />

      <el-table-column
        align="center"
        prop="codeType"
        label="类型"
        width="100"
        :formatter="function(row,col,cellValue,index) {
          if(cellValue == 0){
            return '日卡'
          }else if(cellValue == 1){
            return '周卡'
          }else if(cellValue == 2){
            return '月卡'
          }else if(cellValue == 3){
            return '季卡'
          }else if(cellValue == 4){
            return '年卡'
          }else if(cellValue == 5){
            return '永久卡'
          }
        }"
      />

      <el-table-column
        align="center"
        prop="status"
        label="状态"
        width="100"
        :formatter="function(row,col,cellValue,index) {
          if(cellValue == 0){
            return '未激活'
          }else if(cellValue == 1){
            return '已激活'
          }else if(cellValue == 2){
            return '已过期'
          }
        }"
      />

      <el-table-column
        align="center"
        prop="createTime"
        label="生成时间"
        width="180"
      />

      <el-table-column
        align="center"
        prop="activeMachine"
        label="激活设备"
        width="200"
      />

      <el-table-column
        align="center"
        prop="activeTime"
        label="激活时间"
        width="180"
      />

      <el-table-column
        align="center"
        prop="expirationTime"
        label="到期时间"
        width="180"
      />

      <el-table-column
        align="center"
        prop="onlineCountLimit"
        label="最大在线数量"
        width="180"
      />

      <el-table-column
        align="center"
        prop="remark"
        label="备注"
        width="auto"
      />

      <el-table-column
        align="center"
        label="操作"
        width="210"
      />
    </el-table>
    <el-pagination
      :current-page="pagination.currentPage"
      :page-sizes="[10, 15, 20, 50,100]"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      layout="total,sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!--生成激活码对话-->
    <el-dialog title="请选择数量" :visible.sync="addDialogVisible" width="300px">
      <el-form :model="addForm" label-width="100px" label-position="right">
        <el-form-item label="激活码数量:">
          <el-select v-model="addForm.number" placeholder="请选择">
            <el-option
              v-for="item in [1,5,10,20,50,100]"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>

        </el-form-item>
        <el-form-item label="激活码类型:">

          <el-select v-model="addForm.codeType" placeholder="请选择">
            <el-option :value="0" label="日卡" />
            <el-option :value="1" label="周卡" />
            <el-option :value="2" label="月卡" />
            <el-option :value="3" label="季卡" />
            <el-option :value="4" label="年卡" />
            <el-option :value="5" label="永久卡" />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import add from './add'
import search from './search'

export default {
  name: 'ActiveCode',
  mixins: [add, search],
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>

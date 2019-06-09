<template>
  <div>
    <el-row type="flex" justify="space-between">
      <div>
        <el-button>新增</el-button>
        <el-button type="danger"
        @click="handleDeleteMore">
        删除</el-button>
      </div>
      <div class="input-search">
        <el-input placeholder="请输入内容" class="input-with-select" 
        v-model="searchValue">
          <el-button slot="append" icon="el-icon-search"
          @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" width="300">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" class="goods-img"/>
            <div>
              {{ scope.row.title }}
            </div>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="类型" 
      prop="categoryname" width="120">
      </el-table-column>
      <el-table-column label="价格" 
      prop="sell_price" width="120">
      </el-table-column>
    </el-table>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        selectGoods:[],
        pageIndex:1,
        pagesize:5,
        searchValue:"",
        total:0,
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // 删除多项商品
      handleDeleteMore(){
        const arr = this.selectGoods.map(v => {
          return v.id;
        });
        const ids = arr.join(',');
        //调用删除商品的接口
        this.$axios({
          url:`http://localhost:8899/admin/goods/del/${ids}`,
          method:'GET'
        }).then(res => {
          const{message,status} = res.data;
          if(status===0){
            this.$message.success(message);
            //请求商品列表数据
            this.getList();
          }else{
            this.$message.error(message);
          }
        })
      },
      //选择框状态改变时保存选中的商品数据
      handleSelectionChange(val) {
        this.selectGoods = val;
      },
      //切换每页显示的条数
      handleSizeChange(val) {
        this.pagesize = val;
        this.getList();
      },
      //切换页数
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getList();
      },
      //删除单个商品
      handleDelete(goods) {
        const id = goods.id;
        this.$axios({
          url:`http://localhost:8899/admin/goods/getlist?pageIndex=1&pageSize=5&searchvalue=`,
          method:'GET',
        }).then(res => {
          const {message,status} = res.data;
          if(status===0){
            this.$message.success(message);
            //请求商品列表数据
            this.getList();
          }else{
            this.$message.error(message);
          }
        })
      },
      //封装获取数据
      getList(){
        this.$axios({
          url:`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pagesize}&searchvalue=${this.searchValue}`,
          method:'GET',
        }).then(res => {
          const data = res.data;
          this.tableData = data.message;
          this.total = data.totalcount;
        })
      },
      //处理搜索
      handleSearch(){
        //发起请求，赋值searchValue
        this.getList();
      }
    },
    mounted(){
      this.getList();
    }
  }
</script>

<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.input-search{
      width:200px;
  }
  
.goods-img{
    width:60px;
    height:60px;
    /*表示元素压缩的倍数，如果是0，表示不会被挤压*/
    flex-shrink: 0;
    margin-right:5px;
}
</style>

<template>
<el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类型">

        <el-select v-model="form.category_id" placeholder="请选择类型">
          <el-option 
          v-for="(item,index) in categorys" :key="index" 
          :label="item.title" :value="item.category_id">
          </el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
          <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
          <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
        <!-- action：上传地址 -->
        <!-- show-file-list：是否支持多选 -->
        <!-- on-success: 上传成功之后的回调函数 -->
        <!-- before-upload：上传之前执行的函数 -->
        <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
        <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
        <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
        <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
        <el-upload
          action="http://localhost:8899/admin/article/uploadimg"
          list-type="picture-card"
          :on-success="handleCartSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="form.fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
        <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <el-form-item label="内容描述">
        <quillEditor v-model="form.content">
        </quillEditor>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
    </el-form-item>
</el-form>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
    data() {
      return {
        form: {
          title: '',
          sub_title: '',
          goods_no: '',
          category_id:'',
          stock_quantity: '',
          market_price:'',
          sell_price:'',
          status:true,
          is_slide:true,
          is_top:false,
          is_hot:false,
          zhaiyao: '',
          content:'',
          imglist:[],
          fileList:[],
        },
          categorys:'',
          imageUrl:'',
          dialogVisible:false,
          dialogImageUrl:'',
      }
    },
    methods: {
      onSubmit() {
        //提交到添加商品的接口
        this.$axios({
          url:'http://localhost:8899/admin/goods/edit' + this.$route.params.id,
          method:'POST',
          data:this.form,
          withCredentials:true
        }).then(res => {
          const{status,message} = res.data;
          if(status===0){
            //成功的提示
            this.$message.success(message);
            this.$router.back();
          }else{
            // this.$router.push('/login');
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        //把上传成功的结果赋值给form.imgList
        this.form.imgList = [res];
      },
      beforeAvatarUpload(file) {
        //判断图片大小有没有大于2m
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      //多张图片的删除事件
      handleRemove(file, fileList) {
        // console.log(file, fileList);
        //把删除后的列表赋值给this.form.fileList
        // const files = fileList.map(v => {
        //   return v.response;
        // });
        this.form.fileList = files;
      },
      //图片的预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //上传多张图片成功的回调
      handleCartSuccess(res,file,fileList){
        // console.log(fileList);
        // const files = fileList.map(v => {
        //   return v.response;
        // });
        this.form.fileList.push(file.response)
      }
    },
    components:{
      quillEditor
    },
    mounted(){
      this.$axios({
        url:'http://localhost:8899/admin/category/getlist/goods',
        method:'GET'
      }).then(res => {
        const {status,message} = res.data;
        this.categorys = message;
      });
      //获取动态参数的id
      const{id} = this.$route.params;
      this.$axios({
          url:'http://localhost:8899/admin/goods/getgoodsmodel/' + id,
          method:'GET'
      }).then(res => {
          const{status,message} = res.data;
          //对象合并
          this.form = {
              ...message,
              category_id:+message.category_id,
              fileList:message.fileList.map(v=>{
                  return{
                      ...v,
                      url:`http://localhost:8899${v.shorturl}`
                  }
              })
          }
          //imageUrl封面的预览
          this.imageUrl = message.imgList[0].url;
      })
    }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

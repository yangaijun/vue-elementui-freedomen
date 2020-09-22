<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible=true">
      {{i18n['upload']}}
    </el-button>
    <el-dialog :visible.sync="dialogVisible" :title="i18n['uploadImage']">
      <el-upload
        :multiple="config.multiple !== void 0 ? config.multiple : true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="onSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        :data="config.data"
        :headers="config.headers"
        :name="config.name"
        :action="config.action"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          {{i18n['clickUpload']}} 
        </el-button>
      </el-upload>
      <span slot="footer">
        <el-button @click="dialogVisible = false">
          {{i18n['cancel']}} 
        </el-button>
        <el-button type="primary" @click="handleSubmit">
          {{i18n['confirm']}} 
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { language as lg } from './language' 
export default {
  name: 'EditorSlideUpload',
  props: {
    language: {
      type: String,
      default: 'zh'
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    let i18n = lg[this.language]
    return {
      dialogVisible: false,
      i18n: i18n, 
      fileList: []
    }
  },
  methods: {
    handleSubmit() { 
      if (this.uploading) {
        this.$message(this.i18n['successTip'])
        return
      } 
      this.$emit('successCBK', this.fileList)
      this.fileList = []
      this.dialogVisible = false
    },
    onSuccess(response) { 
      const fn = (data) => { 
        if (data) {
            if (Array.isArray(data)) { 
                this.fileList = this.fileList.concat(data.map(el => {
                  return {
                    url: this.config.preUrl ?  this.config.preUrl + el : el
                  }
                }))
            } else {
                this.fileList.push({url: this.config.preUrl ?  this.config.preUrl + data : data}) 
            }
        }
        this.uploading = false
      }
      if (this.config && this.config.onSuccess && typeof this.config.onSuccess === 'function') {
          fn(this.item.config.onSuccess(response)) 
      } else {
          fn(response)
      }
    },
    handleRemove(file) {
      let index = this.fileList.findIndex(el => {
        return file.url.indexOf(el.url) !== -1
      })
      this.fileList = this.fileList.splice(index, 1)
    },
    beforeUpload(file) {
      this.uploading = true
      if (this.config && this.config.beforeUpload) {
          return this.config.beforeUpload(file)
      } 
      return true
    }
  }
}
</script>

<style scoped>
.editor-slide-upload {
  margin-bottom: 20px; 
}
.editor-slide-upload >>> .el-upload--picture-card {
  width: 100%;
}
</style>

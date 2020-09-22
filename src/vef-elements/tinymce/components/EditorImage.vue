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
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        :data="config.data"
        :headers="config.headers"
        :name="config.name"
        action="http://127.0.0.1:8090/fdapi/Tab/importFile"
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
      listObj: {},
      fileList: []
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message(this.i18n['successTip'])
        return
      } 
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      console.log(response, file)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response[i]
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
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

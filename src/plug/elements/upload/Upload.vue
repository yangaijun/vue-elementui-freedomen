<template> 
    <el-upload
        :ref="ref" 
        :action="item.config && item.config.action"
        :list-type="listType(mixin_type(item))" 
        :class="[mixin_type(item) == 'upload-avatar' && 'avatar-uploader', mixin_class(item.class, item.value, item.$data)]"
        :multiple="item.config && item.config.multiple"
        :data="getConfig('data')"
        :headers="getConfig('headers')"
        :name="getConfig('name')"
        :with-credentials="item.config && item.config.withCredentials"
        :show-file-list="mixin_type(item) == 'upload-avatar' ? false : (item.config && item.config.showFileList)"
        :limit="item.config && item.config.limit"
        :on-success="onSuccess"
        :file-list="fileList"
        :on-preview="item.config && item.config.onPreview"
        :on-remove="onRemove"
        :auto-upload="item.config && makeAutoUpload(item.config.autoUpload)"
        :drag="mixin_type(item) == 'upload-file'"
        :before-upload="beforeUpload">  
            <div v-if="mixin_type(item) == 'upload-file'">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </div>  
            <i class="el-icon-plus" v-else-if="mixin_type(item) == 'upload-pcard'"></i>
            <i v-else-if="mixin_type(item) == 'upload-avatar' && !imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <el-button  size="small" type="primary" v-else-if="mixin_type(item) == 'upload'">点击上传</el-button>
            <div slot="tip" v-if="item.config && item.config.tip" class="el-upload__tip">{{item.config.tip}}</div> 
    </el-upload> 
</template>
<script>
import base from '../../mixins/base.js';
import util from '../../utils/util.js' 
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdupload',
    data() {
        return {
            imageTypes: [],
            fileList: [],
            imageUrl: ''
        }
    }, 
    computed: {
        tempValue () {
            return this.item.value
        },
        ref() {
            this.uuid = util.getUUID() 
            return this.uuid
        }
    },
    watch: {
        tempValue(nd, od) { 
            if (this.mixin_type(this.item) == 'upload-avatar') {
                this.setUploadAvatarValue()
            } else if (!this.innerChange && this.testValueChange(nd, od)) {
                this.resetFileList(nd)
            }
            this.innerChange = false
        }
    },
    methods: {
        makeAutoUpload(autoUpload) {
            if (typeof autoUpload == 'function') {
                autoUpload(() => {
                    this.$refs[this.uuid].submit()
                })
                return false
            } else {
                return true
            }
        },
        listType(type) {
            const types = {
                'upload-pcard':  'picture-card',
                'upload-picture':  'picture',
                'upload-avatar': undefined
            }  
            return types[type]
        },
        change() { 
            this.innerChange = true
            this.mixin_event({
                type: 'change',
                prop: this.item.prop,
                value: this.item.value
            })
        },
        beforeUpload(file) { 
            if (this.item.config) {
                let fileSizeRange = this.item.config.fileSizeRange
                let fileTypes = this.item.config.fileTypes
                if (fileSizeRange) { 
                    let max = void 0, min = void 0
                    if (Array.isArray(fileSizeRange)) {   
                        if (fileSizeRange.length == 1) { 
                            max = fileSizeRange[0]
                        } else if (fileSizeRange.length >= 2) { 
                            min = fileSizeRange[0]
                            max = fileSizeRange[1] 
                        }
                    } else if (typeof fileSizeRange == 'number') {
                        max = fileSizeRange
                    } else {
                        console.error('typeof upload config "fileSizeRange": number or array')
                    }
                    if (max != void 0) {
                        const _fileSize = file.size / 1024 
                        min = min || 0 
                        if (min > _fileSize || max < _fileSize) { 
                            let message = min > _fileSize ? `上传文件大小不能小于${min}KB!` : `上传文件大小不能超过 ${max}KB!`
                            this.$message({
                                message: message,
                                type: 'warning'
                            })
                            return false
                        } 
                    }
                }
                if (fileTypes) {
                    if (Array.isArray(fileTypes) || typeof fileTypes == 'string') {
                        let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
                        if (!fileTypes.includes(extension)) {
                             this.$message({
                                message: "文件格式不合法。",
                                type: 'warning'
                            })
                            return false
                        } 
                    } else {
                        console.error('typeof upload config "fileTypes": string or array')
                    }
                }
                if (this.item.config.beforeUpload) {
                    return this.item.config.beforeUpload({file: file, data: this.item.$data, value: this.item.value})
                }
            } 
            return true
        },
        onSuccess(response, file, fileList) { 
            const fn = (data) => { 
                if (data) {
                    if (this.mixin_type(this.item) == 'upload-avatar') {
                        if (typeof data === 'string') {
                            this.imageUrl = this.getUrl(data)
                        } else {
                            this.imageUrl = this.getUrl(data.url)
                        } 
                        this.item.value = data
                    }
                    else if (Array.isArray(data))
                        this.item.value = this.item.value.concat(data)
                    else {
                        this.item.value.push(data) 
                    }
                    this.change()
                }
            }
            if (this.item.config && this.item.config.onSuccess && typeof this.item.config.onSuccess === 'function') {
                fn(this.item.config.onSuccess(response)) 
            } else {
                fn(response)
            }
        },
        onRemove(file) {  
            if (!this.item.value)
                return
            this.item.value = this.item.value.filter(el => {
                if (file.url) {
                    if (el.url) 
                        return file.url.indexOf(el.url) === -1
                    else 
                        return file.url.indexOf(el) === -1 
                } 
                return el 
            }) 
            this.change()
        },
        testValueChange(nd = '', od = '') { 
            return nd.toString() !== od.toString()
        }, 
        getUrl(url) {
            return this.mixin_filter(this.item.filter, url, this.item.$data)
        },
        resetFileList(value) {
            if (typeof value === 'string') {
                value = this.item.value = value.split(',') 
            } 
            if (Array.isArray(value) && value.length != this.fileList.length) {
                this.fileList = value.map(el => {
                    if (typeof el === 'string') 
                        return {url: this.getUrl(el)}
                    else 
                        return {...el, url: this.getUrl(el.url)}
                }) 
            }    
        },
        getConfig(key) { 
            if (this.item.config) {
                if (typeof this.item.config[key] === 'function') { 
                    return this.item.config[key]({data: this.item.$data, value: this.item.value})
                }   
                else return this.item.config[key]
            }
        },
        setUploadAvatarValue() {
            if (this.item.value === void 0) {
                this.$set(this.item, 'value', '')
            } else if (typeof this.item.value === 'string' && this.item.value) {
                this.imageUrl = this.getUrl(this.item.value)
            } else if (this.item.value.url) {
                this.imageUrl = this.getUrl(this.item.value.url)
            }
        }
    },
    created() {
        if (this.mixin_type(this.item) == 'upload-avatar') {
            this.setUploadAvatarValue()
        } else if (this.item.value === void 0) {
            this.$set(this.item, 'value', [])
        }

        this.item.$data[this.item.prop] = this.item.value 
        this.resetFileList(this.item.value)
        this.mixin_config('upload')   
    }
}
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
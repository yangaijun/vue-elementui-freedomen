<template>
    <fd-vuex>  
        <el-button @click="open">打开 </el-button>
        <el-dialog
            title="找开" 
            :visible.sync="visible"
            :modal="false"
            width="50%">
            <el-alert
                title="提示： 如果页面在路由中拥有子页面，其页面属性将失效，将变为文件夹"
                type="warning"
                style="marginBottom: 15px; marginTop: -15px;"
                show-icon>
            </el-alert>
            <fd-form  
                @event="event"
                ref="form" 
                :columns="[
                    {type: 'input', rule: 'must', label: '页面名称', placeholder: '请输入页面名称', prop: 'pageLabel'},
                    {type: 'input', label: '文件名称', placeholder: '请输入字母, default 页面名称拼音', prop: 'pageFileName'},
                    {type: 'input', placeholder: '访问路径, default 文件名称', label: '访问路径', prop: 'pagePath'},
                    {type: 'input', placeholder: '图标, ele图标class, 如 el-icon-eleme', label: '图标', prop: 'pageIcon'}, 
                    {type: 'switch', label: '隐藏', prop: 'pageHidden'},
                    {type: 'switch', label: '生成CRUD', prop: 'auto'},
                    {type: 'select-multiple', placeholder: '选择相关表', label: '相关表', load: ({data}) => data.auto == 1, prop: 'tabs', options: timeOut},
                    {type: 'input', label: 'API前置路径', prop: 'pageApiPath', load: ({data}) => data.auto == 1, placeholder: '如：user 或者 system/user, default 页面拼音', style: {marginBottom: '5px'}},
                    {type: 'render',  prop: 'cols', load: ({data}) => data.auto == 1, label: 'CRUD设置', render({createElement, value}) {
                        return createElement('FdTable', {
                            props: {
                                columns: [
                                    {label: '列名', prop: 'colName'}, 
                                    {type: 'switch', label: '查询', prop: 'search'},
                                    {type: 'switch', label: '添加', prop: 'add'},
                                    {type: 'switch', label: '修改', prop: 'edit'},
                                    {type: 'switch', label: 'Table展示', prop: 'detail'}
                                ],
                                data: value
                            }
                        })
                    }} 
                ]" 
                :data.sync="formData"
                /> 
                <span slot="footer" class="dialog-footer"> 
                    <el-button type="primary" @click="submit">确 定</el-button>
                </span>
        </el-dialog> 
    </fd-vuex>
</template>
<script> 
import VueAceEditor from 'vue2-ace-editor'
export default {
  name: 'Crud', 
  components: {VueAceEditor},
  data () { 
    let timeOut = ({resolve}) => {
        setTimeout(() => {
            resolve("dd,ee")
        }, 800);
    } 
    return { 
        visible: false,formData: {auto: 1}, timeOut: timeOut
    } 
  },
  methods: {
      open() {
          this.visible = true
        this.$nextTick(_ => {
            this.$refs.form.reset() 
        }); 
      },
      submit() {},
      event(params) {
          
          this.formData.cols = [{}, {}, {}].map((el, index) => { 
                    el.search = 0 
                    el.add = 1
                    el.edit = 1
                    el.detail = 1  
                    return el
                })
        console.log(this.formData.cols)
      }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

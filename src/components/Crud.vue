<template>
    <fd-vuex>  
        <fd-form
        @submit="event"
            :columns="[  
                {type: 'upload-pcard',  prop: 'ss', label: 'gg'},
                {type: 'upload-pcard',  prop: 'ss3', label: 'gg',  value: ['db_detail.jpg'], filter: ({value}) => `https://demo-mall-1256372626.cos.ap-chengdu.myqcloud.com/${value}`, config: {fileSizeRange: new Array(10, 2048), fileTypes: 'jpg, md', onSuccess(response) {
                    return response
                }}} ,
                {type: 'upload-picture',  prop: 'ss4', label: 'gg',rule: 'must', tip: '上传点图片'} ,
                {type: 'upload-file',  prop: 'ss5', label: 'gg'},
                {type: 'button-primary', value: '提交', prop: '$submit'}
            ]"
        >

        </fd-form>
        <el-button @click="open">打开 </el-button>
        <fd-table 
            :columns="[ 
            {type: 'switch', label: 'Table展示', prop: 'detail'},
           {type: 'switch', label: '添加', prop: 'addd'},
                {type: 'switch', label: '添g加', prop: 'addds'},
            ]" 
            @event="event"
            :data="[{colName: 2}, {colName: 3}, {colName: 4},{colName: 'dssssssssssssssssssssssssssssssssssssssssssssssssssss'}]"
            :config="{stripe: true, border: false}"
        />
         
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
    let testAsyc = ({data, resolve}) => {
        setTimeout(() => {
            resolve('ror')
        }, 800)
    }
    return { 
        visible: false,formData: {auto: 1,testlabel: 12}, timeOut: timeOut, testAsyc: testAsyc
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
         console.log(params)
      }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style > 
</style>

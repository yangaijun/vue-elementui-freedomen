<template>
    <fd-vuex>  
        <fd-form
        :columns="[  
            {type: 'upload',  prop: 'ss', label: 'gg'} 
        ]">

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

<template>
    <fd-vuex>
        <fd-form @event="event" :columns="formColumns" :data.sync="formData" @submit="submit"></fd-form> 
        <!-- <fd-list 
            :data="listData"
            @event="listEvent"
            :columns="[
                {type: 'text', prop: '$index'},
                {type: 'input', prop: 'input', style: {marginRight: '5px', width: '220px'}},
                {type: 'button-primary', prop: 'add', value: '添加'},
                {type: 'button-danger', prop: 'delete', value: '删除', load() {
                    return listData.length > 1
                }}
            ]"
        />  -->
        <fd-table
            :columns="[
                {prop: 'i', value: 'ggggggggg', label: 'what the fuck'},
                {prop: 'i2', value: 'esssss', label: 'sdfds'},
                {prop: 'i3', value: 'dfaaa', label: 'vcxvcx'},
            ]"
            :data="[{}, {}]"
        ></fd-table>
    </fd-vuex>
</template>
<script>  
import  {districts} from '../plug'
export default { 
    data() {
        return  { 
            d: '',
            listData: [{}],
            formColumns: [ 
                [
                    {type: 'select', prop: 'province', placeholder: '省', options({resolve}) {
                      resolve (districts[86])
                    }},
                    {type: 'select', prop: 'city', placeholder: '市', style: {margin: '0 8px'}, options({resolve, data}) {
                      resolve (districts[data.province])
                    }},
                    {type: 'select', prop: 'district', placeholder: '区', options({resolve, data}) {
                      resolve (districts[data.city])
                    }},
                    {type: 'formitem', label: '营业地址'}
                ], 
                {type: 'tinymce', prop: 'edit2', label: '富文本77', config: {language: 'zh', uploadImageConfig: { action: 'http://127.0.0.1:8090/fdapi/Tab/importFile', preUrl: 'https://demo-mall-1256372626.cos.ap-chengdu.myqcloud.com/' }}},
                {type: 'amap', prop: 'editddd' },
                {type: 'button', prop: '$reset', value: '重置'},
                {type: 'button', prop: '$submit', value: '提交'},
                [
                    {type: 'input-len220', prop: 'tb', style: {width: '220px'}},
                    {type: 'input-len220', prop: 'tb2', style: {width: '220px'}},
                    {type: 'formitem', label: 'imya'}
                ]
            ],
            formData: {
                 
            }
        }
    },
    methods: {
        submit(data) {
            console.log(data)
        },
        event(params) {
            if (params.prop == 'province') {
                this.formData.city = ''
                this.formData.district = ''
            } else if (params.prop == 'city') {
                this.formData.district = ''
            }
        },
        listEvent(params) {
            if (params.prop == 'add') {
                this.listData.push({})
            } else if (params.prop == 'delete') {
                this.listData.splice(params.$index, 1)
            }
        }
    }
}
</script>
<style >
    .fd_list .fd_list_item {
        margin-top: 5px;
    }
</style>

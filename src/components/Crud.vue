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
    </fd-vuex>
</template>
<script>
export default {
    data() {
        return  {
            d: '',
            listData: [{}],
            formColumns: [ 
                {type: 'select', prop: 'province', label: '省', options({resolve}) {
                    resolve({1: '江苏', 2: '河南', 3: '山东'})
                }},
                {type: 'select', prop: 'city', label: '市', options({resolve, data}) {
                    //老规矩，可以从后台取，可以是静态文件取，格式如何，自行设计
                    resolve({
                        1: {11: '苏州', 12: '南京'},
                        2: {21: '郑州'},
                        3: {31: '济南'}
                    }[data.province])
                }},
                {type: 'select', prop: 'area', label: '区', options({resolve, data}) {
                    resolve({
                        11: '苏州AB,苏州DD',
                        12: '南京CC,南京UU',
                        21: '郑州VV,郑州KK',
                        31: '济南MMM,济南LLL',
                    }[data.city])
                }},
                {type: 'button', prop: '$reset', value: '重置'}
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
                this.formData.area = ''
            } else if (params.prop == 'city') {
                this.formData.area = ''
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

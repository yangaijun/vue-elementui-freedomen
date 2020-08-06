<template>
<div>
        <el-button @click="button">button</el-button>
    <fd-form 
        :data="formData"
        :columns="[
        
            {type: 'text', value: 'uuu'},
            {type: 'divider',  config: {direction: 'vertical'}},
            {type: 'text', value: 'mmm'},
        ]"
        @event="event"
    />
    <fd-search 
        :columns="[
            {type: 'input', prop: 'input', placeholder: 'input', span: 12},
            {type: 'input', prop: 'input2', placeholder: 'input2', span: 12},
        ]"
    />
</div>
</template>
<script>   
	export default {
        label: '介绍',
        components: { 
        },
        computed: {
            cls () {
                let columns = []
                for (let i = 0; i < 100; i ++) {
                    columns.push({
                        type: 'input',
                        prop: 'p' + i,
                        placeholder: 'pleaceh',
                        style: {width: '220px'}
                    }) 
                }
                return columns
            }
        },
		data() {
			return { 
                formData: {text: '1'},
                codeCompxPlus: {cx: {cxDateStart: new Date()}, hytj: {}, mj: [{}], gg: {}, propList: [], prop: {}},
			}
        },
		methods: {
            button() {
                this.formData = {text: null}
            },
            calcMultiplyData(arr) {
                let res = [], cur = {}
                function search(deep = 0) {
                    if (deep >= arr.length) {
                        res.push(cur)
                        cur = Object.assign({}, cur)
                        return
                    }
                    for (let obj of arr[deep]) {
                        cur[obj.prop] = obj.value
                        search(deep + 1)
                    }
                }
                search()
                return res
            },
            codeCompxPlusEvent(params) {
                if (params.prop == 'province') {
                    this.codeCompxPlus.city = ''
                     this.codeCompxPlus.area = ''
                } else if (params.prop == 'city') {
                    this.codeCompxPlus.area = ''
                } else if (params.prop == 'type') {
                    this.codeCompxPlus.propList = []
                }
            },
            event(params) {
                if (params.prop == 'add') {
                    this.formData.dd.push({})
                }
                console.log(params.row)
            }
		}
	}

</script>
<style>
    .fd_form .fd_form .el-col-24 {
        margin-top: 8px;
    }
    .fd_imgs_item {
        padding-right: 55px;
    }
    .fd_list .fd_list_item {
       overflow-x: scroll;
       width: 100%;
    }
</style>

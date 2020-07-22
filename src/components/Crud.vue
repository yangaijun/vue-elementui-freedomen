<template>
<div>
    <fd-form 
        :data="formData"
        :columns="[
            {type: 'input', prop:'text', label: 'gggg', rule: 'number' },
            {type: 'button', prop:'$submit', value: '提交'}
        ]"
        @event="event"
    />
</div>
</template>
<script>   
	export default {
        label: '介绍',
        components: { 
        },
		data() {
			return { 
                formData: {cardList: [{}]},
                codeCompxPlus: {cx: {cxDateStart: new Date()}, hytj: {}, mj: [{}], gg: {}, propList: [], prop: {}},
			}
        },
		methods: {
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
                if (params.prop == 'click') {
                    console.log(params.row)
                }
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
</style>

<template>
<div>
    <fd-form   
        :data.sync="codeCompxPlus"
        @event="codeCompxPlusEvent"
        :columns="[
            {type: 'input-remote', prop: 'inputRemote', label: '搜索&创建', placeholder: '远程搜索, 搜索不到创建: a/b/c', options({resolve, query}) {
                if (query && 'abc'.includes(query)) {
                    resolve([{value: query + '选项1'}, {value: query + '选项2'}])
                } else {
                    resolve([])
                }
            }, style: {width: '280px'}},
            {type: 'input', prop: 'name', label: '商品名称', placeholder: '请输入商品名称', rule: 'must'},
            {type: 'input', prop: 'title', label: '副标题', placeholder: '请输入副标题'},
            {type: 'cascader', prop: 'kind', label: '分类', placeholder: '请选择分类/模拟远程', options({resolve}) {
                //可以在此访问api  .then 函数中使用resolve
                resolve([
                    {label: '服装', value: 1, children: [{label: '外套', value: 11}, {label: '衬衫', value: 12}]}, 
                    {label: '家用', value: 2}
                ])
            }}, 
            [
                {type: 'select', prop: 'province', label: '省', options({resolve}) {
                    resolve({1: '江苏', 2: '河南', 3: '山东'})
                }},
                {type: 'select', prop: 'city', label: '市', options({resolve, data}) {
                    resolve({
                        1: {11: '苏州', 12: '南京'},
                        2: {21: '郑州'},
                        3: {31: '济南'}
                    }[data.province])
                }, style: {margin: '0 15px'}},
                {type: 'select', prop: 'area', label: '区', options({resolve, data}) {
                    resolve({
                        11: '苏州AB,苏州DD',
                        12: '南京CC,南京UU',
                        21: '郑州VV,郑州KK',
                        31: '济南MMM,济南LLL',
                    }[data.city])
                }},
                {type: 'formitem', label: '地址', prop: 'address', rule({resolve, data}) {
                    resolve((!data.province || !data.city || !data.area) && '必须要选的')
                }}
            ],
            {type: 'radios-button', prop: 'yh', label: '优惠方式', value: 1, options: {1: '无优惠', 2: '促销', 3: '会员特价', 4: '满减'}},
            //促销
            {type: 'render', load: ({data}) => data.yh == 2, prop: 'cx', render({createElement, data, value}) {
                return createElement('FdForm', {
                    props: {
                        columns: [
                            {type: 'date', prop: 'cxDateStart', label: '开始时间'},
                            {type: 'date', prop: 'cxDateEnd', label: '结束时间'},
                            {type: 'input', prop: 'cxPrice', label: '价格', style: {width: '220px'}}
                        ],
                        'sync': value,
                        config: {labelWidth: '75px'}
                    }
                })
            }, rule({resolve, value}) { 
                let message 
                if (!value.cxDateStart || !value.cxDateEnd || !value.cxPrice) {
                    message = '别看了，都是必填项，可验证非空'
                }
                if (value.cxDateStart > value.cxDateEnd) {
                    message =  '结束日期不能小于开始日期'
                }
                resolve(message)
            }},
            //会员特价
            {type: 'render', load: ({data}) => data.yh == 3, prop: 'hytj', render({createElement, value}) {
                return createElement('FdForm', {
                    props: {
                        columns: [
                            {type: 'input', prop: 'hytjGlod', label: '黄金会员', style: {width: '220px'}},
                            {type: 'input', prop: 'hytjPlatinum', label: '白金会员', style: {width: '220px'}} 
                        ],
                        data: value,
                        config: {labelWidth: '75px'}
                    }
                })
            }, rule({resolve, value}) { 
                resolve((!value.hytjGlod || !value.hytjPlatinum) && '必须要选的, 数值验证，啥乱七八糟的验证自行写')
            }},
            //满减
            {type: 'render', load: ({data}) => data.yh == 4, prop: 'mj', render({createElement, value}) {
                return createElement('FdTable', {
                    props: {
                        columns: [
                            {type: 'input', prop: 'mjEnough', label: '购买金额满'},
                            {type: 'input', prop: 'mjReduce', label: '减'},
                            {label: '操作', render() {
                                return [
                                    {type: 'button-text', value: '删除', prop: 'del'},
                                    {type: 'button-text', value: '添加', prop: 'add'},
                                ]
                            }}
                        ],
                        data: value
                    },
                    on: {
                        event(params) {
                            if (params.prop == 'del') {
                                value.splice(params.$index, 1)
                                if (value.length <= 0) {
                                    value.push({})
                                }
                            } else if (params.prop == 'add') {
                                value.push({})
                            }
                        }
                    }
                })
            }, rule({resolve, value}) {
                let message, len = value.length
                value.forEach(e => {
                    if (!e.mjEnough || !e.mjReduce) {
                        if (!e.mjEnough && !e.mjReduce)
                            len --
                        else message = '要填写的'
                    }
                })
                if (len < 1)
                    message = '至少填写一条'
                resolve(message)
            }},
            {type: 'span', load: ({data}) => data.yh == 4, value: '提示：至少写一行，如果两个属性都没写，那么这行不做记录', style: {fontWeight: '600'}},
            //动态联动
            {type: 'select', prop: 'type', label: '类型', placeholder: '类型不同对应不同结构', options({resolve}) {
                //同样，可以动态从api获取
                resolve({1: '服装', 2: '数码'})
            }, rule: 'must'},
            //这里需要根据 data.type 改变来强制刷新 render 函数 
            {type: 'render', label: '规格', prop: 'gg', load: ({data}) => data.type, forceUpdate: true, render({createElement, data, value}) { 
                let _columns = []
                //这里模拟一下根据type select改变，改变为不同的属性
                if (data.type == 1) {
                    _columns = [
                        {type: 'span', value: '颜色:'},
                        {type: 'br'},
                        {type: 'tags-create', prop: 'ggColor'},
                        {type: 'span', value: '尺寸:'},
                        {type: 'br'},
                        {type: 'check-boxs', prop: 'ggSize', options: 'M,X,XL,L,2XL'},
                    ]
                } else {
                    _columns = [
                        {type: 'span', value: '容量:'},
                        {type: 'br'},
                        {type: 'check-boxs', prop: 'ggSize', options: '1G,2G,3G'},
                    ]
                }
                return createElement('FdRegion', {
                    props: {
                        columns: _columns,
                        data: value
                    },
                    on: {
                        event(params) {
                            let _columns = []
                            for (let _value in Object.keys(data.gg)) {
                                key = Object.keys(data.gg)[_value]
                                if (data.gg[key] && data.gg[key].length) {
                                    _columns.push(data.gg[key].map(el => {
                                        return {value: el, prop: key}
                                    }))
                                }
                            } 
                            codeCompxPlus.propList = calcMultiplyData(_columns)
                        }
                    }
                })
            }},
            {type: 'render', prop: 'propList', load: ({data}) => data.type, forceUpdate: true, render({createElement, data, value}) { 
                let _columns = []
                //这里也是根据type 的切换改变不同的columns
                if (data.type == 1) {
                    _columns.push(
                        {label: '颜色', prop: 'ggColor'},
                        {label: '尺寸', prop: 'ggSize'}
                    )
                } else {
                    _columns.push(
                        {label: '容量', prop: 'ggSize'}
                    )
                }
                _columns.push(
                    {label: '价格', prop: 'price', type: 'input'},
                    {label: '库存', prop: 'store', type: 'input'},
                    {label: '预警值', prop: 'price', type: 'input'},
                    {label: 'SKU编辑', prop: 'sku', type: 'input'},
                    {label: '操作', prop: 'del', type: 'button-text', value: '删除'}
                )
                return createElement('FdTable', {
                    props: {
                        columns: _columns,
                        data: value
                    }
                })
            //同样可以加rule进行对表格进行验证
            }},
            {type: 'render', prop: 'prop', label: '商品参数', load: ({data}) => data.type == 1, render({createElement, value}) {
                return createElement('FdForm', {
                    props: {
                        columns: [
                            {type: 'input', label: '商品编号', prop: 'propNo', rule: 'must', style: {width: '220px'}},
                            {type: 'select', label: '季节', prop: 'propSeason', options: '春季,夏季,秋季,冬季'},
                            {type: 'select-multiple', label: '人群种类', prop: 'propCrowd', options: '儿童,青少年,中年,老年'},
                            {type: 'date', label: '上市时间', prop: 'propUpTime'}
                        ],
                        config: {labelWidth: '85px'},
                        'data.sync': value
                    }
                })
            }},
            [
                {type: 'button-info', prop: 'fullData', value: '填充数据'},
                {type: 'button-primary', prop: '$submit', value: '提交'},
                {type: 'button', prop: '$reset', value: '重置'},
                {type: 'formitem'}
            ]
        ]"
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
		}
	}

</script>
<style>
    .fd_form .fd_form .el-col-24 {
        margin-top: 8px;
    }
</style>

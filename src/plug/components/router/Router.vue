<template>
    <el-menu 
        :default-active="active"  
        :collapse="true"   
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        router>
        <router-item :routes="routers"></router-item>
    </el-menu>
</template>
<script>
import RouterItem from './RouterItem.vue';
/**
 * router
 * meta: {label: 'amda', hidden: true, icon: 'el-edit'}
 * 
 */
export default {
    //routes: {*label(string), *path(string), icon(string), hidden(boolean), children(array)}
    name: 'FdRouter',
    props: {
        // routes: {
        //     type: Array, 
        //     required: true
        // },
        collapse: Boolean 
    }, 
    components: {
        RouterItem
    },
    computed: {
        routers() {
            return [
                {
                    path: 'haha0',
                    name:'b',
                    meta: {label: '爱来不来', icon: 'el-icon-eleme'}
                },
                {
                    path: 'haha2',
                    meta: {label: '不是你的', icon: 'el-icon-eleme'},
                    children: [
                        {
                            name:'vv',
                            path: 'hahab',
                            meta: {label: '子夜fd', icon: 'el-icon-delete-solid'},
                        },
                        {
                            name:'vdddv',
                            path: 'haha4',
                            meta: {label: '不也only one', icon: 'el-icon-delete-solid'},
                            children: [
                                {
                                    name:'vdddv',
                                    path: 'haha4',
                                    meta: {label: '不也', icon: 'el-icon-delete-solid'},
                                },
                                {
                                    name:'vdddv',
                                    path: 'haha4',
                                    meta: {label: '不也', icon: 'el-icon-delete-solid'},
                                }
                            ]
                        },
                        {
                            name:'vdddd',
                            path: 'hahass4',
                            meta: {label: '不也 tow children', icon: 'el-icon-delete-solid'},
                            children: [
                                 {
                                    name:'vdddv',
                                    path: 'haha4',
                                    meta: {label: '不也', icon: 'el-icon-delete-solid'},
                                }, {
                                    name:'vdddv',
                                    path: 'haha4',
                                    meta: {label: '不也', icon: 'el-icon-delete-solid'},
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    watch: {
        $route : 'setActive' 
    },
    created () {
        // if (this.filter)
        //     this.troutes = this.routes.filter(route => {
        //         if(route.children && route.children.length !== 0)
        //             return route 
        //     })
        // else 
        //     this.troutes = this.routes

        // this.setActive()
    },
    data() {
        return {
            troutes: [],
            active : ''
        }
    },
    methods: { 
        // setActive() {
        //     this.active = this.$route.matched[this.$route.matched.length - 1].path 
        // },
        // handleOpen(key, keyPath) {
        //     console.log(key, keyPath);
        // },
        // handleClose(key, keyPath) {
        //     console.log(key, keyPath);
        // }
    }
}
</script>
<style>

</style>

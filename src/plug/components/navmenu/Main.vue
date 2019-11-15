<template>
    <div>
        <el-menu 
            :default-active="active"  
            @open="handleOpen" 
            @close="handleClose"
            :collapse="collapse"   
            router>
            <sub-menu :routes="troutes"></sub-menu>
        </el-menu>
    </div>
</template>
<script>
import SubMenu from './sub.vue';

export default {
    //routes: {*label(string), *path(string), icon(string), hidden(boolean), children(array)}
    props: {
        routes: {
            type: Array, 
            required: true
        },
        collapse: Boolean, 
        filter: {
            type: Boolean,
            default: true
        }
    }, 
    created () {
        if (this.filter)
            this.troutes = this.routes.filter(route => {
                if(route.children && route.children.length !== 0)
                    return route 
            })
        else 
            this.troutes = this.routes

        this.setActive()
    },
    name: 'ApNavMenu',
    components:{
        SubMenu
    },
    watch: {
        $route : 'setActive' 
    },
    data() {
        return {
            troutes: [],
            active : ''
        }
    },
    methods: { 
        setActive() {
            this.active = this.$route.matched[this.$route.matched.length - 1].path 
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style>

</style>

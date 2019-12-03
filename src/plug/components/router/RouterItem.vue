<template>
        
    <div class="menu-wrapper">
        <template v-for="(item, index) in routes">
            <el-submenu 
             popper-append-to-body
                :key="index" 
                v-if="item.children && item.children.length > 1" 
                :index="item.path">
                <template slot="title">
                    <i v-if='item.meta && item.meta.icon' :class="item.meta.icon"></i>
                    <span>{{item.meta && item.meta.label}}</span>
                </template>
                <router-item :routes = 'item.children'></router-item>
            </el-submenu>
            <el-menu-item 
                :key="index"
                v-else-if="!item.children"
                :index="item.children?item.children[0].path:item.path"
                >
                <template v-if="!item.children" slot="title">
                    <i v-if='item.meta && item.meta.icon' :class="item.meta.icon"></i>
                    <span>{{item.meta && item.meta.label}}</span>
                </template>
                <template v-else slot="title">
                    <i v-if='item.children[0].meta && item.children[0].meta.icon' :class="item.children[0].meta.icon"></i>
                    <span>{{item.children[0].meta && item.children[0].meta.label}}</span>
                </template>
            </el-menu-item>
        </template>
    </div>
</template>
<script>
export default {
    name:'RouterItem',
    props: {
        routes: Array
    }
}
</script>

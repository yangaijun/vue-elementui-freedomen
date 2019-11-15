<template>
    <div>
        <div v-for="(item, index) in routes " :key="index">
            <el-submenu v-if="item.children && item.children.length > 1" :index="item.path" >
                <template slot="title">
                    <i v-if='item.icon' :class="item.icon"></i>
                    <span>{{item.label}}</span>
                </template>
                <sub-menu :routes = 'item.children'></sub-menu>
            </el-submenu>
            <el-menu-item 
                v-else-if="!(item.children?item.children[0].hidden:item.hidden)"
                :index="item.children?item.children[0].path:item.path"
                >
                <span v-if="!item.children">
                    <i v-if='item.icon' :class="item.icon"></i>
                    <span slot="title">{{item.label}}</span>
                </span>
                <span v-else>
                    <i v-if='item.children[0].icon' :class="item.children[0].icon"></i>
                    <span slot="title">{{item.children[0].label}}</span>
                </span>
            </el-menu-item>
        </div>
    </div>
</template>
<script>
export default {
    name:'SubMenu',
    props: {
        routes: Array
    }
}
</script>

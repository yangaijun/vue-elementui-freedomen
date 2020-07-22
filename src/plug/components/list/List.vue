<template>
    <div class="fd_list">
        <div 
            class="fd_list_item"
            v-for="(item, index) in data" 
            :key="index">
            <fd-region
                :data="item"
                :columns="getColumns()"
                @event="(params) => {
                    event(params, index)
                }"
            />
         </div>
    </div>
</template>
<script>
import FdRegion from '../../core/region'
import util from '../../utils/util.js';
export default {
    name: 'FdList', 
    props: {
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        col: {
            type: Boolean
        }
    },
    components: {
        FdRegion
    },
    methods: {
        event(params, index) {
            this.$emit('event', {...params, $index: index})
        },
        getColumns() {
            return util.clone(this.columns)
        }
    }
}
</script> 

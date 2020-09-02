<template>
    <div class="fd_list">
        <div 
            class="fd_list_item"
            v-for="(item, index) in data" 
            :key="index">
            <fd-region
                :data="resetData(item, index)"
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
            default () {
                return []
            }
        }
    },
    components: {
        FdRegion
    },
    methods: {
        event(params, index) {
            this.$emit('event', {...params, $index: index})
        },
        resetData(data, index) {
            data.$index = index
            return data
        },
        getColumns() {
            return util.clone(this.columns)
        }
    }
}
</script> 

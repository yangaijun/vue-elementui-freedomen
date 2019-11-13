<template>
    <div 
        :style="style()" 
    > 
        <slot></slot>
    </div>
</template>
<script>
import FdRegion from '../../core/region'
import external from '../../config/external.js'
import base from '../../mixins/base.js';

export default {
    name: 'fdcol',
    props: ['data', 'columns'],
    mixins: [base],
    components: { 
        FdRegion
    }, 
    data() {
        return {
            tempColumns: []
        }
    },
    methods: {
        style() {
            let column = this.columns[this.columns.length - 1]
            let type = column.type

            if (type && type.indexOf('col') === 0)
                return [external.defaultStyles[type], this.mixin_style(column.style, column.value, column.$data)]
            else 
                return null
        },
        
    },
    created() {
        console.log(FdRegion)
    }
}
</script> 

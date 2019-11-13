<template>
    <div 
        :style="style()" 
    > 
        <slot></slot>
    </div>
</template>
<script>
import external from '../../config/external.js'
import base from '../../mixins/base.js';

export default {
    name: 'fdrow',
    props: ['data', 'columns'],
    mixins: [base],
    data() {
        return {
            tempColumns: []
        }
    },
    methods: {
        style() {
            const style = {flexDirection: 'row'}
            let column = this.columns[this.columns.length - 1]
            let type = column.type

            if (type && type.indexOf('col') === 0)
                return [external.defaultStyles[type], this.mixin_style(column.style, column.value, column.$data), style]
            else 
                return style
        },
        
    } 
}
</script> 

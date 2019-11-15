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
import util from '../../utils/util.js'

export default {
    name: 'fdcol',
    props: ['data', 'columns'],
    mixins: [base],
    components: { 
        FdRegion
    }, 
    methods: {
        getType() {

        },
        style() {
            let column = this.columns[this.columns.length - 1]
            let type =  util.getType(column)
            if (type && type.indexOf('col') === 3)
                return [
                    external.defaultStyles[type], 
                    {display: 'flex', 'flex-direaction': 'column', '-webkit-flex-direction': 'column'}, 
                    this.mixin_style(column.style, column.value, column.$data)
                ]
            else 
                return null
        },
        
    }
}
</script> 

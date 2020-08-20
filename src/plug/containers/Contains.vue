<template> 
    <component :is="component" :columns='columns' :data='data' @event='throwEvent'>
        <slot></slot>
    </component>
</template>

<script>  
import FdCol from './col'
import FdRow from './row'
import FdFormitem from './formitem'
import FdRegion from '../core/region'
import FdBadge from './badge' 

import util from '../utils/util.js'
const names = ['fd-row', 'fd-col', 'fd-formitem', 'fd-badge']
const PREFIX = 'fd-'

export default {
    name: 'contains',
    props:  ['data', 'columns'],
    components: {
        FdCol,
        FdRegion,
        FdRow,
        FdBadge,
        FdFormitem 
    },
    computed: {
        component() {
            return this.getType(this.columns)
        }
    },
    methods: { 
        getType(columns) {
            if (columns.length === 0)
                return null
            let column = columns[columns.length - 1]

            let type = util.getType(column)
            if (names.includes(type))
                return type
            else return 'fd-col'
        },
        throwEvent(params) {
            this.$emit('event', params)
        }
    }
}
</script>

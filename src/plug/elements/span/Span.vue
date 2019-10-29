<template>
    <span 
        :class="item.class"
        :style="mixin_style(item.style, item.value, item.data)"
    >
        {{mixin_filter(item.filter, item.value, item.$data)}}
    </span>
</template>
<script>
import base from '../../mixins/base.js';
/**
 * config: {
 *      plain: true 
 *      round: true
 * }
 */
export default {
    //prop, value, config: {}, filter, disabled, link?to router, $data
    props: ['item'],
    mixins: [base],
    name: 'fdspan',
    data() {
        return {
          
        }
    },
    methods: {
        change() {
        }
    },
    mounted() {
    }
}
</script>

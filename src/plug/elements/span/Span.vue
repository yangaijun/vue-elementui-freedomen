<template>
    <div :class="item.class">
        {{mixin_filter(item.filter, item.value, item.$data)}}
    </div>
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

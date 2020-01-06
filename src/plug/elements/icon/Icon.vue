<template>
    <i :class="item.value"></i>
</template>
<script>
import base from '../../mixins/base.js';
export default {
    props: ['item'],
    mixins: [base],
    name: 'fdicon'
}
</script>

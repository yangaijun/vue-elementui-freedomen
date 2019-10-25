<template> 
    <component :is="component" :item='item' @event='event'></component>
</template>
<script>  

import FdButton from './button'
import FdCheckBoxs from './checkboxs';
import FdCounter from './counter';
import FdInput from './input';
import FdProgress from './progress';
import FdRadios from './radios';
import FdRate from './rate';
import Fdselect from './select';
import FdSlider from './slider';
import FdSwitch from './switch';
import FdSpan from './span'

export default {
    name: 'elements',
    props: ['item'], 
    components: {
        FdButton, FdCheckBoxs, FdCounter, FdInput, FdProgress, FdRadios, FdRate, Fdselect, FdSlider, FdSwitch, FdSpan
    },
    created() {  
        if (this.item.type == 'form-item')
            this.component = null
        else 
            this.component = 'fd-' + this.item.type
    }, 
    data () {
        return {  
            component: null
        }
    },  
    methods: { 
        event(params){
            this.$emit('event', params);
        }
    },
    mounted() {

    }

}
</script>

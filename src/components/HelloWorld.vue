<template>
    <div class="hello">
        <Button :item="item" @event="event"></Button>
        <Input :item='input' @event="event"/>
        <Counter :item='counter' @event="event" />
        <Select :item='select' @event="event"/>
        <CheckBoxs :item='checkboxs' @event="event" />
        <Radios :item='radios' @event="event"/>
    </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'
import Button from '../plug/elements/button/Button';
import Input from '../plug/elements/input/Input'
import Counter from '../plug/elements/counter/Counter';
import Select from '../plug/elements/select/Select';
import CheckBoxs from '../plug/elements/checkboxs/CheckBoxs';
import Radios from '../plug/elements/radios/Radios'

export default {
  components: {
    vueJsonEditor, Button, Input, Counter, Select, CheckBoxs, Radios
  },
  name: 'HelloWorld',
  data () {
    return {
      item: {
        prop: 'button',//defalut
        type: 'button-warning',
        value: 'nihao',
        filter: ({value}) => value == 'youyou' ? 'lala' : value,
        disabled: ({value}) => value == 'youyou',
        config: {
          round: true
        }
      },
      input: {
        prop: 'ipnut',
        type: 'input-area',
        placeholder: 'heh',
        disabled: ({value}) => value == 'youyou',
      },
      counter: {
        prop: 'couter', disabled: ({value}) =>value == 10
       
      },
      select: {
        prop: 'select',
        placeholder: 'very goo',
        type: 'select',
        options: {1: 'name', 2: 'boy'},
        
      },
      checkboxs: {
        prop: 'checkbox',
        type: 'check-buttons',
        options: {1: 'name', 2: 'boy', 3: 'gri'},
        value:1,
        max: 1
      },
      radios: {
        prop: 'radios',
        options: "田,mh",
        type: 'radio-buttons',
      }
    }
  },
  methods: {
    event(params ) {
      console.log(params)
      this.item.type = 'button-danger'
      this.item.value = "youyou" 
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

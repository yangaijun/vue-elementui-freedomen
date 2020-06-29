<template>
<div>
    <div v-html="htmlMD"></div>
    <el-button @click="fdata = {rate2: 4,userIcon: ['freedomen.png']}">
        click
    </el-button>
    <el-button @click="$refs.form.reset()">
        click
    </el-button>
    <fd-form 
                ref="form"
                @event="event"
                :data="fdata"
                :columns="[ 
                    {type: 'rate', prop: 'rate2'},
                    {type: 'input', prop: 'gc', $params: {test: 51}},
                    {type: 'tag-success', value: '标签1'},
                    {type: 'tag-warning', value: '标签2', filter: ({value}) => 'filter'},
                    {type: 'upload-pcard', config: {action: 'http://115.159.65.195:8090/fdapi/Tab/importFile'}, prop: 'userIcon', label: '用户图片', rule: 'must', filter: ({data, value}) => {
                        return `https://demo-mall-1256372626.cos.ap-chengdu.myqcloud.com/${value}`
                    }},
                    {type: 'tag-info', value: '标签4'},
                    {type: 'button', value: 'teste', prop: 'ggggg', $params: {test: 1}}
                ]"
            />
</div>
	
</template>

<script>   
import marked from 'marked'
import hljs  from 'highlight.js'
	export default {
        label: '介绍',
        components: { 
        },
		data() {
			return { 
                fdata: {},
                htmlMD: marked('# Marked in the browser\n\nRendered by **marked**.\n ```js code'),
			}
		},
		methods: {
            event(params) {
                console.log(params)
            }
		},
		mounted() {  
            
        },
        created() {
            marked.setOptions({
                renderer: new marked.Renderer(),
                highlight: function(code) {
                    return hljs.highlightAuto(code).value;
                },
                pedantic: false,
                gfm: true,
                tables: true,
                breaks: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                xhtml: false
            }); 
        },
	}

</script>
<style> 
    .item {  
        margin: 5px;
    }
    .__text {
        color: red;
        width: 100%;
    }
</style>
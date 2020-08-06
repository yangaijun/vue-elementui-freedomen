
import store from '../../core/store'
export default {
    name: 'FdVuex',
    render(createElement) {  
        return createElement('div', null, this.$slots.default);
    },
    props: {
        store: Object 
    },
    watch: {
        store: {
            handler(nd, od) {
                for (let key in nd) {
                    if (store[key] != nd[key])
                        store[key] = nd[key]
                }
            },
            deep:  true
        }
    },
    methods: { 
        insertStore(_store) {
            for (let key in _store) {
                this.$set(store, key, _store[key])
            }
        },
        clearStore(_store) {
            let keys = Object.keys(_store)
            for (let key of keys) {
                if (store[key] !== void 0) {
                    delete store[key]
                }
            }
        }
    },
    created() {
        this.store && this.insertStore(this.store)
    }
} 
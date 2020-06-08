import external from '../config/external'
export default {
    methods: {
        mergeConfig(type, config = {}) { 
            let externalConfig = external.defaultConfigs[type]
            if (externalConfig != void 0) {
                for (let key in externalConfig) {
                    if (!config[key]) {
                        config[key] = externalConfig[key]
                    }
                } 
            } 
            return Object.keys(config).length ? config : undefined
        }
    } 
}
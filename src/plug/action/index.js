export const search = {
    actions: {},
    rows: {},
    setAction: function (key, fn, row) {
        this.actions[key] = fn
        this.rows[key] = row
    }, 
    delAction: function (key) {
        delete this.actions[key]
        delete this.rows[key]
    },
    doAction: function (params) {   
        for (let key in this.actions) {
            params.row = this.rows[key]  
            this.actions[key]({
                ...params,
                row: this.rows[key]
            }) 
        }
    }
} 
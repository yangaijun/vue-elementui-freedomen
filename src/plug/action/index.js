function getParams (params, row) {
    let _ = {}
    for (let key in params) {
        _ [key] = params [key]
    }
    _.row = row
    return _
}
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
            this.actions[key](getParams(params, this.rows[key])) 
        }
    }
} 
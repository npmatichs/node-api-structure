module.exports = class Router {
    
    /**
     * Router constructor.
     * 
     * @param {object} app 
     */
    constructor(app)
    {
        this.app = app;
        this.router = this.app;
        this.methods = {
            GET: "get",
            POST: "post",
            PUT: "put",
            DEL: "del"
        }
    }
    
    get(uri, ...callbacks)
    {
        this._build(this.methods.GET, uri, ...callbacks);
    }

    post(uri, ...callbacks)
    {
        this._build(this.methods.POST, uri, ...callbacks);
    }

    put(uri, ...callbacks)
    {
        this._build(this.methods.PUT, ...callbacks);
    }

    /**
     * Build api endpoint.
     * 
     * @param {*} method 
     * @param {*} uri 
     * @param {*} callbacks 
     */
    _build(method, uri, ...callbacks)
    {
        this.router[method].call(this.app, uri, callbacks);
    }
}
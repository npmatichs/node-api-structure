module.exports = class Router {

    /**
     * Router constructor.
     * 
     * @param {object} app 
     * @param {Component} component 
     */
    constructor(app, component)
    {
        this.app = app;
        this.router = this.app;
        this.component = component;
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
        this.router[method].call(this.app, this._generateComponentUrlPath(uri), callbacks);
    }

    _generateComponentUrlPath(uri)
    {
        return `${this.component.folder}/${uri}`;
    }
}

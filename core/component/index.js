module.exports = class Component {

    /**
     * Component constructor.
     */
    constructor(app, name)
    {
        this.loaded = false;
        
        this.app = app;

        this.folder = name;
    }

    getRoutes()
    {
    }

    load(router)
    {
        this.loadRoutes(router);

        this.loaded = true;
    }

    isLoaded()
    {
        return this.loaded;
    }

    loadRoutes(router)
    {
        this.routes(router);        
    }
    
    getName()
    {
        return this.name || this.folder;
    }

    getApp()
    {
        return this.app;
    }
}
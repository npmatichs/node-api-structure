const Component = require('../../../core/component');

module.exports = class TodoComponent extends Component {
    
    /**
     * TodoComponent constructor.
     * 
     * @param {object} app Application singleton instance
     */
    constructor(app, name)
    {
        super(app, name);
    }

    routes(router)
    {
        router.get("test1", (req, res, next) => res.send('this is todo test1'));
        
        router.get("test2", (req, res, next) => res.send('this is todo test2'));
    }
}

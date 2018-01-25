const Component = require('../../../core/component');

module.exports = class HomeComponent extends Component {
    
    /**
     * HomeComponent constructor.
     * 
     * @param {object} app Application singleton instance
     */
    constructor(app, name)
    {
        super(app, name);

        // this.path = '/';
    }

    routes(router)
    {
        router.get("test1", (req, res, next) => {console.log("1");next();}, (req, res, next) => res.send('this is test1'));
        
        router.get("test2", (req, res, next) => res.send('this is test2'));
    }
}

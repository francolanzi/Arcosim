const Component = require('../Component');

class MicroSequenceLogic extends Component
{
    constructor()
    {
        super();

        this.addInput('Condition');
        this.addInput('Control');

        this.addOutput('Jump');
    }
}

module.exports = MicroSequenceLogic;
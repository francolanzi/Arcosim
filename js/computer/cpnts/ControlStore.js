const Component = require('../Component');

class ControlStore extends Component
{
    constructor()
    {
        super();

        this.addInput('Number');

        this.addOutput('Instruction');
    }
}

module.exports = ControlStore;
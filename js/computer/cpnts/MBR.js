const Component = require('../Component');

class MBR extends Component
{
    constructor()
    {
        super();

        this.addInput('Control');
        this.addInput('RDWR');
        this.addInput('Input');
        this.addInput('Clock');

        this.addOutput('Output');
    }
}

module.exports = MBR;
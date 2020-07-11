const Component = require('../Component');

class ALU extends Component
{
    constructor()
    {
        super();

        this.addInput('InputA');
        this.addInput('InputB');
        this.addInput('Function');

        this.addOutput('Result');
        this.addOutput('Control');
    }
}

module.exports = ALU;
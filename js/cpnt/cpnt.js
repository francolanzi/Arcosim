class Component
{
    constructor()
    {
        if (this.constructor == Component)
            throw new Error('Component class can not be instantiated');
        
        this.inputs = new Map();
        this.outputs = new Map();
    }

    getInput(id)
    {
        return this.inputs.get(id);
    }

    getOutput(id)
    {
        return this.outputs.get(id);
    }

    inputList()
    {
        return this.inputs.keys();
    }

    outputList()
    {
        return this.outputs.keys();
    }
}

class ALU extends Component { }
class Clock extends Component { }
class ControlStore extends Component { }
class Decoder extends Component { }
class Increment extends Component { }
class Latch extends Component { }
class MAR extends Component { }
class MBR extends Component { }
class MIR extends Component { }
class MPC extends Component { }
class MUX extends Component { }
class MicroSequenceLogic extends Component { }
class Registers extends Component { }
class Shifter extends Component { }

const cpnt = new Map();

cpnt.set('ALU', ALU);
cpnt.set('Clock', Clock);
cpnt.set('ControlStore', ControlStore);
cpnt.set('Decoder', Decoder);
cpnt.set('Increment', Increment);
cpnt.set('Latch', Latch);
cpnt.set('MAR', MAR);
cpnt.set('MBR', MBR);
cpnt.set('MIR', MIR);
cpnt.set('MPC', MPC);
cpnt.set('MUX', MUX);
cpnt.set('MicroSequenceLogic', MicroSequenceLogic);
cpnt.set('Registers', Registers);
cpnt.set('Shifter', Shifter);

module.exports =
{
    list: () => cpnt.keys(),
    new: key => new (cpnt.get(key))()
};
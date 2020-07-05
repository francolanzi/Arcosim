class Component
{
    static get image()
    {
        throw new Error('image static property must be overrided');
    }

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

class ALU extends Component
{
    static get image()
    {
        return 'img/cpnt/alu.png';
    }
}

class Clock extends Component
{
    static get image()
    {
        return 'img/cpnt/clock.png';
    }
}

class ControlStore extends Component
{
    static get image()
    {
        return 'img/cpnt/ctrlstore.png';
    }
}

class Decoder extends Component
{
    static get image()
    {
        return 'img/cpnt/decoder.png';
    }
}

class Increment extends Component
{
    static get image()
    {
        return 'img/cpnt/increment.png';
    }
}

class Latch extends Component
{
    static get image()
    {
        return 'img/cpnt/latch.png';
    }
}

class MAR extends Component
{
    static get image()
    {
        return 'img/cpnt/mar.png';
    }
}

class MBR extends Component
{
    static get image()
    {
        return 'img/cpnt/mbr.png';
    }
}

class MIR extends Component
{
    static get image()
    {
        return 'img/cpnt/mir.png';
    }
}

class MPC extends Component
{
    static get image()
    {
        return 'img/cpnt/mpc.png';
    }
}

class MUX extends Component
{
    static get image()
    {
        return 'img/cpnt/mux.png';
    }
}

class MicroSequenceLogic extends Component
{
    static get image()
    {
        return 'img/cpnt/mseqlogic.png';
    }
}

class Registers extends Component
{
    static get image()
    {
        return 'img/cpnt/registers.png';
    }
}

class Shifter extends Component
{
    static get image()
    {
        return 'img/cpnt/shifter.png';
    }
}

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
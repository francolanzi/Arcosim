const cpnt = new Map();

cpnt.set('ALU', require('./ALU'));
cpnt.set('Clock', require('./Clock'));
cpnt.set('ControlStore', require('./ControlStore'));
cpnt.set('Decoder', require('./Decoder'));
cpnt.set('Increment', require('./Increment'));
cpnt.set('Latch', require('./Latch'));
cpnt.set('MAR', require('./MAR'));
cpnt.set('MBR', require('./MBR'));
cpnt.set('MIR', require('./MIR'));
cpnt.set('MPC', require('./MPC'));
cpnt.set('MUX', require('./MUX'));
cpnt.set('MicroSequenceLogic', require('./MicroSequenceLogic'));
cpnt.set('Registers', require('./Registers'));
cpnt.set('Shifter', require('./Shifter'));

module.exports =
{
    list: () => cpnt.keys(),
    new: key => new (cpnt.get(key))()
};
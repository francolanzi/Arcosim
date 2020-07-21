const fs = require('fs');
const path = require('path');

class Computer
{
    static _cpntClasses = null;

    static init()
    {
        if (Computer._cpntClasses == null)
        {
            Computer._cpntClasses = new Map();

            fs.readdirSync(__dirname + '/cpnts').forEach(file =>
            {
                file = path.parse(file);
                if (file.ext === '.js')
                {
                    const cpnt = require('./cpnts/' + file.name);
                    Computer._cpntClasses.set(cpnt.type, cpnt);
                }
            });
        }
    }
    
    static cpntTypes()
    {
        Computer.init();
        return Computer._cpntClasses.keys();
    }

    constructor()
    {
        Computer.init();
        this._cpnts = new Map();
    }

    addCpnt(type)
    {
        const cpnt = new (Computer._cpntClasses.get(type))();
        const key = cpnt.constructor.type + cpnt.id;
        this._cpnts.set(key, cpnt);

        console.log(type + ' ' + cpnt.id + ' added');
        return cpnt;
    }

    getCpnt(type, id)
    {
        return this._cpnts.get(type + id);
    }

    removeCpnt(type, id)
    {
        console.log(type + ' ' + id + ' removed');
        return this._cpnts.delete(type + id);
    }
}

module.exports = Computer;
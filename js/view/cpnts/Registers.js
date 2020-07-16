const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Registers';
const image = 'img/cpnt/Registers.png';

class RegistersInstance extends CpntInstance
{
    static get type()
    {
        return type;
    }
    
    static get image()
    {
        return image;
    }
}

class RegistersOriginal extends CpntOriginal
{
    static get type()
    {
        return type;
    }
    
    static get image()
    {
        return image;
    }

    static get instance()
    {
        return RegistersInstance;
    }
}

module.exports = RegistersOriginal;
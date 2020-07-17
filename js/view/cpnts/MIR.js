const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'MIR';
const image = 'img/cpnt/MIR.png';

class MIRInstance extends CpntInstance
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

class MIROriginal extends CpntOriginal
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
        return MIRInstance;
    }
}

customElements.define('mir-instance', MIRInstance);
customElements.define('mir-original', MIROriginal);

module.exports = MIROriginal;
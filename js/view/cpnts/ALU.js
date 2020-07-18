const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'ALU';
const image = 'img/cpnt/ALU.png';

class ALUInstance extends CpntInstance
{
    static get type()
    {
        return type;
    }
    
    static get image()
    {
        return image;
    }

    get cpnt()
    {
        return super.cpnt;
    }
    
    set cpnt(cpnt)
    {
        super.cpnt = cpnt;
        
        this.addInput('InputA', 11.5, 0);
        this.addInput('InputB', 69, 0);
        this.addInput('Function', 70, 29.5);

        this.addOutput('Result', 39.5, 44);
        this.addOutput('Control', 75, 14.5);
    }
}

class ALUOriginal extends CpntOriginal
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
        return ALUInstance;
    }
}

customElements.define('alu-instance', ALUInstance);
customElements.define('alu-original', ALUOriginal);

module.exports = ALUOriginal;
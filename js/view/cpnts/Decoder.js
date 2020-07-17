const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'Decoder';
const image = 'img/cpnt/Decoder.png';

class DecoderInstance extends CpntInstance
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

class DecoderOriginal extends CpntOriginal
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
        return DecoderInstance;
    }
}

customElements.define('decoder-instance', DecoderInstance);
customElements.define('decoder-original', DecoderOriginal);

module.exports = DecoderOriginal;
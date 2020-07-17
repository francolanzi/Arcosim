const { CpntOriginal, CpntInstance } = require('../Component');

const type = 'ControlStore';
const image = 'img/cpnt/ControlStore.png';

class ControlStoreInstance extends CpntInstance
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

class ControlStoreOriginal extends CpntOriginal
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
        return ControlStoreInstance;
    }
}

customElements.define('control-store-instance', ControlStoreInstance);
customElements.define('control-store-original', ControlStoreOriginal);

module.exports = ControlStoreOriginal;
const Computer = require('./js/computer');

const FixedLayer = require('./js/view/FixedLayer');
const Menu = require('./js/view/menu/Menu');
const Gallery = require('./js/view/Gallery');

var computer = new Computer();

var gallery = new Gallery();
var menu = new Menu();

menu.getItem('cpnt').gallery = gallery;

gallery.addEventListener('add', ev =>
{
    var instance = ev.detail;
    instance.cpnt = computer.addCpnt(instance.constructor.type);
    instance.trash = menu.getItem('trash');
    instance.addEventListener('remove', () =>
        computer.removeCpnt(instance.constructor.type, instance.cpnt.id));
    document.body.appendChild(instance);
});

var fixedLayer = new FixedLayer();

fixedLayer.appendChild(menu);
fixedLayer.appendChild(gallery);

document.body.appendChild(fixedLayer);

document.ondragstart = () => false;
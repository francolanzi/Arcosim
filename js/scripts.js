const Computer = require('./js/computer');

const FixedLayer = require('./js/view/FixedLayer');
const Menu = require('./js/view/menu/Menu');
const Gallery = require('./js/view/Gallery');

const computer = new Computer();

const gallery = new Gallery();
const menu = new Menu();

menu.getItem('cpnt').gallery = gallery;

gallery.addEventListener('add', ev => {
  const instance = ev.detail;
  instance.cpnt = computer.addCpnt(instance.constructor.type);
  instance.trash = menu.getItem('trash');
  instance.addEventListener('remove', () =>
    computer.removeCpnt(instance.constructor.type, instance.cpnt.id));
  document.body.appendChild(instance);
});

const fixedLayer = new FixedLayer();

fixedLayer.appendChild(menu);
fixedLayer.appendChild(gallery);

document.body.appendChild(fixedLayer);

document.ondragstart = () => false;

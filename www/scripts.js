import Computer from './scripts/Computer.js';
import LinkLayer from './scripts/link/LinkLayer.js';
import MenuLayer from './scripts/menu/MenuLayer.js';
import ModalLayer from './scripts/ModalLayer.js';

const computer = new Computer();

const linkLayer = new LinkLayer();
const menuLayer = new MenuLayer();
const modalLayer = new ModalLayer();

menuLayer.gallery.addEventListener('add', ev => {
  const instance = ev.detail;

  computer.addCpnt(instance);

  instance.trash = menuLayer.menu.getButton('trash');

  instance.addEventListener('config', () => {
    const type = instance.constructor.type;
    const config = instance.config;
    if (config) {
      modalLayer.show(type, config);
    }
  });

  instance.addEventListener('remove', () => {
    for (const input of instance.inputs) {
      linkLayer.removeInput(input);
    }

    for (const output of instance.outputs) {
      linkLayer.removeOutput(output);
    }

    computer.removeCpnt(instance.constructor.type, instance.id);
  });

  instance.addEventListener('link', ev => {
    const input = ev.detail.input;
    const output = ev.detail.output;

    linkLayer.addLink(input, output);
  });

  instance.addEventListener('move', () => {
    for (const input of instance.inputs) {
      linkLayer.moveInput(input);
    }

    for (const output of instance.outputs) {
      linkLayer.moveOutput(output);
    }
  });

  instance.addEventListener('unlink', ev => {
    linkLayer.removeInput(ev.detail);
  });

  document.body.append(instance);
});

document.body.append(linkLayer);
document.body.append(menuLayer);

document.body.append(modalLayer);

document.ondragstart = () => false;

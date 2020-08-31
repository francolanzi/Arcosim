import LinkLayer from './scripts/link/LinkLayer.js';
import MenuLayer from './scripts/menu/MenuLayer.js';
import ModalLayer from './scripts/modal/ModalLayer.js';

const menuLayer = new MenuLayer();
const linkLayer = new LinkLayer();
const modalLayer = new ModalLayer();

menuLayer.addEventListener('modal', ev =>
  modalLayer.show(ev.detail.title, ev.detail.content));

menuLayer.computer.addEventListener('add', ev => {
  const cpnt = ev.detail;

  cpnt.addEventListener('config', () => {
    const type = cpnt.constructor.type;
    const config = cpnt.config;
    if (config) {
      modalLayer.show(type, config);
    }
  });

  cpnt.addEventListener('remove', () => {
    for (const input of cpnt.inputs) {
      linkLayer.removeInput(input);
    }

    for (const output of cpnt.outputs) {
      linkLayer.removeOutput(output);
    }
  });

  cpnt.addEventListener('link', ev => {
    const input = ev.detail.input;
    const output = ev.detail.output;

    linkLayer.addLink(input, output);
  });

  cpnt.addEventListener('move', () => {
    for (const input of cpnt.inputs) {
      linkLayer.moveInput(input);
    }

    for (const output of cpnt.outputs) {
      linkLayer.moveOutput(output);
    }
  });

  cpnt.addEventListener('unlink', ev => {
    linkLayer.removeInput(ev.detail);
  });

  cpnt.addEventListener('removeinput', ev => {
    linkLayer.removeInput(ev.detail);
  });

  cpnt.addEventListener('removeoutput', ev => {
    linkLayer.removeOutput(ev.detail);
  });

  document.body.append(cpnt);
});

document.body.append(linkLayer);
document.body.append(menuLayer);
document.body.append(modalLayer);

document.ondragstart = () => false;

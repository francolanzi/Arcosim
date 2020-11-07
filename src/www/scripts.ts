import Component from './scripts/Component.js';
import Input from './scripts/io/Input.js';
import Output from './scripts/io/Output.js';
import Link from './scripts/link/Link.js';
import LinkLayer from './scripts/link/LinkLayer.js';
import MenuLayer from './scripts/menu/MenuLayer.js';
import ModalLayer from './scripts/modal/ModalLayer.js';

const menuLayer = new MenuLayer();
const linkLayer = new LinkLayer();
const modalLayer = new ModalLayer();

menuLayer.addEventListener('modal', ev => {
  const modal = (<CustomEvent> ev).detail;
  modalLayer.show(modal.title, modal.content);
});

menuLayer.computer.addEventListener('add', ev => {
  const cpnt: Component = (<CustomEvent> ev).detail;

  cpnt.addEventListener('config', () => {
    const type = cpnt.type;
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
    const link: Link = (<CustomEvent> ev).detail;
    linkLayer.addLink(link);
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
    const input: Input = (<CustomEvent> ev).detail;
    linkLayer.removeInput(input);
  });

  cpnt.addEventListener('removeinput', ev => {
    const input: Input = (<CustomEvent> ev).detail;
    linkLayer.removeInput(input);
  });

  cpnt.addEventListener('removeoutput', ev => {
    const output: Output = (<CustomEvent> ev).detail;
    linkLayer.removeOutput(output);
  });

  document.body.append(cpnt);
});

document.body.append(linkLayer);
document.body.append(menuLayer);
document.body.append(modalLayer);

document.ondragstart = () => false;

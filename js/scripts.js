const fs = require('fs');
const path = require('path');

const $ = require('jquery');
require('bootstrap/dist/js/bootstrap.bundle');

const Computer = require('./js/computer');

const Menu = require('./js/view/menu/Menu');
const TrashItem = require('./js/view/menu/items/TrashItem');
const LinkItem = require('./js/view/menu/items/LinkItem');
const CpntItem = require('./js/view/menu/items/CpntItem');

var computer = new Computer();

var menu = new Menu();

var trash = new TrashItem();
var link = new LinkItem();
var cpnt = new CpntItem();

menu.addItem('trash', trash);
menu.addItem('link', link);
menu.addItem('cpnt', cpnt);

board.prepend(menu);

fs.readdirSync('js/view/cpnts').forEach(file =>
{
    file = path.parse(file);
    if (file.ext === '.js')
    {
        var ctor = require('./js/view/cpnts/' + file.name);
        var cpnt = new ctor(trash);

        cpnt.addEventListener('add', ev =>
        {
            var instance = ev.detail;
            board.appendChild(instance);
            instance.cpnt = computer.addCpnt(instance.constructor.type);
        });

        cpnt.addEventListener('remove', ev =>
        {
            var instance = ev.detail;
            computer.removeCpnt(instance.constructor.type, instance.cpnt.id);
        });
    
        gallery.firstElementChild.appendChild(cpnt);
    }
});

document.ondragstart = () => false;

var anchor = document.getElementsByTagName('a');

for (let i = 0; i < anchor.length; i++)
    anchor[i].addEventListener('mousedown', ev => ev.preventDefault());
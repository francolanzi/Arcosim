const jQuery = $ = require('jquery');
require('jquery-ui-dist/jquery-ui');
require('bootstrap/dist/js/bootstrap.bundle');

const cpnt = require('./js/cpnt');

for (name of cpnt.list())
{
    let html = '\
        <div class="row justify-content-around my-3">\
            <div class="col-auto">\
                <div id="' + name + '" class="m-0 p-0"></div>\
            </div>\
        </div>\
    ';

    $('#gallery').append(html);
    
    let elem = $('#' + name);
    let data = cpnt.get(name);

    let img = new Image();
    img.onload = () =>
    {
        elem.width(img.width);
        elem.height(img.height);
        elem.css('background-image', 'url(' + data.image + ')');
    };
    img.src = data.image;
}
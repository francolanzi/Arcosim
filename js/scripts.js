const jQuery = $ = require('jquery');
require('jquery-ui-dist/jquery-ui');
require('bootstrap/dist/js/bootstrap.bundle');

const cpnt = require('./js/cpnt');

for (type of cpnt.cpntTypes())
{
    let html = '\
        <div class="row justify-content-around my-3">\
            <div class="col-auto">\
                <div id="' + type + '" class="m-0 p-0"></div>\
            </div>\
        </div>\
    ';

    $('#gallery').append(html);
    
    let elem = $('#' + type);

    let img = new Image();
    let src = cpnt.getImage(type);
    
    img.onload = () =>
    {
        elem.width(img.width);
        elem.height(img.height);
        elem.css('background-image', 'url(' + src + ')');
    };
    img.src = src;
}
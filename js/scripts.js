const jQuery = $ = require('jquery');
require('jquery-ui-dist/jquery-ui');
require('bootstrap/dist/js/bootstrap.bundle');

const computer = require('./js/computer');

for (type of computer.cpntTypes())
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
    let src = computer.getCpntImage(type);

    img.onload = () =>
    {
        elem.width(img.width);
        elem.height(img.height);
        elem.css('background-image', 'url(' + src + ')');
    };
    img.src = src;
}
const 
    http = require('http'),
    fs   = require('fs'),
    path = require('path');
require('dotenv').config();

const servePage = (res, pageName) => {
    res.writeHead(200);
    let stream = fs.createReadStream('views/' + pageName);
    stream.pipe(res);
};

const servePublicFile = (res, url) => {
    res.writeHead(200);
    let stream = fs.createReadStream(path.join(__dirname, url));
    stream.pipe(res);
};

const server = http.createServer((req, res) => {
    console.log('Requesting ' + req.url);

    if (req.url.startsWith('/public')) {
        servePublicFile(res, req.url);
        return;
    }

    switch (req.url) {
        case '/index':
            servePage(res, 'index.html');
            break;
        case '/einloggen':
                servePage(res, 'einloggen.html');
            break;
        case '/registrieren':
                servePage(res, 'registrieren.html');
            break;
        default:
            servePage(res, 'dashboard.html');
            break;
    }
});

server.listen(process.env.PORT, () => {
    console.log('Server listening at port ' + process.env.PORT);
});
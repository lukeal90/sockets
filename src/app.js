const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const logger = require('./helpers/logger');
const Router = require('./routes');
const packageJson = require('../package.json');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { ProductController } = require('./controllers');
const { ChatController } = require('./controllers');

const {
    BODY_LIMIT,
    NODE_ENV,
    PORT
} = process.env;

class App {
    constructor() {
        this.app = express();
        this.httpServer = new HttpServer(this.app);
        this.io = new IOServer(this.httpServer);
    }

    _onListening() {
        logger.info(`Started ${packageJson.name} at port ${PORT} in ${NODE_ENV} environment`);
    }

    _onError(err) {
        logger.error(`App Crashed, Error: ${err.errorMessage}`);
        process.exit;
    }

    _configure() {
        this._webSocket();
        this._middleWares();
        return this._routes();
    }

    _middleWares() {
        // this.app.engine('handlebars', engine());
        // this.app.set('view engine', 'handlebars');
        // this.app.set('views', './src/views');
        this.app.use(bodyParser.json({limit: BODY_LIMIT}));
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(express.static(path.resolve('public')));
        this.app.use(cookieParser());
        this.app.use(morgan('dev'));
        this.app.use(cors({
            credentials: true,
            origin: /^http:\/\/localhost/
        }));
        return;
    }

    _webSocket() {
        this.io.on('connection', async (socket) => {
            console.log('Un cliente se ha conectado');
            const productos = await ProductController.getAll();
            socket.emit('productos', productos);
        
            const messages = await ChatController.getAll();
            socket.emit('messages', messages);
        
            socket.on('new-producto', async (data) => {
                const idNuevoProducto = await ProductController.addProduct(data);
                const productos = await ProductController.getAll();
                this.io.sockets.emit('productos', productos);
            });
            socket.on('new-message', async (data) => {
                const nuevoM = await ChatController.save(data);
                const messages = await ChatController.getAll();
                this.io.sockets.emit('messages', messages);
            });
        });
    }

    async _routes() {
        Router.configure(this.app);
        return;
    }

    async init() {
        await this._configure();
        this.httpServer.listen(PORT, this._onListening);
        this.app.on('error', this._onError);
        return this.app;
    }    
}

module.exports = App;
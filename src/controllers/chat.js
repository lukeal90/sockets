const SocketIo = require('../utils/socketIo');
const socket = this.io();

class ChatController {

    static async save(req, res) {
        try {
            console.log(req.body);
        } catch (error) {
            console.log("Algo salio mal al obtener los productos : " + error.message);
        }
    }

}

module.exports = ChatController;
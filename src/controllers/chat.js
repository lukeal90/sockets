const SocketIo = require('../utils/socketIo');
const fs = require('fs').promises;
const path = require('path');
const pathFile = path.resolve(__dirname, "../../public/chat.json");

class ChatController {

    static async save(data) {
        try {
                const chats = await this.getAll();
                let id = 1;
            
                if(chats.length > 0){
                    id = parseInt(chats[chats.length - 1].id) + 1;
                }
        
                const newChat = {...data, id: id}
                chats.push(newChat);
                await fs.writeFile(pathFile, JSON.stringify(chats)); 
        } catch (error) {
            console.log("Algo salio mal al obtener los chats : " + error.message);
        }
    }

    static async getAll() {
        let chat =  await fs.readFile(pathFile);

        if(chat.length > 0 ){
            chat = JSON.parse(chat);
        }else{
            chat = [];
        }
        return chat;
    }    

}

module.exports = ChatController;
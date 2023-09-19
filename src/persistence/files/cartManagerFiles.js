import fs from "fs";

export class cartManagerFiles {

constructor (path){
    this.pathFile = path;
}

fileExist (){
    return fs.existsSync(this.pathFile)
}

async getCart () {
try {
    if (this.fileExist()){
        const contenidoString = await fs.promises.readFile(this.pathfile,"utf-8");
        const cart = JSON.parse(contenidoString);
        return(cart)
    } else {
        throw new Error ("no se pudo encontrar el archivo")
    }
    
} catch (error) {
    throw error;
}



}



}
import { Comentario } from "./comentario";
import { Local } from "./local";

export class Post {

    constructor(){

        this.uuid = '';
        this.usuario = '';
        this.titulo = '';
        this.descricao = '';
        this.nota = 0;
        this.data_hora = new Date();
        this.ativo = false;
        this.local = new Local();
        this.gostei = 0;
    }

    public local : Local;
    uuid : string;
    usuario : string;
    titulo : string;
    descricao : string;
    nota : number;
    data_hora : Date;
    ativo : boolean;
    gostei : number
}
import { Local } from "./local";
import { Avaliacao } from "./avaliacao";

export class Post {

    constructor(){

        this.uuid = '';
        this.usuario = '';
        this.titulo = '';
        this.descricao = '';
        this.nota = 0;
        this.local = new Local();
        this.data_hora = new Date();
        this.ativo = false;
    }

    uuid : string;
    usuario : string;
    titulo : string;
    descricao : string;
    nota : number;
    local : Local;
    data_hora : Date;
    comentarios : Avaliacao[];
    ativo : boolean;
}
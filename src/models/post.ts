import { Avaliacao } from "./avaliacao";
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
    }

    public local : Local;
    uuid : string;
    usuario : string;
    titulo : string;
    descricao : string;
    nota : number;
    data_hora : Date;
    comentarios : Avaliacao[];
    ativo : boolean;
}
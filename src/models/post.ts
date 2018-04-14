import { Local } from "./local";
import { Avaliacao } from "./avaliacao";

export class Post {

    constructor(){}

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
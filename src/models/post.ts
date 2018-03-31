import { DateTime } from "ionic-angular";
import { Local } from "./local";
import { Avaliacao } from "./avaliacao";

export interface Post {

    uuid : string;
    usuario : string;
    titulo : string;
    descricao : string;
    nota : number;
    local : Local;
    data_hora : DateTime;
    comentarios : Avaliacao[];
}
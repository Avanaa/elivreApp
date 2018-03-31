import { DateTime } from "ionic-angular";

export interface Avaliacao {
    
    uuid : string;
    usuario : string;
    descricao : string;
    data_hora : DateTime;
    nota : number;
}
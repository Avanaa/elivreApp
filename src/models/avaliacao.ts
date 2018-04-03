import { DateTime } from "ionic-angular";

export class Avaliacao {
    
    uuid : string;
    usuario : string;
    descricao : string;
    data_hora : DateTime;
    nota : number;
}
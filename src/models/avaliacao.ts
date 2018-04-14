export class Avaliacao {
    
    constructor(){
        
        this.uuid = '';
        this.usuario = '';
        this.descricao = '';
        this. data_hora = new Date();
        this.nota = 0;
    }
    
    uuid : string;
    usuario : string;
    descricao : string;
    data_hora : Date;
    nota : number;
}
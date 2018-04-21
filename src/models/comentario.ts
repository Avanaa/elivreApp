export class Comentario {
    
    constructor(){
        
        this.usuario = '';
        this.descricao = '';
        this.ativo = false;
        this. data_hora = new Date();
    }

    uuid : string;
    post : string;
    ativo : boolean;
    usuario : string;
    descricao : string;
    data_hora : Date;
}
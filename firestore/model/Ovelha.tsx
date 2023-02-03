export class Ovelha {
    public id: string;
    public nome: string;
    public sexo: string;
    public datanascimento: string;
    public raca: string;
    public dono: string;
    
    constructor(obj?: Partial<Ovelha>) {
        if (obj) {
            this.id = obj.id
            this.nome = obj.nome
            this.raca = obj.raca
            this.sexo = obj.sexo
            this.datanascimento = obj.datanascimento
            this.dono = obj.dono
         }
    }

    toFirestore() {
        const ovelha=  {
                    id : this.id,
                    nome : this.nome,
                    raca : this.raca,
                    sexo : this.sexo,
                    datanascimento : this.datanascimento,
                    dono : this.dono
         }
         return ovelha
    }

   
    toString() {
        const Objeto = `{
            "id": "${this.id}",
            "nome": "${this.nome}",
            "raca": "${this.raca}",
            "sexo": "${this.sexo}",
            "datanascimento": "${this.datanascimento}",
            "dono": "${this.dono}"
        }`
        return Objeto
    }
};
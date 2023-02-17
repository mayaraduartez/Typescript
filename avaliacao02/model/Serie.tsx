export class Serie {
    public id: string;
    public titulo: string;
    public genero: string;
    public temporadas: number;
    public ano: number;
    public classificacao: string;
    
    constructor(obj?: Partial<Serie>) {
        if (obj) {
            this.id = obj.id
            this.titulo = obj.titulo
            this.genero = obj.genero
            this.temporadas = obj.temporadas
            this.ano = obj.ano
            this.classificacao = obj.classificacao
         }
    }

    toFirestore() {
        const series =  {
                    id : this.id,
                    titulo : this.titulo,
                    genero : this.genero,
                    temporadas : this.temporadas,
                    ano : this.ano,
                    classificacao : this.classificacao
         }   
     
         return series
    }

       
    toString() {
        const Objeto = `{
            "id": "${this.id}",
            "titulo": "${this.titulo}",
            "genero": "${this.genero}",
            "temporadas": "${this.temporadas}",
            "ano": "${this.ano}",
            "classificacao": "${this.classificacao}"
        }`
        return Objeto
    }
};

export class Usuario {
    public id: string;
    public email: string;
    public urlfoto: string;
    public nome: string;
    public senha: string;

    constructor(obj?: Partial<Usuario>) {
        if (obj) {
            this.id = obj.id
            this.email = obj.email
            this.urlfoto = obj.urlfoto
            this.nome = obj.nome
            this.senha = obj.senha
        }
    }

    toString() {
        const Objeto = `{
            "id": "${this.id}",
            "nome": "${this.nome}",
            "email": "${this.email}",
            "senha": "${this.senha}"
            "urlfoto": "${this.urlfoto}"
        }`

        return Objeto
    }

    toFirestore() {
        const usuario = {
            id: this.id,
            nome: this.nome,
            email: this.email,
            urlfoto: this.urlfoto,
            senha: this.senha
        }
        return usuario
    }

};
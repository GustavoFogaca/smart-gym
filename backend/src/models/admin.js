module.exports = class Admin {
    constructor(idUsuario, email, senha, cpf, altura, peso, telefone, admin) {
        this.idUsuario = idUsuario;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.altura = altura;
        this.peso = peso;
        this.telefone = telefone;
        this.admin = admin;
    }
}
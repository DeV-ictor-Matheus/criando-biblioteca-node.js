export default function trataErros(erro) {
    if (erro.code === 'ENOENT') {
        throw new Error('Arquivo não encontrado'); //Consultar MDN
    } else {
        return 'Erro na aplicação';
    }
}

//module.exports = trataErros;

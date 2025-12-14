/*const caminhoArquivo = require('./arquivos/texto-web.txt');
   
    //Retorna erro: Não consegue encontrar o módulo caminho do arquivo
    //Acontece pq o Require lê/executar
    //Preciso fazer com que o javascript entenda que esse caminho: './arquivos/texto-web.txt'
    //se refere a um texto/string

console.log(caminhoArquivo);

*/
//Nova forma de mostrar o caminho do arquivo.

export function contaPalavras(texto) {
    const paragrafos = extraiParagrafos(texto)
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
            return verificaPalavrasDuplicadas(paragrafo);
    })
    return contagem;
}

function extraiParagrafos(texto) {
    return texto.toLowerCase().split('\n');

}

/*function quebraEmParagrafos(texto) {
    //const paragrafos = texto.toLowerCase().split('\n');
    const contagem = paragrafos.flatMap((paragrafo) => {
        //flatMap é uma função que achata/concatena os arrays, transformando vários em 1
        //Ex: [1, 2, [3, 4]] -> [1, 2, 3, 4]
        //Faz com que o processo de leitura do código seja melhor do que ter fazer a 
        //função de filter e map

        if (!paragrafo) return [];
        Como tá separando por parágrafo, posso ter um array e cada objeto que monta com a contagem
        vai separar um parágrafo*/
        //return verificaPalavrasDuplicadas(paragrafo);
        /*A cada parágrafo do meu array de parágrafos, executa a função de contagem e retorna um objeto
        pra dentro da minha variável contagem
    })*/
    /*
    //1ª Parte - Iterar o array de parágrafo usando map para retornar o array
    //2ª Parte - Chamar a função de verificar palavras
    const contagem = paragrafos
    .filter((paragrafo) => paragrafo)
    .map((paragrafo) => {
        return verificaPalavrasDuplicadas(paragrafo);
    })
    console.log(contagem);
}*/

function limpaPalavras(palavra) {
    /*Expressão regular: /[.,\/#!$%\^&\*;:{}=\-_`~()]/g   -> Serve para facilitar o fato de não precisar
    fazer com que os caracteres sejam strings 1 por 1. Ex: ('(', ')', '#', etc...) */
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

// 1ª Parte: criar um array com as palavras
// 2ª Parte: contar as ocorrências
// 3ª Parte: montar um objeto com o resultado

function verificaPalavrasDuplicadas(texto) {
    const listaPalavras = texto.split(' '); //1ª Parte
    //Parâmetro do método split é o separador
    //Buscar por todas as strings e criar um espaço com esse separador
    //Todo lugar que tiver esse espaço dentro do texto, o método vai colocar como um elemento no array
    const resultado = {}; //2ª Parte
    //objeto[propriedade] = valor;
    listaPalavras.forEach(palavra => { //3ª Parte
        if (palavra.length >= 3) {
            const palavraLimpa = limpaPalavras(palavra);
            //forEach não retorna nada, apenas executa oq esta dentro do callback
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
    })
    return resultado;
    //Nesse caso ainda trás algumas palavras curtas: Do, uma, etc
    //Também trás o \n também considerado como palavra
    //Além de uma palavra junto com parênteses
    //Diferença de minúsculas e maiúsculas: um/Um  
}

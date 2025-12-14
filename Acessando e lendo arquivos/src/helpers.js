//Preciso criar uma função para filtrar a qtd de vezes q se repetem as palavras no parágrafo

//Cada parágrafo é um objeto!
//Object.keys -> pega um objeto e retorna um array com todas as chaves desse objeto
//As chaves, neste caso, são as palavras dentro dos parágrafos
// > 1, verificar se o resultado dessa avaliação é a qtd de vezes q se repete a palavra

function filtraOcorrencia(paragrafo) {
    return Object.keys(paragrafo).filter(chave => paragrafo[chave] > 1)
}
//O resultado da função filtraOcorrencias é um array apenas com as palavras, sendo assim posso usar o método .join para transformar arrays em strings

//Criação do texto para entrega final
//Lembrar que listaPalavras é um array de objeto
//Iteração de array SEM RETORNO, então posso usar um forEach!!

function montaSaidaArquivo(listaPalavras) {
    let textoFinal = '';
    listaPalavras.forEach((paragrafo, indice) => {
        const duplicadas = filtraOcorrencia(paragrafo).join(', ');
        if (!duplicadas) {
            textoFinal += `Não há palavras duplicadas no parágrafo ${indice + 1} \n`
        } else {
            textoFinal += `Palavras duplicadas no parágrafo ${indice + 1}: ${duplicadas} \n`
        }
    })
    return textoFinal;
}

export { montaSaidaArquivo };
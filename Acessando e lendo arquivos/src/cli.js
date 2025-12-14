//CLI -> Command Line Interface - Interface de linha de comando
//const fs = require('fs'); // fs = file system - Uma das bibliotecas mais importantes de qualquer linguagem
import fs from 'fs';
//const trataErros = require('./Erros/funcoesErro');
import path from 'path';
import trataErros from './Erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'Caminho do texto a ser processado')
    .option('-d, --destino <string>', 'Caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        const { texto, destino } = options;

        if (!texto || !destino) {
            console.error(chalk.red('Erro! Favor inserir caminho de origem e destino'));
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log(chalk.green('Texto processado com sucesso'));
        } catch (erro) {
            console.log('Ocorreu um erro no processamento', erro);
        }
    })

program.parse();

/*const caminhoArquivo = process.argv; //argv: argument vector -> pega os valores que são passados pelo terminal e coloca em array
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];
//node src/index.js alura
*/

function processaArquivo(texto, destino) {
    fs.readFile(texto, 'utf-8', (erro, texto) => { 
        //como estamos lidando com arquivos de TEXTO, então precisamos passar o incoding
        //utf-8 é o incoding -  sistema de "encodamento" do texto
        //utf-8 pra encodar os nossos caracteres do idioma
        //Parâmetro texto é resultado do callback do readFile
        //A partir do momento que acessou, fazemos com que se inicie a função: verificaPalavrasDuplicadas
        //quebraEmParagrafos(texto)
        //verificaPalavrasDuplicadas(texto); -> Comentado pois o processo será realizado por parágrafo
        try { //Pensando em formas de já evitar ou o que fazer com algum erro que possa acontecer
            if (erro) throw erro;
            const resultado = contaPalavras(texto);
            criaESalvaArquivo(resultado, destino);
        } catch(erro) {
            trataErros(erro);
        }
    });
}

/*async function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = JSON.stringify(listaPalavras);
    try {
        await fs.promises.writeFile(arquivoNovo, textoPalavras);
        console.log('arquivo criado');
    } catch(erro) {
      throw erro; 
    }
}*/
//Async e Await
//Async sempre ser adicionado na declaração da função
//Await adiciona na linha onde vai ser executado o método asíncrono

//Promise -> Métodos assíncronos não retornam dados finais (Sempre nos perguntamos sobre oq a função retorna: array, objeto, boolean...)

//Funções assíncronas baseadas em promessas(promises) retornam objetos promessas
//Then é a função responsável por fazer a conclusão dessa promessa

function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    
    fs.promises.writeFile(arquivoNovo, textoPalavras)
        .then(() => {
            //Dentro da Função Callback que coloca o dado para processamento feito com o resultado da promessa
            //EX: Caso a promessa retorna um JSON com vários dados, tenho q colocar JSON na função callback como parâmetro - Para este caso não é necessário, então só coloca o log
            console.log('Arquivo criado');
        })
        .catch((erro) => {
            throw erro;
        })
        .finally(() => console.log('Operação Finalizada')
        //Finally é muito útil em operações com banco de dados
        //Neste caso, como n tem operação com o banco, é basicamente fechar o then
        )
}

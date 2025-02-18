/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const musicaDAO = require('../../model/DAO/musica.js')

//Função para inserir uma nova musica
const inserirMusica = async function(musica){

    if(musica.nome            == '' || musica.nome            == null || musica.nome            == undefined || musica.nome.length            > 100 ||
       musica.ducacao         == '' || musica.duracao         == null || musica.ducacao         == undefined || musica.duracao.length         > 5   ||
       musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento == undefined || musica.data_lancamento.length > 10  ||
       musica.letra    == undefined || musica.link       == undefined || musica.link                                                          > 200
    ){
        return message.ERROR_REQUIRED_FIELDS//status code 400
    }else{
        //encaminhando os dados da musica para o DAO realizar o insert no Banco de dados
        let resultMusica = await musicaDAO.insertMusica(musica)

        if(resultMusica){
            return message.SUCCESS_CREATED_ITEM // 201
        }else{
            return message.ERROR_INTERNAL_SERVER//500
        }
    }
}

//Função para atualizar uma musica existente
const atualizarMusica = async function(){
    
}

//Função para excluir uma musica existente
const excluirMusica = async function(){
    
}


//Função para retornar uma lista de músicas
const listarMusica = async function(){
    
}

//Função para buscar uma musica pelo ID
const buscarMusica = async function(){
    
}

module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}
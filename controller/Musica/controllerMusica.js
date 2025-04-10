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
const inserirMusica = async function(musica, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            musica.nome            == '' || musica.nome            == null || musica.nome            == undefined || musica.nome.length            > 100 ||
            musica.duracao         == '' || musica.duracao         == null || musica.duracao         == undefined || musica.duracao.length         > 8   ||
            musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento == undefined || musica.data_lancamento.length > 10  ||
            musica.letra    == undefined || musica.link       == undefined || musica.link.length                                                   > 200
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da musica para o DAO realizar o insert no Banco de dados
                let resultMusica = await musicaDAO.insertMusica(musica)

                if(resultMusica){
                    return message.SUCCESS_CREATED_ITEM // 201
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para atualizar uma musica existente
const atualizarMusica = async function(id, musica, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
               musica.nome            == '' || musica.nome            == null || musica.nome            == undefined || musica.nome.length            > 100 ||
               musica.duracao         == '' || musica.duracao         == null || musica.duracao         == undefined || musica.duracao.length         > 8   ||
               musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento == undefined || musica.data_lancamento.length > 10  ||
               musica.letra    == undefined || musica.link       == undefined || musica.link.length                                                   > 200 ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await musicaDAO.selectByIdMusica(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            musica.id = id
                            let resultMusica = await musicaDAO.updateMusica(musica)

                            if(resultMusica){
                                return message.SUCESS_UPDATED_ITEM//200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL//500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND//404
                        }
                    }
                }

            }else{
                return message.ERROR_CONTENT_TYPE//415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
}

//Função para excluir uma musica existente
const excluirMusica = async function(id){
   try {

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultMusica = await musicaDAO.selectByIdMusica(id)

        if(resultMusica!= false || typeof(resultMusica)== "object"){
            if(resultMusica.length > 0){
                //delete
                let result = await musicaDAO.deleteMusica(id)

                if(result)
                    return message.SUCCES_DELETE_ITEM//200
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
            }else{
                return message.ERROR_NOT_FOUND//404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }

    }
   } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
   }
}

//Função para retornar uma lista de músicas
const listarMusica = async function(){
    try {
        //Criando um Objeto JSON
        let dadosMusica = {}

        //Chama a função para retornar as musicas do banco de dados
        let resultMusica = await musicaDAO.selectAllMusica()

        if(resultMusica != false){
            if(resultMusica.length > 0){
                //Cria um JSON para colocar o ARRAY de musicas
                dadosMusica.status = true
                dadosMusica.status_code = 200,
                dadosMusica.items = resultMusica.length
                dadosMusica.musics = resultMusica

                return dadosMusica

            }else{
                return message.ERROR_NOT_FOUND//404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL//500
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    
}

//Função para buscar uma musica pelo ID
const buscarMusica = async function(id){
    try {

        if(
            id == "" || id == undefined || id == null || isNaN(id)){ 
            return message.ERROR_REQUIRED_FIELDS//400   
        }else{
    
            let dadosMusica = {}

            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if(resultMusica != false || typeof(resultMusica)== "object"){
                if(resultMusica.length > 0){
                    dadosMusica.status = true
                    dadosMusica.status_code = 200,
                    dadosMusica.musics = resultMusica
        
                    return dadosMusica

                }else{
                    return message.ERROR_NOT_FOUND//404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL//500
            }
        }
    
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}
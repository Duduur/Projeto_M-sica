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
const tipoDAO = require('../../model/DAO/tipoAlbum.js')

//Função para inserir uma nova tipo
const inserirTipoAlbum = async function(tipo, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            tipo.tipo_album            == '' || tipo.tipo_album            == null || tipo.tipo_album            == undefined || tipo.tipo_album.length            > 100 
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da tipo para o DAO realizar o insert no Banco de dados
                let resultTipo = await tipoDAO.insertTipoAlbum(tipo)

                if(resultTipo){
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

//Função para atualizar uma tipo existente
const atualizarTipoAlbum = async function(id, tipo, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
               tipo.tipo_album            == '' || tipo.tipo_album            == null || tipo.tipo_album            == undefined || tipo.tipo_album.length            > 100  ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await tipoDAO.selectByIdTipoAlbum(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            tipo.id = id
                            let resultTipo = await tipoDAO.updateTipoAlbum(tipo)

                            if(resultTipo){
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

//Função para excluir uma tipo existente
const excluirTipoAlbum = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultTipo = await tipoDAO.selectByIdTipoAlbum(id)
        if(resultTipo!= false || typeof(resultTipo)== "object"){
            if(resultTipo.length > 0){
                //delete
                let result = await tipoDAO.deleteTipoAlbum(id)

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
const listarTipoAlbum = async function(){
    try {
        //Criando um Objeto JSON
        let dadosTipo = {}

        //Chama a função para retornar as tipos do banco de dados
        let resultTipo = await tipoDAO.selectAllTipoAlbum()

        if(resultTipo != false){
            if(resultTipo.length > 0){
                //Cria um JSON para colocar o ARRAY de tipos
                dadosTipo.status = true
                dadosTipo.status_code = 200,
                dadosTipo.items = resultTipo.length
                dadosTipo.tipo_album = resultTipo

                return dadosTipo

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

//Função para buscar uma tipo pelo ID
const buscarTipoAlbum = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosTipo = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultTipo = await tipoDAO.selectByIdTipoAlbum(id)

            if(resultTipo != false || typeof(resultTipo) == 'object'){
                if(resultTipo.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosTipo.status = true
                    dadosTipo.status_code = 200,
                    dadosTipo.tipo_album = resultTipo

                    return dadosTipo
                }else{
                    return message.ERROR_NOT_FOUND // 404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
   inserirTipoAlbum,
   atualizarTipoAlbum,
   excluirTipoAlbum,
   listarTipoAlbum,
   buscarTipoAlbum
}
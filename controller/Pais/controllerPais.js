/********************************************************************************************************************************
* Objetivo: Controller reponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 15/04/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const message = require('../../modulo/config.js')

const paisDAO = require('../../model/DAO/pais.js')

const inserirPais = async function(origem_pais, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json' )
         { 
            if(
            origem_pais.pais           == '' || origem_pais.pais           == null || origem_pais.pais          == undefined || origem_pais.pais.length            > 100 
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da musica para o DAO realizar o insert no Banco de dados
                let resultPais = await paisDAO.insertPais(pais)

                if(resultPais){
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

const atualizarPais = async function(id, pais_origem, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
               pais_origem.pais            == '' || pais_origem.pais            == null || pais_origem.pais            == undefined || pais_origem.pais.length            > 100 ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await paisDAO.selectByIdPais(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            pais_origem.id = id
                            let resultPais = await paisDAO.updatePais(pais)

                            if(resultPais){
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

const excluirPais = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultPais = await paisDAO.selectByIdPais(id)
        if(resultPais!= false || typeof(resultPais)== "object"){
            if(resultPais.length > 0){
                //delete
                let result = await paisDAO.deletePais(id)

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

const listarPais = async function(){
    try {
        //Criando um Objeto JSON
        let dadosPais = {}

        //Chama a função para retornar as musicas do banco de dados
        let resultPais = await paisDAO.selectAllPais()

        if(resultPais != false){
            if(resultPais.length > 0){
                //Cria um JSON para colocar o ARRAY de musicas
                dadosPais.status = true
                dadosPais.status_code = 200,
                dadosPais.items = resultPais.length
                dadosPais.country = resultPais

                return dadosPais

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

const buscarPais = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosPais = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultPais = await paisDAO.selectByIdPais(id)

            if(resultPais != false || typeof(resultPais) == 'object'){
                if(resultPais.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosPais.status = true
                    dadosPais.status_code = 200,
                    dadosPais.musics = resultPais

                    return dadosPais
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
    inserirPais,
    atualizarPais,
    excluirPais,
    listarPais,
    buscarPais
}
/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de genero no Banco de dados
* Data: 10/04/2025
* Autor: Eduardo
* Versão: 1.0
*****************************************************************************************/

const message = require('../../modulo/config.js')

const  generoDAO = require('../../model/DAO/genero.js')

const inserirGenero = async function(genero, contentType) {
    try {
        
       if(String(contentType).toLowerCase() == 'application/json'){

            if(
                genero.genero == '' || genero.genero == null || genero.genero == undefined|| genero.genero >100
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
            }else{

                let resultGenero = await generoDAO.insertGenero(genero)
                if(resultGenero){
                    return message.SUCCESS_CREATED_ITEM//201
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

const atualizarGenero = async function(id, genero, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
               genero.genero            == '' || genero.genero            == null || genero.genero            == undefined || genero.genero.length            > 100 ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await generoDAO.selectByIdGenero(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            genero.id = id
                            let resultgenero = await generoDAO.updateGenero(genero)

                            if(resultgenero){
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

const excluirGenero = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultGenero = await generoDAO.selectByIdGenero(id)

        if(resultGenero!= false || typeof(resultGenero)== "object"){
            if(resultGenero.length > 0){
                //delete
                let result = await generoDAO.deleteGenero(id)

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

const listarGenero = async function(){
    try {
        //Criando um Objeto JSON
        let dadosGenero = {}

        //Chama a função para retornar as generos do banco de dados
        let resultGenero = await generoDAO.selectAllGenero()
    
        if(resultGenero != false){
            if(resultGenero.length > 0){
                //Cria um JSON para colocar o ARRAY de generos
                dadosGenero.status = true
                dadosGenero.status_code = 200,
                dadosGenero.items = resultGenero.length
                dadosGenero.gender = resultGenero

                return dadosGenero

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

const buscarGenero = async function(numero){
    try {

        let id = numero

        let dadosGenero = {}

        if(
            id == "" || id == undefined || id == null || isNaN(id)){ 
            return message.ERROR_REQUIRED_FIELDS//400   
        }else{
    
            let resultGenero = await generoDAO.selectByIdGenero(id)
           
            if(resultGenero != false || typeof(resultGenero)== "object"){
                if(resultGenero.length > 0){
                    dadosGenero.status = true
                    dadosGenero.status_code = 200,
                    dadosGenero.gender = resultGenero
        
                    return dadosGenero

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
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}
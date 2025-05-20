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
const gravadoraDAO = require('../../model/DAO/gravadora.js')

//Função para inserir uma nova gravadora
const inserirGravadora = async function(gravadora, contentType){
    try {
        
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            gravadora.nome            == '' || gravadora.nome            == null || gravadora.nome            == undefined || gravadora.nome.length            > 100 ||
            gravadora.ano_fundacao         == '' || gravadora.ano_fundacao         == null || gravadora.ano_fundacao         == undefined || gravadora.ano_fundacao.length   > 4   ||
            gravadora.telefone == '' || gravadora.telefone == null || gravadora.telefone == undefined || gravadora.telefone.length > 20  ||
            gravadora.logotipo    == undefined || gravadora.logotipo       == null || gravadora.logotipo.length  > 200 || gravadora.logotipo == ""
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da gravadora para o DAO realizar o insert no Banco de dados
                let resultgravadora = await gravadoraDAO.insertGravadora(gravadora)

                if(resultgravadora){
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

//Função para atualizar uma gravadora existente
const atualizarGravadora = async function(id, gravadora, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
               gravadora.nome            == '' || gravadora.nome            == null || gravadora.nome            == undefined || gravadora.nome.length            > 100 ||
               gravadora.ano_fundacao         == '' || gravadora.ano_fundacao         == null || gravadora.ano_fundacao         == undefined || gravadora.ano_fundacao.length         > 8   ||
               gravadora.telefone == '' || gravadora.telefone == null || gravadora.telefone == undefined || gravadora.telefone.length > 10  ||
               gravadora.logotipo    == undefined || gravadora.logotipo       == null || gravadora.logotipo.length  > 200 || gravadora.logotipo == "" ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await gravadoraDAO.selectByIdGravadora(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            gravadora.id = id
                            let resultgravadora = await gravadoraDAO.updateGravadora(gravadora)

                            if(resultgravadora){
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

//Função para excluir uma gravadora existente
const excluirGravadora = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultgravadora = await gravadoraDAO.selectByIdGravadora(id)
        if(resultgravadora!= false || typeof(resultgravadora)== "object"){
            if(resultgravadora.length > 0){
                //delete
                let result = await gravadoraDAO.deleteGravadora(id)

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
const listarGravadora = async function(){
    try {
        //Criando um Objeto JSON
        let dadosgravadora = {}

        //Chama a função para retornar as gravadoras do banco de dados
        let resultgravadora = await gravadoraDAO.selectAllGravadora()

        if(resultgravadora != false){
            if(resultgravadora.length > 0){
                //Cria um JSON para colocar o ARRAY de gravadoras
                dadosgravadora.status = true
                dadosgravadora.status_code = 200,
                dadosgravadora.items = resultgravadora.length
                dadosgravadora.gravadora = resultgravadora

                return dadosgravadora

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

//Função para buscar uma gravadora pelo ID
const buscarGravadora = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosgravadora = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultgravadora = await gravadoraDAO.selectByIdGravadora(id)

            if(resultgravadora != false || typeof(resultgravadora) == 'object'){
                if(resultgravadora.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosgravadora.status = true
                    dadosgravadora.status_code = 200,
                    dadosgravadora.gravadora = resultgravadora

                    return dadosgravadora
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
    inserirGravadora,
    atualizarGravadora,
    excluirGravadora,
    listarGravadora,
    buscarGravadora
}
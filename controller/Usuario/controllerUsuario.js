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
const userDAO = require('../..//model/DAO/usuario.js')

//Função para inserir uma nova ususuario
const inserirUsuario = async function(user, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            user.nome            == '' || user.nome            == null || user.nome            == undefined || user.nome.length            > 100 ||
            user.email         == '' || user.email         == null || user.email         == undefined || user.email.length         > 100   ||
            user.senha == '' || user.senha == null || user.senha == undefined || user.senha.length > 100  ||
            user.data_nascimento   == undefined || user.data_nascimento      == null|| user.data_nascimento.length  > 10 || user.data_nascimento == '' 
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da user para o DAO realizar o insert no Banco de dados
                let resultuser = await userDAO.insertUsuario(user)

                if(resultuser){
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

//Função para atualizar uma user existente
const atualizarUsuario = async function(id, user, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
               user.nome            == '' || user.nome            == null || user.nome            == undefined || user.nome.length            > 100 ||
               user.email         == '' || user.email         == null || user.email         == undefined || user.email.length         > 100   ||
               user.senha == '' || user.senha == null || user.senha == undefined || user.senha.length > 10  ||
               user.data_nascimento   == undefined || user.data_nascimento      == null|| user.data_nascimento.length  > 10 || user.data_nascimento == '' || user.data_nascimento > 200 ||
               id == ''                     || id == null                     || id == undefined                     || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await userDAO.selectByIdUsuario(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            user.id = id
                            let resultuser = await userDAO.updateUsuario(user)

                            if(resultuser){
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

//Função para excluir uma usuario  existente
const excluirUsuario = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultuser = await userDAO.selectByIdUsuario(id)
        if(resultuser!= false || typeof(resultuser)== "object"){
            if(resultuser.length > 0){
                //delete
                let result = await userDAO.deleteUsuario(id)

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

//Função para retornar uma lista usuarios
const listarUsuario = async function(){
    try {
        //Criando um Objeto JSON
        let dadosuser = {}

        //Chama a função para retornar as users do banco de dados
        let resultuser = await userDAO.selectAllUsuario()

        if(resultuser != false){
            if(resultuser.length > 0){
                //Cria um JSON para colocar o ARRAY de users
                dadosuser.status = true
                dadosuser.status_code = 200,
                dadosuser.items = resultuser.length
                dadosuser.usuario = resultuser

                return dadosuser

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

//Função para buscar um user pelo ID
const buscarUsuario = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosuser = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultuser = await userDAO.selectByIdUsuario(id)

            if(resultuser != false || typeof(resultuser) == 'object'){
                if(resultuser.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosuser.status = true
                    dadosuser.status_code = 200,
                    dadosuser.usuario = resultuser

                    return dadosuser
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}
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
const playlistDAO = require('../../model/DAO/playlist.js')
const controllerUsuario = require('../../controller/Usuario/controllerUsuario.js')

//Função para inserir uma nova playlist
const inserirPlaylist = async function(playlist, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            playlist.nome_playlist  == '' || playlist.nome_playlist  == null || playlist.nome_playlist  == undefined || playlist.nome_playlist.length  > 100 ||
            playlist.data_criacao == '' || playlist.data_criacao == null || playlist.data_criacao == undefined || playlist.data_criacao.length > 10  ||
            playlist.capa_playlist           == '' || playlist.capa_playlist           == null || playlist.capa_playlist           == undefined || playlist.capa_playlist                  > 300 ||
            playlist.id_usuario  == '' || playlist.id_usuario  == null || playlist.id_usuario  == undefined || isNaN(playlist.id_usuario)
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da playlist para o DAO realizar o insert no Banco de dados
                let resultplaylist = await playlistDAO.insertPlaylist(playlist)

                if(resultplaylist){
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

//Função para atualizar uma playlist existente
const atualizarPlaylist = async function(id, playlist, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
                playlist.nome_playlist  == '' || playlist.nome_playlist  == null || playlist.nome_playlist  == undefined || playlist.nome_playlist.length  > 100 ||
                playlist.data_criacao == '' || playlist.data_criacao == null || playlist.data_criacao == undefined || playlist.data_criacao.length > 10  ||
                playlist.capa_playlist           == '' || playlist.capa_playlist           == null || playlist.capa_playlist           == undefined || playlist.capa_playlist                  > 300 ||
                playlist.id_usuario  == '' || playlist.id_usuario  == null || playlist.id_usuario  == undefined || isNaN(playlist.id_usuario)        ||
                id                      == '' || id                      == null || id                      == undefined || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await playlistDAO.selectByIdPlaylist(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            playlist.id = id
                            let resultplaylist = await playlistDAO.updatePlaylist(playlist)

                            if(resultplaylist){
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

//Função para excluir uma playlist existente
const excluirPlaylist = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultplaylist = await playlistDAO.selectByIdPlaylist(id)
        if(resultplaylist!= false || typeof(resultplaylist)== "object"){
            if(resultplaylist.length > 0){
                //delete
                let result = await playlistDAO.deletePlaylist(id)

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
const listarPlaylist = async function(){
    try {


        let playlistsArray = []
        //Criando um Objeto JSON
        let dadosplaylist = {}

        //Chama a função para retornar as playlists do banco de dados
        let resultplaylist = await playlistDAO.selectAllPlaylist()

        if(resultplaylist != false){
            if(resultplaylist.length > 0){
                //Cria um JSON para colocar o ARRAY de playlists
                dadosplaylist.status = true
                dadosplaylist.status_code = 200,
                dadosplaylist.items = resultplaylist.length
                
                for (const itemplaylist of resultplaylist) {
                    
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemplaylist.id_usuario)

                    itemplaylist.usuario = dadosUsuario.usuario

                    delete itemplaylist.id_usuario

                    playlistsArray.push(itemplaylist)
                }

                dadosplaylist.playlist = playlistsArray

                return dadosplaylist

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

//Função para buscar uma playlist pelo ID
const buscarplaylist = async function(numero) {
    try {
        let id = numero

        let playlistsArray = []

        // Objeto JSON
        let dadosplaylist = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultplaylist = await playlistDAO.selectByIdPlaylist(id)

            if(resultplaylist != false || typeof(resultplaylist) == 'object'){
                if(resultplaylist.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosplaylist.status = true
                    dadosplaylist.status_code = 200

                    for (const itemplaylist of resultplaylist) {
                    
                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemplaylist.id_usuario)
    
                        itemplaylist.usuario = dadosUsuario.usuario
    
                        delete itemplaylist.id_usuario
    
                        playlistsArray.push(itemplaylist)
                    }
    
                    dadosplaylist.playlist = playlistsArray
    
                    return dadosplaylist
    
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
    inserirPlaylist,
    atualizarPlaylist,
    excluirPlaylist,
    listarPlaylist,
    buscarplaylist
}

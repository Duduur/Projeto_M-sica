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
const albumArtistaDAO = require('../../model/DAO/album_artista.js')

//Função para inserir uma nova albumArtista
const inserirAlbumArtista = async function(albumArtista, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
                albumArtista.id_artista == ""  || albumArtista.id_artista == undefined || albumArtista.id_artista == null || isNaN(albumArtista.id_artista) || albumArtista.id_artista <=0 ||
                albumArtista.id_album   == ""  || albumArtista.id_album   == undefined || albumArtista.id_album   == null || isNaN(albumArtista.id_album)   || albumArtista.id_album   <=0
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da albumArtista para o DAO realizar o insert no Banco de dados
                let resultalbumArtista = await albumArtistaDAO.insertalbumArtista(albumArtista)

                if(resultalbumArtista){
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

//Função para atualizar uma albumArtista existente
const atualizarAlbumArtista = async function(id, albumArtista, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
                    albumArtista.id_artista == ""  || albumArtista.id_artista == undefined || albumArtista.id_artista == null || isNaN(albumArtista.id_artista) || albumArtista.id_artista <=0 ||
                    albumArtista.id_album   == ""  || albumArtista.id_album   == undefined || albumArtista.id_album   == null || isNaN(albumArtista.id_album)   || albumArtista.id_album   <=0
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await albumArtistaDAO.selectByIdAlbumArtista(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            albumArtista.id = id
                            let resultalbumArtista = await albumArtistaDAO.updateAlbumArtista(albumArtista)

                            if(resultalbumArtista){
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

//Função para excluir uma albumArtista existente
const excluirAlbumArtista = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultalbumArtista = await albumArtistaDAO.selectByIdAlbumArtista(id)
        if(resultalbumArtista!= false || typeof(resultalbumArtista)== "object"){
            if(resultalbumArtista.length > 0){
                //delete
                let result = await albumArtistaDAO.deleteAlbumArtista(id)

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
const listarAlbumArtista = async function(){
    try {
        //Criando um Objeto JSON
        let dadosalbumArtista = {}

        //Chama a função para retornar as albumArtistas do banco de dados
        let resultalbumArtista = await albumArtistaDAO.selectAllAlbumArtista()

        if(resultalbumArtista != false){
            if(resultalbumArtista.length > 0){
                //Cria um JSON para colocar o ARRAY de albumArtistas
                dadosalbumArtista.status = true
                dadosalbumArtista.status_code = 200,
                dadosalbumArtista.items = resultalbumArtista.length
                dadosalbumArtista.album = resultalbumArtista

                return dadosalbumArtista

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

//Função para buscar uma albumArtista pelo ID
const buscarAlbumArtista = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosalbumArtista = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultalbumArtista = await albumArtistaDAO.selectByIdAlbumArtista(id)

            if(resultalbumArtista != false || typeof(resultalbumArtista) == 'object'){
                if(resultalbumArtista.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosalbumArtista.status = true
                    dadosalbumArtista.status_code = 200,
                    dadosalbumArtista.album = resultalbumArtista

                    return dadosalbumArtista
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

const buscarArtistaporAlbum = async function(idArtista){
    try {
        if(idArtista == '' || idArtista == undefined || idArtista == null || isNaN(idArtista) || idArtista <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosalbum = {}

            let resultalbum = await albumArtistaDAO.selectArtistaByIdAlbum (parseInt(idArtista))
            
            if(resultalbum != false || typeof(resultalbum) == 'object'){
                if(resultalbum.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosalbum.status = true
                    dadosalbum.status_code = 200
                    dadosalbum.artista = resultalbum

                    return dadosalbum //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirAlbumArtista,
    atualizarAlbumArtista,
    excluirAlbumArtista,
    listarAlbumArtista,
    buscarAlbumArtista,
    buscarArtistaporAlbum
}
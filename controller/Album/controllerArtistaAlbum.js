/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 13/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const albumArtistaDAO = require('../../model/DAO/artitsaAlbum.js')

//Função para inserir uma nova album_artista
const inserirAlbumArtista = async function(album_artista, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            album_artista.id_artista    == '' || album_artista.id_artista    == null || album_artista.id_artista    == undefined || isNaN(album_artista.id_artista)    ||
            album_artista.id_album      == '' || album_artista.id_album      == null || album_artista.id_album      == undefined || isNaN(album_artista.id_album)
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da album_artista para o DAO realizar o insert no Banco de dados
                let resultalbum_artista = await albumArtistaDAO.insertAlbumArtista(album_artista)

                if(resultalbum_artista){
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

//Função para atualizar uma album_artista existente
const atualizarAlbumArtista= async function(id, album_artista, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
                if(
                    album_artista.id_artista    == '' || album_artista.id_artista    == null || album_artista.id_artista    == undefined || isNaN(album_artista.id_artista)    ||
                    album_artista.id_album      == '' || album_artista.id_album      == null || album_artista.id_album      == undefined || isNaN(album_artista.id_album)
                    )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await albumArtistaDAO.selectByIdalbumArtista(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            album_artista.id = id
                            let resultalbum_artista = await albumArtistaDAO.updateAlbumArtista(album_artista)

                            if(resultalbum_artista){
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

//Função para excluir uma album_artista existente
const excluirAlbumArtista = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultalbum_artista = await albumArtistaDAO.selectByIdalbumArtista(id)
        if(resultalbum_artista!= false || typeof(resultalbum_artista)== "object"){
            if(resultalbum_artista.length > 0){
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
const listarAlbumArtista= async function(){
    try {

        //Criando um Objeto JSON
        let dadosalbum_artista = {}

        //Chama a função para retornar as album_artistas do banco de dados
        let resultalbum_artista = await albumArtistaDAO.selectAllalbumArtista()

        if(resultalbum_artista != false){
            if(resultalbum_artista.length > 0){
                //Cria um JSON para colocar o ARRAY de album_artistas
                dadosalbum_artista.status = true
                dadosalbum_artista.status_code = 200,
                dadosalbum_artista.items = resultalbum_artista.length
                dadosalbum_artista.artists = resultalbum_artista
                
                return dadosalbum_artista
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

//Função para buscar uma album_artista pelo ID
const buscarAlbumArtista = async function(numero) {
    try {
        let id = numero

        // Objeto JSON
        let dadosalbum_artista = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultalbum_artista = await albumArtistaDAO.selectByIdalbumArtista(id)

            if(resultalbum_artista != false || typeof(resultalbum_artista) == 'object'){
                if(resultalbum_artista.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosalbum_artista.status = true
                    dadosalbum_artista.status_code = 200
                    dadosalbum_artista = resultalbum_artista
    
                    return dadosalbum_artista
    
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

const buscarAlbumPorArtista = async function(id) {
    try {
        
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            dadosArtista = {}

            let resultArtista = await albumArtistaDAO.selectAlbumByIdArtista
        }
    } catch (error) {
        
    }
}

module.exports = {
    inserirAlbumArtista,
    atualizarAlbumArtista,
    excluirAlbumArtista,
    listarAlbumArtista,
    buscarAlbumArtista
}
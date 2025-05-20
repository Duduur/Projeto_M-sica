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
const albumDAO = require('../../model/DAO/album.js')
const controllerTipoAlbum =  require('../../controller/Tipo Album/controllerTypeAL.js')
const controllerGravadora =  require('../../controller/Gravadora/controllerGravadora.js')
const controllerArtistaAlbum = require('../../controller/Album/controllerAlbumArtista.js')

//Função para inserir uma nova album
const inserirAlbum = async function(album, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            album.nome             == '' || album.nome             == null || album.nome             == undefined || album.nome.length             > 100 ||
            album.data_lancamento  == '' || album.data_lancamento  == null || album.data_lancamento  == undefined || album.data_lancamento.length  > 10  ||
            album.foto_album       == '' || album.foto_album       == null || album.foto_album       == undefined || album.foto_album.length       > 200 ||
            album.id_tipo_album    == '' || album.id_tipo_album    == null || album.id_tipo_album    == undefined || isNaN(album.id_tipo_album)          ||
            album.id_gravadora     == '' || album.id_gravadora     == null || album.id_gravadora     == undefined || isNaN(album.id_gravadora)
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da album para o DAO realizar o insert no Banco de dados
                let resultalbum = await albumDAO.insertAlbum(album)

                if(resultalbum){
                    for(itemArtistaAlbum of album.artista){
                        
                        itemArtistaAlbum.id_album = resultalbum.id

                        let resultArtistaAlbum = await controllerArtistaAlbum.inserirAlbumArtista(itemArtistaAlbum, contentType)

                        if(!resultArtistaAlbum){
                            return message.ERROR_CONTENT_TYPE
                        }
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para atualizar uma album existente
const atualizarAlbum = async function(id, album, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
                album.nome             == '' || album.nome             == null || album.nome             == undefined || album.nome.length             > 100 ||
                album.data_lancamento  == '' || album.data_lancamento  == null || album.data_lancamento  == undefined || album.data_lancamento.length  > 10  ||
                album.foto_album       == '' || album.foto_album       == null || album.foto_album       == undefined || album.foto_album.length       > 200 ||
                album.id_tipo_album    == '' || album.id_tipo_album    == null || album.id_tipo_album    == undefined || isNaN(album.id_tipo_album)          ||
                album.id_gravadora     == '' || album.id_gravadora     == null || album.id_gravadora     == undefined || isNaN(album.id_gravadora)           ||
                id                     == '' || id                     == null || id                     == undefined || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await albumDAO.selectByIdAlbum(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            album.id = id
                            let resultalbum = await albumDAO.updateAlbum(album)

                            if(resultalbum){
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

//Função para excluir uma album existente
const excluirAlbum = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultalbum = await albumDAO.selectByIdAlbum(id)
        if(resultalbum!= false || typeof(resultalbum)== "object"){
            if(resultalbum.length > 0){
                //delete
                let result = await albumDAO.deleteAlbum(id)

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
const listaralbum = async function(){
    try {


        let albumsArray = []
        //Criando um Objeto JSON
        let dadosalbum = {}

        //Chama a função para retornar as albums do banco de dados
        let resultalbum = await albumDAO.selectAllAlbum()

        if(resultalbum != false){
            if(resultalbum.length > 0){
                //Cria um JSON para colocar o ARRAY de albums
                dadosalbum.status = true
                dadosalbum.status_code = 200,
                dadosalbum.items = resultalbum.length
                
                for(const itemAlbum of resultalbum){
                    let dadosAlbum = await controllerTipoAlbum.buscarTipoAlbum(itemAlbum.id_tipo_album)
                    itemAlbum.tipo_album = dadosAlbum.tipo_album
                    delete itemAlbum.id_tipo_album
                    
                    let dadosGravadora = await controllerGravadora.buscarGravadora(itemAlbum.id_gravadora)
                    itemAlbum.gravadora = dadosGravadora.gravadora

                    delete itemAlbum.id_gravadora

                    let dadosArtistAlbum= await controllerArtistaAlbum.buscarAlbumArtista(itemAlbum.id)
                    itemAlbum.artista = dadosArtistAlbum.artista

                    albumsArray.push(itemAlbum)
                }

                dadosalbum.album = albumsArray
                console.log(dadosalbum)
                return dadosalbum

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

//Função para buscar uma album pelo ID
const buscaralbum = async function(numero) {
    try {
        let id = numero

        let albumsArray = []

        // Objeto JSON
        let dadosalbum = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultalbum = await albumDAO.selectByIdAlbum(id)

            if(resultalbum != false || typeof(resultalbum) == 'object'){
                if(resultalbum.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosalbum.status = true
                    dadosalbum.status_code = 200

                    for (const itemAlbum of resultalbum) {
                    
                        let dadosAlbum = await controllerTipoAlbum.buscarPais(itemAlbum)
    
                        itemAlbum.pais = dadosAlbum.pais
    
                        delete itemAlbum.id_gravadora
    
                        albumsArray.push(itemAlbum)
                    }
    
                    dadosalbum.album = albumsArray
    
                    return dadosalbum
    
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
    inserirAlbum,
    atualizarAlbum,
    excluirAlbum,
    listaralbum,
    buscaralbum
}
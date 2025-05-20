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
const artistaDAO = require('../../model/DAO/artista.js')
const controllerPais =  require('../../controller/Pais/controllerPais.js')

//Função para inserir uma nova artista
const inserirArtista = async function(artista, contentType){
    try {

        if(String(contentType).toLocaleLowerCase() == 'application/json' )
         { 
            if(
            artista.nome            == '' || artista.nome            == null || artista.nome            == undefined || artista.nome.length            > 100 ||
            artista.nome_artistico  == '' || artista.nome_artistico  == null || artista.nome_artistico  == undefined || artista.nome_artistico.length  > 100 ||
            artista.data_nascimento == '' || artista.data_nascimento == null || artista.data_nascimento == undefined || artista.data_nascimento.length > 10  ||
            artista.foto            == '' || artista.foto            == null || artista.foto            == undefined || artista.foto                   > 200 ||
            artista.id_pais_origem  == '' || artista.id_pais_origem  == null || artista.id_pais_origem  == undefined || isNaN(artista.id_pais_origem)
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
         }else{
                //encaminhando os dados da artista para o DAO realizar o insert no Banco de dados
                let resultartista = await artistaDAO.insertArtista(artista)

                if(resultartista){
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

//Função para atualizar uma artista existente
const atualizarArtista = async function(id, artista, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json' )
            { 
               if(
                artista.nome            == '' || artista.nome            == null || artista.nome            == undefined || artista.nome.length            > 100 ||
                artista.nome_artistico  == '' || artista.nome_artistico  == null || artista.nome_artistico  == undefined || artista.nome_artistico.length  > 100 ||
                artista.data_nascimento == '' || artista.data_nascimento == null || artista.data_nascimento == undefined || artista.data_nascimento.length > 10  ||
                artista.foto            == '' || artista.foto            == null || artista.foto            == undefined || artista.foto                   > 200 ||
                artista.id_pais_origem  == '' || artista.id_pais_origem  == null || artista.id_pais_origem  == undefined || isNaN(artista.id_pais_origem)        ||
                id                      == '' || id                      == null || id                      == undefined || isNaN(id)
               )
                {
                   return message.ERROR_REQUIRED_FIELDS//status code 400
                }else{
                    //Verificar se o ID existe
                    let result = await artistaDAO.selectByIdArtista(id)
                    
                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update

                            //Adiciona o atributo do ID no JSON com os dados recebidos do corpo da requisição
                            artista.id = id
                            let resultartista = await artistaDAO.updateArtista(artista)

                            if(resultartista){
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

//Função para excluir uma artista existente
const excluirArtista = async function(numero){
   try {

    let id = numero

    if(id == '' || id == null || id == undefined || isNaN(id)){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        
        //Antes de excluir estamos verificando se o id enviado existe 
        let resultartista = await artistaDAO.selectByIdArtista(id)
        if(resultartista!= false || typeof(resultartista)== "object"){
            if(resultartista.length > 0){
                //delete
                let result = await artistaDAO.deleteArtista(id)

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
const listarArtista = async function(){
    try {


        let artistasArray = []
        //Criando um Objeto JSON
        let dadosartista = {}

        //Chama a função para retornar as artistas do banco de dados
        let resultartista = await artistaDAO.selectAllArtista()

        if(resultartista != false){
            if(resultartista.length > 0){
                //Cria um JSON para colocar o ARRAY de artistas
                dadosartista.status = true
                dadosartista.status_code = 200,
                dadosartista.items = resultartista.length
                
                for (const itemArtista of resultartista) {
                    
                    let dadosPAIS = await controllerPais.buscarPais(itemArtista.id_pais_origem)

                    itemArtista.pais = dadosPAIS.pais

                    delete itemArtista.id_pais_origem

                    artistasArray.push(itemArtista)
                }

                dadosartista.artista = artistasArray

                return dadosartista

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

//Função para buscar uma artista pelo ID
const buscarArtista = async function(numero) {
    try {
        let id = numero

        let artistasArray = []

        // Objeto JSON
        let dadosartista = {}

        if ( id == ''|| id == null || id == undefined || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS // status code 400
        }else{
            // Chama a função para retornar as músicas do banco de dados
            let resultartista = await artistaDAO.selectByIdArtista(id)

            if(resultartista != false || typeof(resultartista) == 'object'){
                if(resultartista.length > 0){
                    // Cria um JSON para colocar o Array de músicas 
                    dadosartista.status = true
                    dadosartista.status_code = 200

                    for (const itemArtista of resultartista) {
                    
                        let dadosPAIS = await controllerPais.buscarPais(itemArtista.id_pais_origem)
    
                        itemArtista.pais = dadosPAIS.pais
    
                        delete itemArtista.id_pais_origem
    
                        artistasArray.push(itemArtista)
                    }
    
                    dadosartista.artista = artistasArray
    
                    return dadosartista
    
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
    inserirArtista,
    atualizarArtista,
    excluirArtista,
    listarArtista,
    buscarArtista
}
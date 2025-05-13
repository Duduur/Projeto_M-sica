/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de albumArtistas no Banco de dados
* Data: 06/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do PrismaClient(criar um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova albumArtista
const insertAlbumArtista = async function(albumArtista){
    try{
        let sql  = `insert into tbl_artista_album (
                        id_artista, 
                        id_album, 
                        ) 
                    values ( 
                        '${albumArtista.id_artista}', 
                        '${albumArtista.id_album}'
                       )`
        //Await só vai funcionar se na função estiver com o async
        //Executa um script sql no banco de dados, e aguarda o resultado (retornando um true or false)
        let result  = await prisma.$executeRawUnsafe(sql)

        if(result)
            return  true
        else
            return false//Bug no Banco de dados
        
        }catch(error){
            
            return false//Bug de programação
    }

}
//Função para atualizar uma albumArtista existente
const updateAlbumArtista = async function(albumArtista){
    try {
        let sql = `update tbl_artista_album set id_artista = '${albumArtista.id_artista}',
                                        id_album = '${albumArtista.id_album}',  
                                        where id = ${albumArtista.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir uma albumArtista existente
const deleteAlbumArtista = async function(id){
    try {

        let sql = `delete from tbl_artista_album where id=${id}`

        //
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

        
    } catch (error) {
        return false
    }
}
//Função para retornar todas as albumArtista do banco de dados
const selectAllalbumArtista = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_artista_album order by id desc'

        //Encaminha o script SQL para o Banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result//retorna dados do banco
        else
            return false

    } catch (error) {
        return false
    }
}
//Função para buscar uma albumArtista pelo ID
const selectByIdalbumArtista = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_artista_album where id=${id} `

        // Encaminha o Script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result)
            return result // Retorna os dados do Banco 
        else
            return false

    } catch (error) {
        return false
    }
}
//Função para retornar Album pelo artista
const selectAlbumByIdArtista = async function (IdArtista) {
    try {
        let sql = `select tbl_album.* from tbl_album
                                    inner join tbl_artista_album
                                        on tbl_album.id = tbl_artista_album.id_album
                                    inner join tbl_artista
                                        on tbl_artista.id = tbl_Artista_album.id_artista
                    where tbl_artista_album.id_artista = ${IdArtista}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectArtistaByIdAlbum = async function (idAlbum) {
    try {
        let sql = `select tbl_artista.* from tbl_album
                                    inner join tbl_artista_album
                                        on tbl_album.id = tbl_artista_album.id_album
                                    inner join tbl_artista
                                        on tbl_artista.id = tbl_Artista_album.id_artista
                    where tbl_artista_album.id_album = ${idAlbum}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else 
            return false
    } catch (error) {
        return false
    }
}


module.exports = {
    insertAlbumArtista,
    updateAlbumArtista,
    deleteAlbumArtista,
    selectAllalbumArtista,
    selectByIdalbumArtista,
    selectAlbumByIdArtista,
    selectArtistaByIdAlbum
}
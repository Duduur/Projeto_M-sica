/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de albums no Banco de dados
* Data: 13/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do PrismaClient(criar um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova album
const insertAlbum = async function(album){
    try{
        let sql  = `insert into tbl_album (
                        nome, 
                        data_lancamento, 
                        foto_album, 
                        id_tipo_album, 
                        id_gravadora) 
                    values ( 
                        '${album.nome}', 
                        '${album.data_lancamento}', 
                        '${album.foto_album}', 
                        '${album.id_tipo_album}', 
                        '${album.id_gravadora}')`

        
        
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
//Função para atualizar uma album existente
const updateAlbum = async function(album){
    try {
        let sql = `update tbl_album set nome = '${album.nome}',
                                        data_lancamento = '${album.data_lancamento}', 
                                        foto_album = '${album.foto_album}', 
                                        foto_album = '${album.id_tipo_album}', 
                                        id_pais_origem = '${album.id_gravadora}' 
                                        where id = ${album.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir uma album existente
const deleteAlbum = async function(id){
    try {

        let sql = `delete from tbl_album where id=${id}`

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
//Função para retornar todas as album do banco de dados
const selectAllAlbum = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_album order by id desc'

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
//Função para buscar uma album pelo ID
const selectByIdAlbum = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_album where id=${id} `

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


module.exports = {
    insertAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbum,
    selectByIdAlbum
}

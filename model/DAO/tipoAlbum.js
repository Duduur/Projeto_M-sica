/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de musica no Banco de dados
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do PrismaClient(criar um objeto)
const prisma = new PrismaClient()

//Função para inserir uma tipo de album
const insertTipoAlbum = async function(tipo){
    try{
        let sql  = `insert into tbl_tipo_album (
                    tipo_album 
                    ) 
                    values ( '${tipo.tipo_album}' )`

        
        
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
//Função para atualizar um tipo existente
const updateTipoAlbum = async function(tipo){
    try {
        let sql = `update tbl_tipo_album set tipo_album = '${tipo.tipo_album}'`

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir um tipo de album existente
const deleteTipoAlbum = async function(id){
    try {

        let sql = `delete from tbl_tipo_album where id=${id}`

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
//Função para retornar todas as musica do banco de dados
const selectAllTipoAlbum = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_tipo_album order by id desc'

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
//Função para buscar uma musica pelo ID
const selectByIdTipoAlbum = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_tipo_album where id=${id} `

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
    insertTipoAlbum,
    selectAllTipoAlbum,
    deleteTipoAlbum,
    updateTipoAlbum,
    selectByIdTipoAlbum
}

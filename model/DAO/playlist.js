/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de playlists no Banco de dados
* Data: 06/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do PrismaClient(criar um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova playlist
const insertPlaylist = async function(playlist){
    try{
        let sql  = `insert into tbl_playlist (
                        nome_playlist, 
                        data_criacao, 
                        capa_playlist,  
                        id_usuario) 
                    values ( 
                        '${playlist.nome_playlist}', 
                        '${playlist.data_criacao}', 
                        '${playlist.capa_playlist}',  
                        '${playlist.id_usuario}')`

        
        
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
//Função para atualizar uma playlist existente
const updatePlaylist = async function(playlist){
    try {
        let sql = `update tbl_playlist set nome_playlist = '${playlist.nome_playlist}',
                                        data_criacao = '${playlist.data_criacao}', 
                                        capa_playlist = '${playlist.capa_playlist}',  
                                        id_usuario = '${playlist.id_usuario}' 
                                        where id = ${playlist.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir uma playlist existente
const deletePlaylist = async function(id){
    try {

        let sql = `delete from tbl_playlist where id=${id}`

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
//Função para retornar todas as playlist do banco de dados
const selectAllPlaylist = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_playlist order by id desc'

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
//Função para buscar uma playlist pelo ID
const selectByIdPlaylist = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_playlist where id=${id} `

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
    insertPlaylist,
    updatePlaylist,
    deletePlaylist,
    selectAllPlaylist,
    selectByIdPlaylist
}

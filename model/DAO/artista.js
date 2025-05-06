/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de artistas no Banco de dados
* Data: 06/05/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do PrismaClient(criar um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova artista
const insertArtista = async function(artista){
    try{
        let sql  = `insert into tbl_artista (
                        nome, 
                        nome_artistico, 
                        data_nascimento, 
                        foto, 
                        id_pais_origem) 
                    values ( 
                        '${artista.nome}', 
                        '${artista.nome_artistico}', 
                        '${artista.data_nascimento}', 
                        '${artista.foto}', 
                        '${artista.id_pais_origem}')`

        
        
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
//Função para atualizar uma artista existente
const updateArtista = async function(artista){
    try {
        let sql = `update tbl_artista set nome = '${artista.nome}',
                                        nome_artistico = '${artista.nome_artistico}', 
                                        data_nascimento = '${artista.data_nascimento}', 
                                        foto = '${artista.foto}', 
                                        id_pais_origem = '${artista.d_pais_origem}' 
                                        where id = ${artista.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir uma artista existente
const deleteArtista = async function(id){
    try {

        let sql = `delete from tbl_artista where id=${id}`

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
//Função para retornar todas as artista do banco de dados
const selectAllArtista = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_artista order by id desc'

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
//Função para buscar uma artista pelo ID
const selectByIdArtista = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_Artista where id=${id} `

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
    insertArtista,
    updateArtista,
    deleteArtista,
    selectAllArtista,
    selectByIdArtista
}

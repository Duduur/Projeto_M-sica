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

//Função para inserir uma nova musica
const insertMusica = async function(musica){
    try{
        let sql  = `insert into tbl_musica (
                        nome, 
                        duracao, 
                        data_lancamento, 
                        letra, 
                        link) 
                    values ( 
                        '${musica.nome}', 
                        '${musica.duracao}', 
                        '${musica.data_lancamento}', 
                        '${musica.letra}', 
                        '${musica.link}')`

        
        
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
//Função para atualizar uma musica existente
const updateMusica = async function(musica){
    try {
        let sql = `update tbl_musica set nome = '${musica.nome}',
                                        duracao = '${musica.duracao}', 
                                        data_lancamento = '${musica.data_lancamento}', 
                                        letra = '${musica.letra}', 
                                        link = '${musica.link}' 
                                        where id = ${musica.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir uma musica existente
const deleteMusica = async function(id){
    try {

        let sql = `delete from tbl_musica where id=${id}`

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
const selectAllMusica = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_musica order by id desc'

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
const selectByIdMusica = async function(number){
    try {

        let id = number
        //Script SQL
        let sql = `select * from tbl_musica where id =${id}`
    
        let result = await  prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}

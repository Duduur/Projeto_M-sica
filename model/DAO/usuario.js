/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de usuario no Banco de dados
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do PrismaClient(criar um objeto)
const prisma = new PrismaClient()

//Função para inserir um novo usuario
const insertUsuario = async function(usuario){
    try{
        let sql  = `insert into tbl_usuario (
                        nome, 
                        email, 
                        senha, 
                        data_nascimento
                        ) 
                    values ( 
                        '${usuario.nome}', 
                        '${usuario.email}', 
                        '${usuario.senha}', 
                        '${usuario.data_nascimento}'
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
//Função para atualizar um usuario existente
const updateUsuario = async function(usuario){
    try {
        let sql = `update tbl_usuario set nome = '${usuario.nome}',
                                        email = '${usuario.email}', 
                                        senha = '${usuario.senha}', 
                                        data_nascimento = '${usuario.data_nascimento}' 
                                        where id = ${usuario.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}
//Função para excluir um usuario existente
const deleteUsuario = async function(id){
    try {

        let sql = `delete from tbl_usuario where id=${id}`

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
//Função para retornar todas as usuario do banco de dados
const selectAllUsuario = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_usuario order by id desc'

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
//Função para buscar uma usuario pelo ID
const selectByIdUsuario = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_usuario where id=${id} `

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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}

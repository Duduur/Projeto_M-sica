/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de musica no Banco de dados
* Data: 01/04/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

//Import da biblioteca para realizar as ações do banco 
const {PrismaClient} = require('@prisma/client')


//Classe do PrismaClient(?cria o objeto)
const prisma = new PrismaClient()

//Função para inserir um novo genero
const insertGenero = async function(genero){
    try {
        let sql = `insert into tbl_genero(
                        genero 
                    )
                    values (
                        '${genero.genero}')`


        let result = await prisma.$executeRawUnsafe(sql)

            if (result) 
                return true
            else {
                return false
            }
    } catch (error) {
        return false
    }
}

//Função para atualizar uma genero que já existe
const updateGenero = async function(genero){
    try {
        let sql = `update tbl_genero set genero = '${genero.genero}' where id= ${genero.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir um genero existente
const deleteGenero = async function(id){
    try {

        let sql = `delete from tbl_genero where id=${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para mostrar todas os generos do banco
const selectAllGenero = async function() {
    try {

        //Script SQL
        let sql = 'select * from tbl_genero order by id desc' 

        //Encaminha o script SQL para o Banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
    
        if (result)
            return result// retorna dados do banco 
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdGenero = async function(number){
   try {

        let id = number

        let sql = `select * from tbl_musica where id =${id}`

        let result= await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false 

   } catch (error) {
        return false
   }

}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}

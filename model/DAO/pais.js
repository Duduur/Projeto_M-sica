/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de musica no Banco de dados
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const insertPais = async function(pais){
    try{
        let sql  = `insert into tbl_pais_origem (
                        pais                
                    ) 
                    values ( 
                        '${pais.pais}'
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

const updatePais = async function(pais){
    try {
        let sql = `update tbl_pais_origem set nome = '${pais.pais}' where id = ${pais.id} `

        let  result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}


const deletePais = async function(id){
    try {

        let sql = `delete from tbl_pais_origem where id=${id}`

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

const selectAllPais = async function(){
    try {

        //Script SQL
        let sql = 'select * from tbl_pais_origem order by id desc'

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

const selectByIdPais = async function(number) {
    try {
        // Recebe o ID
        let id = number 
        
        // Script SQL 
        let sql = `select * from tbl_pais_origem where id=${id} `

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
    insertPais,
    updatePais,
    deletePais,
    selectAllPais,
    selectByIdPais
}
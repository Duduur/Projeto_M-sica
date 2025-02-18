/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de musica no Banco de dados
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
const {PrismaClient} = require('@prisma/client')

//Função para inserir uma nova musica
const insertMusica = async function(musica){
    //Instancia da classe do PrismaClient(criar um objeto)
    const prisma = new PrismaClient()

    let sql  = `insert into tbl_musica (
                    nome, 
                    duracao, 
                    data_lancamento, 
                    letra, 
                    link) 
                values ( 
                    ${musica.nome}, 
                    ${musica.duracao}, 
                    ${musica.data_lancamento}, 
                    ${musica.letra}, 
                    ${musica.link})`

    
    
    //Await só vai funcionar se na função estiver com o async
    //Executa um script sql no banco de dados, e aguarda o resultado (retornando um true or false)
    let result  = await prisma.$executeRawUnsafe(sql)

    if(result){
        return  true
    }else{
        return false
    }

}

//Função para atualizar uma musica existente
const updateMusica = async function(){
    
}

//Função para excluir uma musica existente
const deleteMusica = async function(){
    
}


//Função para retornar todas as musica do banco de dados
const selectAllMusica = async function(){
    
}

//Função para buscar uma musica pelo ID
const selectByIdMusica = async function(){
    
}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}
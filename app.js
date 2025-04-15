/********************************************************************************************************************************
* Objetivo: Criar uma API para realizar a integração com o banco de dados
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
* Observações:
*   Para criar a API precisa instalar:
*       express -->       npm install express --save
*       cors -->          npm install cors --save
*       body-parser -->   npm install body-parser --save
*   Para criar a conexão com o Banco de dados precisa intalar:
*       prisma -->         npm install prisma
*       @prisma/client --> npm install @prisma/client
*
*   Após a intalação do prisma e @prisma/client,devemos:
*       npx prisma init     Para inicializar o prisma no projeto
*   Após esse comando você deverá configurar o .env e o schema.prisma, e rodar o comando:
*       npx prisma migrate dev
*********************************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Import das controllers do projeto
const controllerMusicas = require('./controller/Musica/controllerMusica')
const controllerGeneros = require('./controller/Genero/controllerGenero')
const controllerPais = require('./controller/Pais/controllerPais')

//Import das controllers do projeto
const bodyParserJSON = bodyParser.json()

const app = express()

/*-------------------------------ENDEPOINT MUSICA------------------------------------- */
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin','*')
    response.header('Access-Control-Allow-Methods','GET')

    app.use(cors())

    next()
})

//Endpoint para inserir uma musica
app.post('/v1/controle-musicas/musica',cors(), bodyParserJSON, async function (request, response) {
    
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe os dados do body na requisição
    let dadosBody = request.body

    //Chama a função de controller para inserir os dados e aguarda o retorno da função
    let resultMusica =  await controllerMusicas.inserirMusica(dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//Endpoint para retornar todas as musica
app.get('/v1/controle-musicas/musica', cors(), async function (request,response) {
    
    let resultMusica = await controllerMusicas.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)

})
//Endpoint para buscar musica pelo id
app.get('/v1/controle-musicas/musica-id/:id', cors(), async function(request, response){

    let id = request.params.id 

    let resultMusica = await controllerMusicas.buscarMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)

})

//Endepoint para excluit musica
app.delete('/v1/controle-musica/musica/:id', cors(), async function(request, response) {
    
    let IdMusica = request.params.id

    let resultMusica = await controllerMusicas.excluirMusica(IdMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})
//Endpoint para atualizar musica
app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da Musica
    let IdMusica = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body


    //Chama a função e encaminha os argumentos de: ID, body e Content-type
    let resultMusica = await controllerMusicas.atualizarMusica(IdMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

/*------------------------------ENDPOINT- GENERO -------------------------------------- -*/

// End point para inserir um genero
app.post('/v1/controle-musicas/genero', cors(), bodyParserJSON, async function (request, response) {
    
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultGenero = await controllerGeneros.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//Endpoint para retornar todosos generos
app.get('/v1/controle-musicas/genero', cors(), async function (request,response) {
    
    let resultGenero = await controllerGeneros.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)

} )

//Endpoint para buscar genero pelo id
app.get('/v1/controle-musicas/genero/genero-id/:id', cors(), async function (request,response){

    let id = request.params.id

    let resultGenero = await controllerGeneros.buscarGenero(id)
    response.status(resultGenero.status_code)
    response.json(resultGenero)
    
})
//Endpoint para excluir genero 
app.delete('/v1/controle-musica/genero/:id', cors(), async function(request, response) {
    
    let IdGenero = request.params.id

    let resultGenero = await controllerGeneros.excluirGenero(IdGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//Endpoint para atualizar genero
app.put('/v1/controle-musicas/atualizar-genero/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe o ID da música
    let IdGenero = request.params.id

    // Recebe os dados da requisição 
    let dadosBody = request.body

    // Chama a função e encaminha os argumentos: ID, Body e ContentType
    let resultGenero = await controllerGeneros.atualizarGenero(IdGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

/*------------------------------ENDPOINT - PAIS -------------------------------------- -*/

//ENDPOINT para inserir um pais de origem
app.post('/v1/controle-musicas/pais',cors(), bodyParserJSON, async function (request, response) {
    
    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe os dados do body na requisição
    let dadosBody = request.body

    //Chama a função de controller para inserir os dados e aguarda o retorno da função
    let resultPais =  await controllerPais.inserirPais(dadosBody, contentType)

    response.status(resultPais.status_code)
    response.json(resultPais)
})

//Endpoint para retornar todos os paises
app.get('/v1/controle-musicas/pais', cors(), async function (request,response) {
    
    let resultPais = await controllerPais.listarPais()

    response.status(resultPais.status_code)
    response.json(resultPais)

})
//Endpoint para buscar pais pelo id
app.get('/v1/controle-musicas/pais-id/:id', cors(), async function(request, response){

    let id = request.params.id 

    let resultPais = await controllerPais.buscarPais(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)

})

//Endepoint para excluit um pais
app.delete('/v1/controle-musica/musica/:id', cors(), async function(request, response) {
    
    let IdMusica = request.params.id

    let resultMusica = await controllerMusicas.excluirMusica(IdMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})
//Endpoint para atualizar um pais
app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da Musica
    let IdMusica = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body


    //Chama a função e encaminha os argumentos de: ID, body e Content-type
    let resultMusica = await controllerMusicas.atualizarMusica(IdMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})
app.listen(8080, function(){
    console.log(' API aguardando requisições ...')
})
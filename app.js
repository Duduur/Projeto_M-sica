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
const controllerTipo = require('./controller/Tipo Album/controllerTypeAL')
const controllerUsuario = require('.//controller/Usuario/controllerUsuario')
const controllerGravadora = require('.//controller/Gravadora/controllerGravadora')

//Import das controllers do projeto
const bodyParserJSON = bodyParser.json()

const app = express()

/*-------------------------------ENDEPOINT MUSICA------------------------------------- */
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

//Endpoint para inserir uma musica
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe os dados do body na requisição
    let dadosBody = request.body

    //Chama a função de controller para inserir os dados e aguarda o retorno da função
    let resultMusica = await controllerMusicas.inserirMusica(dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//Endpoint para retornar todas as musica
app.get('/v1/controle-musicas/musica', cors(), async function (request, response) {

    let resultMusica = await controllerMusicas.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)

})
//Endpoint para buscar musica pelo id
app.get('/v1/controle-musicas/musica-id/:id', cors(), async function (request, response) {

    let id = request.params.id

    let resultMusica = await controllerMusicas.buscarMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)

})

//Endepoint para excluit musica
app.delete('/v1/controle-musica/musica/:id', cors(), async function (request, response) {

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
app.get('/v1/controle-musicas/genero', cors(), async function (request, response) {

    let resultGenero = await controllerGeneros.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)

})

//Endpoint para buscar genero pelo id
app.get('/v1/controle-musicas/genero/:id', cors(), async function (request, response) {

    let id = request.params.id

    let resultGenero = await controllerGeneros.buscarGenero(id)
    response.status(resultGenero.status_code)
    response.json(resultGenero)

})
//Endpoint para excluir genero 
app.delete('/v1/controle-musica/genero/:id', cors(), async function (request, response) {

    let IdGenero = request.params.id

    let resultGenero = await controllerGeneros.excluirGenero(IdGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//Endpoint para atualizar genero
app.put('/v1/controle-musicas/atualizar-genero/:id', cors(), bodyParserJSON, async function (request, response) {

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
app.post('/v1/controle-musicas/pais', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe os dados do body na requisição
    let dadosBody = request.body

    //Chama a função de controller para inserir os dados e aguarda o retorno da função
    let resultPais = await controllerPais.inserirPais(dadosBody, contentType)

    response.status(resultPais.status_code)
    response.json(resultPais)
})

//Endpoint para retornar todos os paises
app.get('/v1/controle-musicas/pais', cors(), async function (request, response) {

    let resultPais = await controllerPais.listarPais()

    response.status(resultPais.status_code)
    response.json(resultPais)

})
//Endpoint para buscar pais pelo id
app.get('/v1/controle-musicas/pais/:id', cors(), async function (request, response) {

    let id = request.params.id

    let resultPais = await controllerPais.buscarPais(id)

    response.status(resultPais.status_code)
    response.json(resultPais)

})

//Endepoint para excluit um pais
app.delete('/v1/controle-musica/pais/:id', cors(), async function (request, response) {

    let IdPais = request.params.id

    let resultPais = await controllerPais.excluirPais(IdPais)

    response.status(resultPais.status_code)
    response.json(resultPais)
})
//Endpoint para atualizar um pais
app.put('/v1/controle-musicas/pais/:id', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da Musica
    let IdPais = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body


    //Chama a função e encaminha os argumentos de: ID, body e Content-type
    let resultPais = await controllerPais.atualizarPais(IdPais, dadosBody, contentType)

    response.status(resultPais.status_code)
    response.json(resultPais)
})

/*------------------------------ENDPOINT - TIPO ALBUM -------------------------------------- -*/

app.post('/v1/controle-musicas/tipo-album', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe os dados do body na requisição
    let dadosBody = request.body

    //Chama a função de controller para inserir os dados e aguarda o retorno da função
    let resultTipo = await controllerTipo.inserirTipoAlbum(dadosBody, contentType)

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

//Endpoint para retornar todos os paises
app.get('/v1/controle-musicas/tipo-album', cors(), async function (request, response) {

    let resultTipo = await controllerTipo.listarTipoAlbum()

    response.status(resultTipo.status_code)
    response.json(resultTipo)

})
//Endpoint para buscar pais pelo id
app.get('/v1/controle-musicas/tipoalbum/:id', cors(), async function (request, response) {

    let id = request.params.id

    let resultTipo = await controllerTipo.buscarTipoAlbum(id)

    response.status(resultTipo.status_code)
    response.json(resultTipo)

})

//Endepoint para excluit um pais
app.delete('/v1/controle-musica/tipoalbum/:id', cors(), async function (request, response) {

    let IdTipo = request.params.id

    let resultTipo = await controllerTipo.excluirTipoAlbum(IdTipo)

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})
//Endpoint para atualizar um pais
app.put('/v1/controle-musicas/tipoalbum/:id', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da Musica
    let IdTipo = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body


    //Chama a função e encaminha os argumentos de: ID, body e Content-type
    let resultTipo = await controllerTipo.atualizarTipoAlbum(IdTipo, dadosBody, contentType)

    response.status(resultTipo.status_code)
    response.json(resultTipo)
})

/*------------------------------ENDPOINT - USUARIO  -------------------------------------- -*/

//Endpoint para inserir uma musica
app.post('/v1/controle-musicas/usuario', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe os dados do body na requisição
    let dadosBody = request.body

    //Chama a função de controller para inserir os dados e aguarda o retorno da função
    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//Endpoint para retornar todas as musica
app.get('/v1/controle-musicas/usuario', cors(), async function (request, response) {

    let resultUsuario = await controllerUsuario.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)

})
//Endpoint para buscar musica pelo id
app.get('/v1/controle-musicas/usuario/:id', cors(), async function (request, response) {

    let id = request.params.id

    let resultUsuario = await controllerUsuario.buscarUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)

})

//Endepoint para excluit musica
app.delete('/v1/controle-musica/usuario/:id', cors(), async function (request, response) {

    let IdUsuario = request.params.id

    let resultUsuario = await controllerUsuario.excluirUsuario(IdUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})
//Endpoint para atualizar musica
app.put('/v1/controle-musicas/usuario/:id', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da Musica
    let IdUsuario = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body


    //Chama a função e encaminha os argumentos de: ID, body e Content-type
    let resultUsuario = await controllerUsuario.atualizarUsuario(IdUsuario, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

/*------------------------------ENDPOINT - GRAVADORA  -------------------------------------- -*/

//EndPoit para inserir uma Gravadora
app.post('/v1/controle-musicas/gravadora', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe os dados do body na requisição
    let dadosBody = request.body

    //Chama a função de controller para inserir os dados e aguarda o retorno da função
    let resultGravadora = await controllerGravadora.inserirGravadora(dadosBody, contentType)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

//Endpoint para retornar todas as musica
app.get('/v1/controle-musicas/gravadora', cors(), async function (request, response) {

    let resultGravadora = await controllerGravadora.listarGravadora()

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)

})
//Endpoint para buscar musica pelo id
app.get('/v1/controle-musicas/gravadora/:id', cors(), async function (request, response) {

    let id = request.params.id

    let resultGravadora = await controllerGravadora.buscarGravadora(id)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)

})

//Endepoint para excluit musica
app.delete('/v1/controle-musica/gravadora/:id', cors(), async function (request, response) {

    let IdGravadora = request.params.id

    let resultGravadora = await controllerGravadora.excluirGravadora(IdGravadora)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})
//Endpoint para atualizar musica
app.put('/v1/controle-musicas/gravadora/:id', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da Musica
    let IdGravadora = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body


    //Chama a função e encaminha os argumentos de: ID, body e Content-type
    let resultGravadora = await controllerGravadora.atualizarGravadora(IdGravadora, dadosBody, contentType)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

app.listen(8080, function () {
    console.log(' API aguardando requisições ...')
})
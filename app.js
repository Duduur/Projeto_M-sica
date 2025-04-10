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

//Import das controllers do projeto
const bodyParserJSON = bodyParser.json()

const app = express()


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

} )

app.get('/v1/controle-musicas/muscia/:id', cors(), async function (request,response){

    let id = request.params.id

    let resultMusica = await controllerMusicas.buscarMusica(id)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
    
})

app.delete('/v1/controle-musica/musica/:id', cors(), async function(request, response) {
    
    let IdMusica = request.params.id

    let resultMusica = await controllerMusicas.excluirMusica(IdMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

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
/********************************************************************************************************************************
* Objetivo: Arquivo responsavel pela padronizção de mensagens status code
* Data: 18/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

/********************* STATUS CODE DE ERROS ******************************/

const ERROR_REQUIRED_FIELDS = {status : false, status_code: 400,message:"Existem campos de preenchimento obrigatórios ou quantidade de caracteres não foram atendidos"}
const ERROR_INTERNAL_SERVER = { status : false , status_code: 500, message:'Devido a um erro interno no servidor, não foi possivel processar a requisição!!!'}

/********************* STATUS CODE DE SUCESSO ****************************/
const SUCCESS_CREATED_ITEM = {status: true,
                              status_code: 201,
                              message: 'Item criado com sucesso'
}


module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER,
    SUCCESS_CREATED_ITEM
}

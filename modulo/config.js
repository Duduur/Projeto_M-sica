/********************************************************************************************************************************
* Objetivo: Arquivo responsavel pela padronizção de mensagens status code
* Data: 18/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

/********************* STATUS CODE DE ERROS ******************************/

const ERROR_REQUIRED_FIELDS = {status : false, status_code: 400,message:"Existem campos de preenchimento obrigatórios ou quantidade de caracteres não foram atendidos"}
const ERROR_INTERNAL_SERVER_MODEL = { status : false , status_code: 500, message:'Devido a um erro interno no servidor da MODEL, não foi possivel processar a requisição!!!'}
const ERROR_INTERNAL_SERVER_CONTROLLER = { status : false , status_code: 500, message:'Devido a um erro interno no servidor da Controller, não foi possivel processar a requisição!!!'}
const ERROR_CONTENT_TYPE ={ status :  false , status_code: 415, message: "O content-type encaminhado não é suportado pelo servidor. Você deve encaminhar apenas conteúdos no formato JSON"}
const ERROR_NOT_FOUND =  { status :  false , status_code: 404, message: "Não foram encontrados itens de retorno!!!"}
/********************* STATUS CODE DE SUCESSO ****************************/
const SUCCESS_CREATED_ITEM = {status: true,
                              status_code: 201,
                              message: 'Item criado com sucesso'
}


module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCESS_CREATED_ITEM
}

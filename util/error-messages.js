'use strict';

/**
* JSON que contém as mensagens de erro do sistema
* @author: Jair Rillo Junior
*/

var errorMessages = {
    //USERS
    user_nome_obrigatorio               : 'Digite seu Nome Completo',
    user_nome_tamanhoInvalido           : 'Nome deve ter entre 5 e 60 caracteres',
    user_usuario_obrigatorio            : 'Digite seu Nome de Usuário',
    user_usuario_tamanhoInvalido        : 'Nome de Usuário deve ter entre 5 e 20 caracteres',
    user_usuario_existente              : 'Nome de Usuário já cadastrado',
    user_senha_obrigatorio              : 'Digite sua Senha',
    user_senha_tamanhoInvalido          : 'Senha deve ter entre 8 e 20 caracteres',
    user_senha_invalido                 : 'As senhas não conferem',
    user_email_obrigatorio              : 'Digite seu Email',
    user_email_invalido                 : 'Digite um Email válido',
    user_email_existente                : 'Email já cadastrado',
    user_email_nao_existente            : 'Email digitado não foi encontrado',
    user_usuario_nao_existe             : 'Email e Senha inválidos',
    user_codigo_ativacao_obrigatorio    : 'Informe o código de ativação',
    user_codigo_ativacao_nao_existe     : 'Código de Ativação Inválido',
    user_usuario_nao_ativo              : 'Usuário não está ativo',
    user_empresa_obrigatorio            : 'Digite a Empresa que trabalha',
    user_empresa_tamanhoInvalido        : 'Empresa deve ter entre 2 e 60 caracteres',
    user_id_obrigatorio                 : 'Erro - Envie o ID do Usuario',
    user_senha_atual_invalida           : 'Senha Atual não confere. Digite a senha atual novamente',
    user_senha_atual_obrigatorio        : 'Digite sua Senha Atual',

    //ARQUIVOS
    arquivo_tipo_obrigatorio            : 'Selecione o Tipo de Arquivo',
    arquivo_tipo_invalid                : 'Tipo de Arquivo Inválido',
    arquivo_nome_obrigatorio            : 'Digite o Nome do Arquivo',
    arquivo_descricao_obrigatorio       : 'Digite a Descrição do Arquivo',
    arquivo_arquivo_obrigatorio         : 'Selecione o Arquivo PDF',
    arquivo_id_arquivo                  : 'Envie o ID do Arquivo',
    arquivo_nome_arquivo_obrigatorio    : 'Envie o Nome Físico do Arquivo PDF, sem a extensão',

    //RATING
    rating_id_user_obrigatorio              : 'Envie o ID do Usuário',
    rating_id_ratingQuestion_obrigatorio    : 'Envie o ID das Perguntas',
    rating_pergunta1_obrigatorio            : 'Envie a Pergunta 1',
    rating_pergunta2_obrigatorio            : 'Envie a Pergunta 2',
    rating_pergunta3_obrigatorio            : 'Envie a Pergunta 3',

    //Noticia
    noticia_arquivo_obrigatorio       : 'Envie a Imagem do Arquivo em formato Base64',


};


module.exports = errorMessages;

'use strict'

/**
* JSON que contém as mensagens de erro do sistema
* @author: Jair Rillo Junior
*/

var error_messages = {
	//DEFAULTS
	required_field										: 'Campo obrigatório',
	internal_server_error								: 'Houve um problema no sistema. Tente novamente mais tarde',
	validation_error									: 'Houve um erro no processamento. Verifica a mensagem de erro no formulário',
	range_value_5_60									: 'Esse campo deve ter mais que 5 e menos que 60 caracteres',
	range_value_5_20									: 'Esse campo deve ter mais que 5 e menos que 20 caracteres',
	range_value_8_20									: 'Esse campo deve ter mais que 8 e menos que 20 caracteres',
	email_invalid										: 'Email inválido',

	//USERS
	users_login_invalid									: 'Login Inválido',
	users_login_successfuly								: 'Login realizado com sucesso',
	user_recovery_password_successfuly					: 'A senha foi enviada para o seu email',
	users_user_does_not_exist							: '[USERNAME] não encontrado',
	users_password_confirm_and_password_doesnt_match	: 'Campo não confere com o Password digitado',
	users_save_successfuly								: 'Usuário cadastro com sucesso',
	users_username_already_exist						: 'Username já cadastrado',



	users_name_required						: 'Campo [NOME] é obrigatório',
	
	users_username_required					: 'Campo [USERNAME] é obrigatório',
	users_username_range_value				: 'Campo [USERNAME] deve ter mais que 5 e menos que 20 caracteres',
	
	users_password_required					: 'Campo [PASSWORD] é obrigatório',
	users_password_range_value				: 'Campo [PASSWORD] deve ter mais que 8 e menos que 20 caracteres',
	users_password_confirm_password_match	: 'Campo [PASSWORD] e [CONFIRMA PASSWORD] não conferem',
	users_email_required					: 'Campo [EMAIL] é obrigatório',
	users_email_invalid						: 'Campo [EMAIL] inválido',
	
	

}
const INITIAL_STATE = {
    nome: '',
    email: 'bruhhnno@live.com',
    senha: '123456',
    erroCadastro: '',
    erroLogin: '',
    loading_login: 'false',
    loading_cadastro: 'false'
}

export default (state = INITIAL_STATE, action) => {

    console.log("Action");
    console.log(action);

    if (action.type == 'modifica_email')
        return { ...state, email: action.payload };

    if (action.type == 'modifica_senha')
        return { ...state, senha: action.payload };

    if (action.type == 'modifica_nome')
        return { ...state, nome: action.payload };

    if (action.type == 'cadastro_usuario_erro')
        return { ...state, erroCadastro: action.payload, loading_cadastro: 'false' };


    if (action.type == 'cadastro_usuario_sucesso')
        return { ...state, nome: '', senha:'', email:'', erroCadastro:'', loading_cadastro: 'false' };

    if (action.type == 'login_usuario_erro')
        return { ...state, erroLogin: action.payload };

    if (action.type == 'CADASTRO_EM_ANDAMENTO')
        return { ...state, loading_cadastro: 'true' }

    return state;
}
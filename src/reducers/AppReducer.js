const INITIAL_STATE = {
    adiciona_contato_email: 'bruhhnnoo1@gmail.com',
    mensagem: '',
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case 'modifica_adicionar_contato_email': return { ...state, adiciona_contato_email: action.payload }; break;
        case 'modifica_mensagem': return { ...state, mensagem: action.payload }; break;
        case 'envia_mensagem_sucesso': return {...state, mensagem:''}; break;
        default:
            return state;
    }

}
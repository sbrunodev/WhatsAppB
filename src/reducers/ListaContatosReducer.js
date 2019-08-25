const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'lista_contato_usuario': return action.payload; break;
        default: return state;
    }
}
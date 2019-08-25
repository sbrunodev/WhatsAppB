import firebase from 'firebase';
import b64 from 'base-64';

export const modificaEmail = (texto) => {
    return {
        type: 'modifica_email',
        payload: texto // Envio da informação para dentro do reducer
    }
}

export const modificaSenha = (texto) => {
    return {
        type: 'modifica_senha',
        payload: texto // Envio da informação para dentro do reducer
    }
}

export const modificaNome = (texto) => {
    return {
        type: 'modifica_nome',
        payload: texto // Envio da informação para dentro do reducer
    }
}


export const cadastraUsuario = ({ nome, email, senha }) => {

    return dispatch => {

        dispatch({ type: 'CADASTRO_EM_ANDAMENTO' });

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {

                emailB64 = b64.encode(email);

                firebase.database().ref("contatos/" + emailB64).push({ nome: nome })
                    .then(value => cadastroUsuarioSucesso(dispatch));
            })
            .catch(error => cadastroUsuarioErro(error, dispatch))
    }
}



const cadastroUsuarioSucesso = (dispatch) => {
    alert('Conta cadastrada com Sucesso');
    dispatch({ type: 'cadastro_usuario_sucesso' });
}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch({ type: 'cadastro_usuario_erro', payload: erro.message });
}

export const autenticarUsuario = ({ email, senha }) => {

    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => loginUsuarioSucesso(dispatch))
            .catch(erro => loginUsuarioErro(erro, dispatch));
    }



}

const loginUsuarioSucesso = (dispatch) => {
    dispatch({ type: 'login_usuario_sucesso' });
}

const loginUsuarioErro = (erro, dispatch) => {
    dispatch({ type: 'login_usuario_erro', payload: erro.message });
}
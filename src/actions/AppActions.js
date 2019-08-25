import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

export const modificaAdicionaContatoEmail = (Texto) => {
    return {
        type: 'modifica_adicionar_contato_email', payload: Texto
    }
}


export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({ type: "lista_contato_usuario", payload: snapshot.val() })
            })
    }
}

export const modificaMensagem = text => {
    return ({
        type: 'modifica_mensagem',
        payload: text,
    })
}

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {

    // dados do usuario
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

    return dispatch => {

        //conversão para base 64
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(contatoEmail);

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem: mensagem, tipo: 'e' })
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem: mensagem, tipo: 'r' })
                    .then(() => {
                        dispatch({
                            type: 'envia_mensagem_sucesso'
                        });
                    })
            })
            .then(() => { // Armazenar os cabeçalhos de conversa do usuario autenticado
                //.Set verifica se existe e se existir ele sobreescreve
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({ nome: contatoNome, email: contatoEmail })
            })
            .then(() => { // Armazenar os cabeçalhos de conversa do contato

                firebase.database('').ref(`/contatos/${contatoEmailB64}`)
                    .once("value")
                    .then((snapshot) => {

                        const dadosUsuario = _.first(_.values(snapshot.val()));

                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                            .set({ nome: dadosUsuario.nome, email: contatoEmail })

                    })


            })
    }
}

export const conversaUsuarioFetch = contatoEmail => {

    // dados do usuario
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

    //conversão para base 64
    const usuarioEmailB64 = b64.encode(usuarioEmail);
    const contatoEmailB64 = b64.encode(contatoEmail);

    return dispatch => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .on("value", snapshot=>{
                dispatch({
                    type:'lista_conversa_usuario', payload: snapshot.val()
                })
            })
    }
}
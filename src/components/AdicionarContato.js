import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { modificaAdicionaContatoEmail } from '../actions/AppActions';
import b64 from 'base-64';
import firebase from 'firebase';

class AdicionarContato extends Component {

    state = { erro: '' };

    _adicionar() {

        let emailB64 = b64.encode(this.props.adiciona_contato_email);

        firebase.database().ref('/contatos/' + emailB64)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {

                    //Recupera nome
                    var nome = '';
                    snapshot.forEach(function (childSnapshot) { nome = childSnapshot.val().nome; });

                    let email = this.props.adiciona_contato_email;

                    const { currentUser } = firebase.auth();
                    let emailUsuario64 = b64.encode(currentUser.email);

                    firebase.database().ref(`/usuario_contatos/${emailUsuario64}`)
                        .once('value')
                        .then(snapshots => {

                            let Achou = false;

                            snapshots.forEach(function (childSnapshot) {
                                if (!Achou) {
                                    if (childSnapshot.val().email == email) {
                                        Achou = true;
                                    }
                                }
                            });

                            if (Achou)
                                alert('Esse email já está cadastrado');
                            else {
                                firebase.database().ref(`usuario_contatos/${emailUsuario64}`)
                                    .push({ email: email, nome: nome })
                                    .then(() => { alert('Sucesso'); this.props.adiciona_contato_email = "" })
                                    .catch(() => alert('Erro ao salvar Contato'));
                            }

                        })


                }
                else {
                    alert('Esse e-mail não está cadastrado ');
                    this.setstate({ erro: 'Esse e-mail não está cadastrado :/' });
                }
            })

    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white' }}>

                <View style={{ flex: 2, justifyContent: 'center' }}>

                    <Text style={{ fontSize: 20, color: 'black' }}>Email</Text>

                    <TextInput placeholder="E-mail"
                        value={this.props.adiciona_contato_email}
                        style={{ fontSize: 20, height: 45, backgroundColor: "#fff", borderColor: 'black', borderWidth: '1', marginBottom: 10, borderWidth: 1 }}
                        onChangeText={(texto) => this.props.modificaAdicionaContatoEmail(texto)} />

                    <Text style={{ fontSize: 25, color: '#fff' }}>
                        {this.state.erro}
                    </Text>
                </View>


                <View style={{ flex: 1 }}>
                    <Button title="Adicionar" color="#115E54" onPress={() => this._adicionar()} />
                </View>

            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        adiciona_contato_email: state.AppReducer.adiciona_contato_email,
    }
);

export default connect(mapStateToProps, { modificaAdicionaContatoEmail })(AdicionarContato);

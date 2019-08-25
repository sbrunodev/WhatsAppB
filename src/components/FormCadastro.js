import React, { Component } from 'react';
import { View, TextInput, Text, Button, ImageBackground, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario } from '../actions/AutenticacaoActions';
import firebase from 'firebase';

class formCadastro extends Component {

    static navigationOptions = { title: 'Criar Conta', }

    constructor(props){
        super(props);
    }

    _cadadstraUsuario() {

        const { nome, email, senha } = this.props;        
        this.props.cadastraUsuario({ nome, email, senha });
        
    }

    renderBtnAcessar() {
        
        if (this.props.loading_cadastro === 'true')
            return (<ActivityIndicator size="large" color='#fff' />);
        else
            return (<Button title="Cadastrar" color="#115E54" onPress={() => { this._cadadstraUsuario() }} />);

    }

    render() {
        return (
            <ImageBackground style={{ flex: 1 }} source={require('../imgs/bg.png')}>
                <View style={{ flex: 1, padding: 10 }}>

                    <View style={{ flex: 4, justifyContent: 'center' }}>

                        <Text style={{ fontSize: 20, color: 'white' }}>Nome</Text>

                        <TextInput value={this.props.nome}
                            onChangeText={texto => this.props.modificaNome(texto)}
                            placeholder="Nome"
                            style={{ fontSize: 20, height: 45, backgroundColor: "#fff", marginBottom: 10, borderWidth: 2, borderColor: '#FAFAFA' }}
                        />

                        <Text style={{ fontSize: 20, color: 'white' }}>Email</Text>

                        <TextInput value={this.props.email}
                            onChangeText={texto => this.props.modificaEmail(texto)}
                            placeholder="Email"
                            style={{ fontSize: 20, height: 45, backgroundColor: "#fff", marginBottom: 10, borderWidth: 2, borderColor: '#FAFAFA' }}
                        />

                        <Text style={{ fontSize: 20, color: 'white' }}>Senha</Text>
                        <TextInput value={this.props.senha}
                            secureTextEntry
                            onChangeText={texto => this.props.modificaSenha(texto)}
                            placeholder="Senha"
                            style={{ fontSize: 20, height: 45, backgroundColor: "#fff", marginBottom: 10, borderWidth: 2, borderColor: '#FAFAFA' }}
                        />

                        <Text style={{ fontSize: 18, color: 'red', marginTop: 15 }} >{this.props.erroCadastro}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        {this.renderBtnAcessar()}
                    </View>

                </View>
            </ImageBackground>
        );
    }


}

const mapStateToProps = state => (
    {
        
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loading_cadastro: state.AutenticacaoReducer.loading_cadastro
    }
);

export default connect(mapStateToProps, { modificaEmail, modificaSenha, modificaNome, cadastraUsuario })(formCadastro);

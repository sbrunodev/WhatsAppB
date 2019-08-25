import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableHighlight, ImageBackground, ActivityIndicator, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';
import firebase from 'firebase';

class formLogin extends Component {

    static navigationOptions = { header: null }

    _autenticarUsuario() {
        this.autenticarUsuario();
    }

    constructor(props) {
        super(props);
        this.state = { loading_login: false };
    }

    autenticarUsuario() {

        this.setState({ loading_login: true });

        firebase.auth().signInWithEmailAndPassword(this.props.email, this.props.senha)
            .then(value => { this.setState({ loading_login: false }); this.props.navigation.navigate('FormPrincipalScreen') })
            .catch(erro => { this.setState({ loading_login: false }); alert(erro); this.props.erroLogin = erro });
    }

    renderBtnAcessar() {
        if (this.state.loading_login)
            return (<ActivityIndicator size="large" color = '#fff' />);
        else
            return (<Button title="Entrar" color="#115E54" onPress={() => this._autenticarUsuario()} />);
    }

    render() {
        return (
            <ImageBackground style={{ flex: 1 }} source={require('../imgs/bg.png')}>

                <View style={{ flex: 1, padding: 10 }}>
                    <StatusBar backgroundColor='#114D44' />
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 50, color: '#fff' }}>
                            WhatsApp
                        </Text>
                    </View>

                    <View style={{ flex: 5 }}>

                        <Text style={{ fontSize: 20, color: 'white' }}>Email</Text>

                        <TextInput value={this.props.email}
                            onChangeText={texto => this.props.modificaEmail(texto)}
                            style={{ fontSize: 20, height: 45, backgroundColor: "#fff", marginBottom: 10, borderWidth: 2, borderColor: '#FAFAFA' }}
                            placeholder="E-mail"
                            underlineColorAndroid='transparent'
                        />

                        <Text style={{ fontSize: 20, color: 'white' }}>Senha</Text>

                        <TextInput value={this.props.senha}
                            secureTextEntry
                            onChangeText={texto => this.props.modificaSenha(texto)}
                            style={{ fontSize: 20, height: 45, backgroundColor: "#fff", borderWidth: 2, borderColor: '#FAFAFA' }}
                            placeholder="Senha"
                            underlineColorAndroid='transparent'
                        />

                        <Text style={{ fontSize: 18, color: 'red', marginTop: 15 }} >{this.props.erroLogin}</Text>

                        <TouchableHighlight onPress={() => this.props.navigation.navigate('FormCadastroScreen')}>
                            <Text style={{ fontSize: 18, marginTop: 15, color: '#fff' }}>Ainda não tem uma conta? Cadastre-se</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={{ flex: 2 }}>
                        {this.renderBtnAcessar()}
                    </View>

                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
    }
);

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);

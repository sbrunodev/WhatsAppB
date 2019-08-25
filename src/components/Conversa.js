import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, TextInput, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash';

class Conversa extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    });


    componentWillMount() {
        const contato = this.props.navigation.getParam('contato');
        this.props.conversaUsuarioFetch(contato.email);
        this.criaFonteDeDados(this.props.conversa);
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.conversa);


    }

    _enviarMensagem() {

        const contato = this.props.navigation.getParam('contato');
        const mensagem = this.props.mensagem;
        const contatoNome = contato.nome;
        const contatoEmail = contato.email;


        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);

        this.props.mensagem = "";

    }

    criaFonteDeDados(conversa) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(conversa);


    }

    renderRow(texto) {

        if (texto.tipo === 'e')
            return (
                <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40 }}>
                    <Text style={{ fontSize: 18, color: 'black', padding: 10, backgroundColor: "#dbf5d4", elevation: 1 }}>
                        {texto.mensagem}
                    </Text>
                </View>
            );

        if (texto.tipo === 'r')
            return (
                <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40 }}>
                    <Text style={{ fontSize: 18, color: 'black', padding: 10, backgroundColor: "#f7f7f7", elevation: 1 }}>
                        {texto.mensagem}
                    </Text>
                </View>
            );
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: "#eee4dc", padding: 10 }} >
                <View style={{ flex: 1, paddingBottom: 20 }}>

                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />

                </View>

                <View style={{ flexDirection: "row", height: 60 }}>

                    <TextInput
                        value={this.props.mensagem}
                        onChangeText={text => this.props.modificaMensagem(text)}
                        style={styles.TextInputStyleClass}
                        placeholder="Digite aqui..."
                        underlineColorAndroid='transparent'
                        multiline
                    />

                    <TouchableHighlight onPress={this._enviarMensagem.bind(this)} underlayColor="#fff" >
                        <Image source={require("../imgs/enviar_mensagem.png")} />
                    </TouchableHighlight>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    TextInputStyleClass: {
        borderWidth: 1,
        borderColor: '#BBBBBB',
        borderRadius: 20,
        backgroundColor: "#fff", 
        fontSize: 18, 
        maxHeight: 50, 
        flex: 4
    }

});

mapStateToPros = state => {
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return { ...val, uid };
    });

    return ({
        conversa: conversa,
        mensagem: state.AppReducer.mensagem
    });
}

export default connect(mapStateToPros, { modificaMensagem, enviarMensagem, conversaUsuarioFetch })(Conversa)


import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash'
import { contatosUsuarioFetch } from '../actions/AppActions';


class ContatosScreen extends Component {

    componentWillMount() {

        this.props.contatosUsuarioFetch();
        this.criaFonteDeDados(this.props.contatos)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.contatos)
    }

    criaFonteDeDados(contatos) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.fonteDeDados = ds.cloneWithRows(contatos)
    }

    abreConversa(contato) {
        //alert(contato.uid + " " + contato.nome);
        this.props.navigation.navigate('ConversaScreen', {
            title: contato.nome,
            contato: contato,
        });

    }

    renderRow(contato) {

        console.log("Screen B");
        console.log(this.props.navigation);

        return (
            <TouchableHighlight onPress={() => this.abreConversa(contato)} underlayColor="#eee4dc">
                <View style={{ flex: 1, padding: 15, borderBottomWidth: 1, borderColor: "#CCC" }}>
                    <Text style={{ fontSize: 20 }}>{contato.nome}</Text>
                    <Text style={{ fontSize: 15 }}>{contato.email}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    abreAddContato() {
        this.props.navigation.navigate('AdicionarContatoScreen')
        
    }

    render() {
        console.log("Renderizou a lista de Contatos");
        return (
            <View style={{ flex: 1 }}>

                <ListView
                    backgroundColor="#fff"      
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={data => this.renderRow(data)}
                />

                <TouchableOpacity activeOpacity={0.5} style={Styles.TouchableOpacityStyle} onPress={() => this.abreAddContato()} >
                    <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
                        style={Styles.FloatingButtonStyle} />
                </TouchableOpacity>

            </View>
        );
    }
}


const Styles = StyleSheet.create({

    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },

    FloatingButtonStyle: {

        resizeMode: 'contain',
        width: 50,
        height: 50,
    }
});

mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid }
    })

    return { contatos }
}

export default connect(mapStateToProps, { contatosUsuarioFetch })(ContatosScreen);

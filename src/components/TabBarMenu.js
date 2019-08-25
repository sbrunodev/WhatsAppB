import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight } from 'react-native';

export default props => (
    <View style={{ backgroundColor: "#115E54" }}>

        <StatusBar backgroundColor='#114D44' />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={{ color: "#fff", fontSize: 20, marginLeft: 20 }}>Whatsapp Clone</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>

                <View style={{ justifyContent: 'center', width: 50 }}>
                    <TouchableHighlight onPress={() => props.navigation.navigate('FormCadastroScreen')}>
                        <Image source={require('../imgs/adicionar-contato.png')} />
                    </TouchableHighlight>
                </View>

                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, color: '#fff' }}> Sair </Text>
                </View>
            </View>
        </View>
    </View >
);
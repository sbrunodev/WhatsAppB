import React, { Component } from 'react';
import { Text, View, Button, StatusBar, Image, TouchableHighlight, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';

// Tab
import ConversasScreen from './Conversas';
import ContatosScreen from './Contatos';


const Tab = createMaterialTopTabNavigator(
  {
    Conversas: ConversasScreen,
    Contatos: ContatosScreen,
  },
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      labelStyle: {
        fontSize: 14,
      },
      style: {
        backgroundColor: '#115E54',
      },
      indicatorStyle: {
        backgroundColor: 'white',
      },
    }
  });
// Tab


export default class Principal extends Component {

  _sair() {
    Alert.alert(
      'Sair',
      'Deseja realmente sair?',
      [

        { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Sim', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#115E54" }}>

          <StatusBar backgroundColor='#114D44' />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            
            <View style={{ height: 50, justifyContent: 'center' }}>
              <Text style={{ color: "#fff", fontSize: 20, marginLeft: 20 }}>Whatsapp Clone</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', width: 50 }}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('AdicionarContatoScreen')}>
                  <Image source={require('../imgs/adicionar-contato.png')} />
                </TouchableHighlight>
              </View>

              <View style={{ justifyContent: 'center' }}>
                <TouchableHighlight onPress={() => this._sair()}>
                  <Text style={{ fontSize: 20, color: '#fff' }}> Sair </Text>
                </TouchableHighlight>
              </View>
            </View>

          </View>

        </View>


        <Tab />
      </View>
    );
  }

}

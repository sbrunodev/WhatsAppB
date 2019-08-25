import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Button, TouchableHighlight, Image, Text, View, Alert } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import firebase from 'firebase';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';


// Rotas
import FormLogin from "./src/components/FormLogin";
import FormCadastro from "./src/components/FormCadastro";
import FormBoasVindas from "./src/components/BoasVindas";
import FormPrincipal from "./src/components/Principal";
import FormAdicionarContato from "./src/components/AdicionarContato";
import Conversa from "./src/components/Conversa";
// Tab
import ConversasScreen from './src/components/Conversas';
import ContatosScreen from './src/components/Contatos';

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

const AppNavigator = createStackNavigator({

  FormLoginScreen: { screen: FormLogin },

  FormCadastroScreen: {
    screen: FormCadastro, navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#115E54',
      },
      headerTintColor: '#fff',
    })
  },

  FormBoasVindasScreen: { screen: FormBoasVindas },

  FormPrincipalScreen: {
    screen: Tab, navigationOptions: ({ navigation }) => ({
      title: 'WhatsApp',
      headerLeft: null,
      headerRight: (
        <View style={{ flexDirection: 'row' }}>

          <View style={{ justifyContent: 'center', width: 50 }}>
            <TouchableHighlight onPress={() => navigation.navigate('AdicionarContatoScreen')} style={{ marginRight: 15 }}>
              <Image source={require('./src/imgs/adicionar-contato.png')} />
            </TouchableHighlight>
          </View>

          <TouchableHighlight onPress={() => {
            Alert.alert(
              'Sair',
              'Deseja realmente sair?',
              [              
                { text: 'Não', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Sim', onPress: () => navigation.goBack(null) },
              ],
              { cancelable: false }
            )
          }}
            style={{ marginRight: 15 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Sair</Text>
          </TouchableHighlight>


        </View>

      ),

      headerStyle: {
        backgroundColor: '#115E54',
        elevation: 0,
        shadowOpacity: 0

      },

      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  },




  AdicionarContatoScreen: {
    screen: FormAdicionarContato, navigationOptions: () => ({
      title: "Adicionar Contato",
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#115E54',
      },
    }),
  },

  ConversaScreen: {
    screen: Conversa,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#115E54',

      },
      headerTintColor: '#fff',
    })
  },

});

//


type Props = {};
export default class App extends Component<Props> {

  componentWillMount() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBcynlFavjHzjsF0MP3xHahjtovy3SmTKs",
      authDomain: "whatsappb-ee6de.firebaseapp.com",
      databaseURL: "https://whatsappb-ee6de.firebaseio.com",
      projectId: "whatsappb-ee6de",
      storageBucket: "whatsappb-ee6de.appspot.com",
      messagingSenderId: "647100494905"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <AppNavigator />
      </Provider>
    );
  }
}


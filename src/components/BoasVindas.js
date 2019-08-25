import React from 'react';
import { View, Text, Button, Image, ImageBackground } from 'react-native';

export default props => (
    <ImageBackground style={{ flex: 1 }} source={require('../imgs/bg.png')}>
    <View style={{ flex: 1, padding: 10 }}>

        <View style={{ flex: 2, padding: 10, justifyContent:'center', alignItems:'center' }}>
            <Text style={{color:'#fff', fontSize:20}}>Seja Bem Vindo</Text>
            <Image source={require('../imgs/logo.png')} />
        </View>

        <View style={{ flex: 1, padding: 10 }}>
        <Button title="Fazer Login" onPress={()=>false} />
        </View>

    </View>
    </ImageBackground>
);
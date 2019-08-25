import { createStackNavigator } from 'react-navigation';

import FormLogin from "./src/components/FormLogin";
import FormCadastro from "./src/components/FormCadastro";
import FormBoasVindas from "./src/components/BoasVindas";

const AppNavigator = createStackNavigator({
  FormLoginScreen: { screen: FormLogin },
  FormCadastroScreen: { screen: FormCadastro },  
  FormBoasVindasScreen: { screen: FormBoasVindas }, 
});

export default AppNavigator
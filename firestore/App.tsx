import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ManterCachorro from './screens/ManterCachorro';
import ManterOvelha from './screens/ManterOvelha';
import ListarOvelha from './screens/ListarOvelha';
import ListarCachorro from './screens/ListarCachorro';



function ManterCachorroScreen({ navigation }) {
  return (
   <ManterCachorro></ManterCachorro>
  );
}

function ManterOvelhaScreen({ navigation }) {
  return (
   <ManterOvelha></ManterOvelha>
  );
}

function ListarOvelhaScreen({ navigation }) {
  return (
   <ListarOvelha></ListarOvelha>
  );
}

function ListarCachorroScreen({ navigation }) {
  return (
   <ListarCachorro></ListarCachorro>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Adicionar Ovelha" component={ManterOvelhaScreen} />
        <Drawer.Screen name="Adicionar Cachorro" component={ManterCachorroScreen} />
        <Drawer.Screen name="Listar Ovelhas" component={ListarOvelhaScreen} />
        <Drawer.Screen name="Listar Cachorros" component={ListarCachorroScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
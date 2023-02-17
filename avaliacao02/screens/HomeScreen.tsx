import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import Profile from "./Profile";
import ListarUsuarios from "./ListarUsuarios";
import ManterSerie from "./ManterSerie";
import ListarSerie from "./ListarSerie";


const Drawer = createDrawerNavigator();


function ProfileScreen({ navigation }) {
  return <Profile></Profile>;
}
function ListarUsuariosScreen({ navigation }) {
  return <ListarUsuarios></ListarUsuarios>;
}

function ManterSerieScreen({navigation}){
  return <ManterSerie></ManterSerie>;
}

function ListarSeriesScreen({ navigation }) {
  return <ListarSerie></ListarSerie>;
}

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="ListarUsuarios" component={ListarSeriesScreen} />
      <Drawer.Screen name="Manter Serie" component={ManterSerieScreen} />
      <Drawer.Screen name="Listar Series" component={ListarSeriesScreen} />
    </Drawer.Navigator>
  );
};
export default HomeScreen;



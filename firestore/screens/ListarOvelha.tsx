import React, { useState, useEffect } from "react";
import {ActivityIndicator,SafeAreaView,View,FlatList,Text,StatusBar,} from "react-native";
import { auth, firestore } from "../firebase";
import MeuEstilo from "../meuestilo";
import { Ovelha } from "../model/Ovelha";
const ListarOvelhas = () => {
const [loading, setLoading] = useState(true); // Set loading to true
const [ovelhas, setOvelhas] = useState<Ovelha[]>([]); // Initial empty array
const ovelhaRef = firestore.collection('Ovelha');

useEffect(() => {
    const subscriber = ovelhaRef
        .onSnapshot((querySnapshot) => {
        const ovelhas = [];
        querySnapshot.forEach((documentSnapshot) => {
          ovelhas.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
        });
      });
        setOvelhas(ovelhas);
        setLoading(false);
  });
return () => subscriber();
}, [ovelhas]);


  if (loading) {
  return <ActivityIndicator />;
  }


const Item = ({ item }) => (
  <View style={MeuEstilo.item}>
    <Text style={MeuEstilo.title}>Nome : {item.nome}</Text>
    <Text style={MeuEstilo.title}>Raça : {item.raca}</Text>  
    <Text style={MeuEstilo.title}>Sexo : {item.sexo}</Text>  
    <Text style={MeuEstilo.title}>DataNascimento : {item.datanascimento}</Text>  
    <Text style={MeuEstilo.title}>Dono : {item.dono}</Text> 
  </View>
);

const renderItem = ({ item }) => <Item item={item} />;

return (
  <SafeAreaView style={MeuEstilo.containerlistar}>
    <FlatList
      data={ovelhas}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  </SafeAreaView>
  );
};
export default ListarOvelhas;
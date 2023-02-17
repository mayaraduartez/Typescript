import React, { useState, useEffect } from "react";
import {ActivityIndicator,SafeAreaView,View,FlatList,Text,StatusBar,} from "react-native";
import { auth, firestore } from "../firebase";
import MeuEstilo from "../meuestilo";
import { Serie } from "../model/Serie";
const ListarSerie = () => {
const [loading, setLoading] = useState(true); // Set loading to true
const [series, setSerie] = useState<Serie[]>([]); // Initial empty array
const serieRef = firestore.collection('Usuario').doc(auth.currentUser?.uid).collection('Series');

useEffect(() => {
    const subscriber = serieRef
        .onSnapshot((querySnapshot) => {
        const series = [];
        querySnapshot.forEach((documentSnapshot) => {
          series.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
        });
      });
        setSerie(series);
        setLoading(false);
  });
return () => subscriber();
}, [series]);


  if (loading) {
  return <ActivityIndicator />;
  }


const Item = ({ item }) => (
  <View style={MeuEstilo.item}>
    <Text style={MeuEstilo.titulo}>Titulo: {item.titulo}</Text>
    <Text style={MeuEstilo.genero}>Genero: {item.genero}</Text>  
    <Text style={MeuEstilo.temporadas}>Temporadas: {item.temporadas}</Text>  
    <Text style={MeuEstilo.ano}>Ano: {item.ano}</Text>  
    <Text style={MeuEstilo.classificacao}>Classificação: {item.classificacao}</Text>
  </View>
);

const renderItem = ({ item }) => <Item item={item} />;

return (
  <SafeAreaView style={MeuEstilo.containerlistar}>
    <FlatList
      data={series}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  </SafeAreaView>
  );
};
export default ListarSerie;
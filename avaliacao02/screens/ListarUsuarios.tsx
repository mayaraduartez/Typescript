import React, { useState, useEffect } from "react";
import { ActivityIndicator, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable, Image } from "react-native";
import { auth, firestore, storage } from "../firebase";
import { Usuario } from "../model/Usuario";
import estiloAuthentication from "../estiloAuthentication";

const ListarUsuarios = () => {
  const [loading, setLoading] = useState(true);

  const [usuarios, setUsuarios] = useState<Partial<Usuario>[]>([{}])

  const usuariosFirebaseRef = firestore.collection('Usuario');


  useEffect(() => {
    const subscriber = usuariosFirebaseRef
      .onSnapshot((querySnapshot) => {
        let auxiliar = [];
        const usuarios = [];
        querySnapshot.forEach(async (documentSnapshot) => {
          usuarios.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });

        });
        setUsuarios(usuarios);
        setLoading(false);
      });
    return () => subscriber();
  }, []);


  if (loading) {
    return <ActivityIndicator />;
  }

  const LongClick = (item) => {
    alert('voce pressionou longo e ' + item.nome);
  }

  const ShortClick = (item) => {
    alert('voce pressionou curto e ' + item.nome);
  }


  const renderItem = ({ item }) => {
    return <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* <View style={estiloAuthentication.item} key={item.id}> */}
      <Pressable
        style={({ pressed }) => [{ backgroundColor: pressed ? '#f1f1f1' : 'transparent' }, estiloAuthentication.title]}
        onLongPress={() => { LongClick(item) }}
        onPress={() => { ShortClick(item) }}
      >


        <View style={estiloAuthentication.alinhamentoLinha}>
          <Image style={{ height: 70, width: 70, borderRadius: 50 }} source={{ uri: item.urlfoto }} />
          <View style={estiloAuthentication.alinhamentoColuna}>
            <Text style={estiloAuthentication.itemStylefirebase}>Nome: {item.nome}</Text>
            <Text style={estiloAuthentication.itemStylefirebase}> Email: {item.email}</Text>
            {/* <Image style={{height:50,width:50}} source={{uri: item.urlfoto}} /> */}
            {/* fecha alinhamento colunas */}
          </View>
          {/* fecha alinhamento linhas */}
        </View>
      </Pressable>
    </View>
  }

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={estiloAuthentication.separador} />
    );
  };
  return (
    <SafeAreaView style={estiloAuthentication.containerlistar}>
      <View style={estiloAuthentication.containerflat}>
        <FlatList
          data={usuarios}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListarUsuarios;

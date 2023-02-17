import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { ActivityIndicator, View, Text, StyleSheet, Image, Button, Pressable, AlertButton, Alert } from "react-native";
import { storage, auth, firestore } from "../firebase";
import { uploadBytes } from "firebase/storage"; //access the storage databaSse
import * as ImagePicker from "expo-image-picker";
import { Usuario } from "../model/Usuario";
import estiloAuthentication from "../estiloAuthentication";
const Profile = () => {
  const navigation = useNavigation();
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [usuario, setUsuario] = useState<Partial<Usuario>>({})
  // const [usuarios, setUsuarios] = useState<Partial<Usuario>[]>([{}])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore
      .collection('Usuario')
      .doc(auth.currentUser.uid)
      .onSnapshot(documentSnapshot => {
        setUsuario(documentSnapshot.data());
        if (usuario.urlfoto == null) {
          setPickedImagePath("")
        } else {
          setPickedImagePath(usuario.urlfoto)
        }
        setLoading(false)
      });
    return () => subscriber();
  }, [usuario]);

  if (loading) {
    return <ActivityIndicator />;
  }


  const escolhefoto = () => {
    Alert.alert(
      "Imagem do Profile",
      "Escolha uma Opção",
      [
        {
          text: "Camera",
          onPress: () => openCamera(),
          style: "default",
        },

        {
          text: "Abrir galeria",
          onPress: () => showImagePicker(),
          style: "cancel",
        },

      ],
      {
        cancelable: true,
        onDismiss: () => { }
      }
    );
  }

  const enviarImagem = async (result) => {
    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      const uploadUri = result.assets[0].uri;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      // criando uma referencia com nome e extenssão
      const ref = storage.ref(`imagens/profile/${auth.currentUser.uid}/${auth.currentUser.uid}.${extension}`);
      //const ref = storage.ref(`imagens/profile/${auth.currentUser.uid}/${name}.${extension}`);

      // enviando imagem
      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();
      const fbResult = await uploadBytes(ref, bytes);

      const paraDonwload = await storage.ref(fbResult.metadata.fullPath).getDownloadURL()

      const reference = firestore.collection("Usuario").doc(auth.currentUser.uid);
      //reference.update({ urlfoto: fbResult.metadata.fullPath, });
      reference.update({ urlfoto: paraDonwload, nomeFoto: name + '.' + extension });
    } else {
      alert('Upload Cancelado')
    }
  }

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Sem permissão para acessar galeria de fotos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    enviarImagem(result);

  };


  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Sem permissão para acessar a camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    enviarImagem(result);
  };


const logOut = () => {auth.signOut().then(() => {navigation.replace("Login")})
.catch(error => alert(error.message))
}

const forgotPassword = (email) => {
  auth.sendPasswordResetEmail(email)
    .then(function (user) {
      alert('Por favor verifique seu email...')
    }).catch(function (e) {
      console.log(e)
    })
}

  return (
    <View style={estiloAuthentication.screen}>
      <View style={estiloAuthentication.buttonContainer}>
      </View>
      <Pressable onPress={() => escolhefoto()}>
        <View style={estiloAuthentication.imageContainer}>
          {pickedImagePath !== "" && (
            <Image source={{ uri: pickedImagePath }} style={estiloAuthentication.image} />
          )}
          {pickedImagePath === "" && (
            <Image source={require("../assets/camera.png")}
              style={estiloAuthentication.image} />
          )}
        </View>
      </Pressable>
      <Text style={{ marginTop: 5, }}>Id:{usuario.id}</Text>
      <Text style={{ marginTop: 10, }}>Nome:{usuario.nome}</Text>
      <Text style={{ marginTop: 10, }}>E-mail:{usuario.email}</Text>
      
      <Pressable 
      onPress={logOut}
      style={(estiloAuthentication.button, estiloAuthentication.buttonOutline)}>
        <Text style={estiloAuthentication.buttonOutlineText}>
            Log Out
        </Text>
    </Pressable>

    <Pressable 
      onPress={forgotPassword}
      style={(estiloAuthentication.button, estiloAuthentication.buttonOutline)}>
        <Text style={estiloAuthentication.buttonOutlineText}>
            Mudar Senha
        </Text>
    </Pressable>

      
    </View>
  );
}



export default Profile;
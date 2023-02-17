import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, firestore } from "../firebase";
import { Usuario } from '../model/Usuario'
import estiloAuthentication from "../estiloAuthentication";
const Registro = () => {
  const [formUsuario, setFormusuario] = useState<Partial<Usuario>>({})
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const cancelar = () => {
    navigation.replace("Login");
  };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(formUsuario.email, formUsuario.senha)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const reference = firestore
          .collection("Usuario")
          .doc(auth.currentUser.uid);
        reference.set({
          id: auth.currentUser.uid,
          email: formUsuario.email,
          // senha: senha,
          nome: formUsuario.nome,
        });
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={estiloAuthentication.container} behavior="padding">
      <View style={estiloAuthentication.inputContainer}>
        <TextInput
          placeholder="Usuario"
          value={formUsuario.nome}
          onChangeText={(text) => setFormusuario({ ...formUsuario, nome: text })}
          style={estiloAuthentication.input}
        />
        <TextInput
          placeholder="Email"
          value={formUsuario.email}
          onChangeText={(text) => setFormusuario({ ...formUsuario, email: text })}
          style={estiloAuthentication.input}
        />
        <TextInput
          placeholder="Senha"
          value={formUsuario.senha}
          onChangeText={(text) => setFormusuario({ ...formUsuario, senha: text })}
          style={estiloAuthentication.input}
          secureTextEntry
        />
      </View>

      <View style={estiloAuthentication.buttonContainer}>
        <TouchableOpacity onPress={cancelar} style={estiloAuthentication.button}>
          <Text style={estiloAuthentication.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[estiloAuthentication.button, estiloAuthentication.buttonOutline]}
        >
          <Text style={estiloAuthentication.buttonOutlineText}>Concluido</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Registro;



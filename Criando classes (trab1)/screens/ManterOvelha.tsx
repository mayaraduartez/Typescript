import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {  KeyboardAvoidingView, Alert, Text,  Pressable, Modal, TextInput,  TouchableOpacity,  View,} from "react-native";
import { auth, firestore } from "../firebase";
import meuestilo from "../meuestilo";
import { Ovelha } from "../model/Ovelha";

const ManterOvelha= () => {
  const [formOvelha, setFormOvelha] = useState<Partial<Ovelha>>({})
  const ovelhaRef = firestore.collection('Ovelha');
  const navigation = useNavigation();

  useEffect(() => {

  }, []);

  

  const limparFormulario=()=>{
    setFormOvelha({})
  }

  const cancelar = async() => {
    limparFormulario()
  }
  const salvar = async() => {
    const ovelhaRefComId = ovelhaRef.doc();
    const ovelha= new Ovelha(formOvelha);
    ovelha.id=ovelhaRefComId.id

    console.log(ovelha)
    ovelhaRefComId.set(ovelha.toFirestore()).then(() => {
         alert("Ovelha" + ovelha.nome + " Adicionado com Sucesso");
         console.log("Ovelha" + ovelha);
         console.log("Ovelha ToString: "+ovelha.toString())
         limparFormulario()
         });
    };
    
  
  return (
    <KeyboardAvoidingView 
    style={meuestilo.container}
    behavior="padding">
      <View style={meuestilo.inputContainer}>
        <TextInput
          placeholder="Nome"
          value={formOvelha.nome}
          onChangeText={val => setFormOvelha({ ...formOvelha, nome: val })}
          style={meuestilo.input}
        />
        <TextInput
          placeholder="Sexo"
          value={formOvelha.sexo}
          onChangeText={val => setFormOvelha({ ...formOvelha, sexo: val })}
          style={meuestilo.input}
        />
        <TextInput
          placeholder="Raca"
          value={formOvelha.raca}
          onChangeText={val => setFormOvelha({ ...formOvelha, raca: val })}
          style={meuestilo.input}
        />

        <TextInput
          placeholder="DataNascimento"
          value={formOvelha.datanascimento}
          onChangeText={val => setFormOvelha({ ...formOvelha, datanascimento: val })}
          style={meuestilo.input}
        />

        <TextInput
          placeholder="Dono"
          value={formOvelha.dono}
          onChangeText={val => setFormOvelha({ ...formOvelha, dono: val })}
          style={meuestilo.input}
        />

      </View>

      <View style={meuestilo.buttonContainer}>
        <TouchableOpacity onPress={cancelar} style={meuestilo.button}>
          <Text style={meuestilo.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={salvar}
          style={[meuestilo.button, meuestilo.buttonOutline]}
        >
          <Text style={meuestilo.buttonOutlineText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ManterOvelha;

import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import React,{useEffect, useState} from 'react';
import { View, Text, TextInput, Pressable } from "react-native";
import {auth, firestore, storage} from "../firebase";
import { Serie } from "../model/Serie";
import meuestilo from "../meuestilo";

const ManterSerie=()=>{
    const[formSerie, SetFormSerie]=useState<Partial<Serie>>({})
    const serieRef=firestore.collection('Usuario').doc(auth.currentUser?.uid).collection('Series')

    const limparFormulario=()=>{
        SetFormSerie({})
    }

    const cancelar=()=>{
        limparFormulario()

}

    const salvar=async()=>{
        const serie=new Serie(formSerie)
        const serieRefComId=serieRef.doc()
        serie.id=serieRefComId.id
        serieRefComId.set(serie.toFirestore()).then(()=>{
            alert("Série Salva: " + serie.titulo)
        })
        limparFormulario()
    }

    return(
        <View style={meuestilo.container}>
            <TextInput
            placeholder="Titulo"
            style={meuestilo.input}
            value={formSerie.titulo}
            onChangeText={val=>SetFormSerie({
                ...formSerie, titulo: val})}
            ></TextInput>

            <TextInput
            placeholder="genero"
            style={meuestilo.input}
            value={formSerie.genero}
            onChangeText={val=>SetFormSerie({
                ...formSerie, genero: val})}
            ></TextInput>

            <TextInput
            placeholder="Temporadas"
            style={meuestilo.input}
            value={formSerie.temporadas?.toString()}
            onChangeText={val=>SetFormSerie({
                ...formSerie, temporadas: val})}
            ></TextInput>

            <TextInput
            placeholder="ano"
            style={meuestilo.input}
            value={formSerie.ano?.toString()}
            onChangeText={val=>SetFormSerie({
                ...formSerie, ano: val })}
            ></TextInput>
            
            <TextInput
            placeholder="classificacao"
            style={meuestilo.input}
            value={formSerie.classificacao}
            onChangeText={val=>SetFormSerie({
                ...formSerie, classificacao: val})}
            ></TextInput>

            <Pressable 
            onPress={salvar}
            style={(meuestilo.button,
                    meuestilo.buttonOutline)}
            >
                <Text style={meuestilo.buttonOutlineText}>
                    Salvar
                </Text>
            </Pressable>

        </View>
        
    )
}
export default ManterSerie;
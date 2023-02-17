import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import estiloAuthentication from '../estiloAuthentication'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const Registro = () => {
    navigation.replace("Registro")
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={estiloAuthentication.container}
      behavior="padding"
    >
      <View style={estiloAuthentication.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={estiloAuthentication.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={estiloAuthentication.input}
          secureTextEntry
        />
      </View>

      <View style={estiloAuthentication.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={estiloAuthentication.button}
        >
          <Text style={estiloAuthentication.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Registro}
          style={[estiloAuthentication.button, estiloAuthentication.buttonOutline]}
        >
          <Text style={estiloAuthentication.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen


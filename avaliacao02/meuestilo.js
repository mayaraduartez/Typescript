import { StyleSheet, StatusBar } from 'react-native'
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },


  //ESTILO DO LISTAR
  containerlistar: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {

    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#0782F9',
    borderWidth: 2,
    borderRadius: 10,

  },
  title: {
    // flexWrap: "nowrap",
    fontSize: 12,
    color: '#0782F9',
    fontWeight: '700',
  },
  id: {
    //   flexWrap: "nowrap",
    fontSize: 12,
    color: '#0782F9',
    fontWeight: '700',
  },

  // ESTILO DA LISTAGEM COM FILTRO
  containerlistarcomfiltro: {
    paddingTop: 40,
    backgroundColor: 'white',
  },

  itemStyle: {
    backgroundColor: '#0066CC',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    color: 'white',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#0066CC',
  },
  image: {
    flex: 1,
    width: 50,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center'
  },
  card: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  alinhamentoLinha: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  alinhamentoColuna: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  separador: {
    height: 1,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  containerflat: {
    backgroundColor: 'white',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10
  },
  itemStylefirebase: {
    fontSize: 12,
    padding: 5,
  },

})
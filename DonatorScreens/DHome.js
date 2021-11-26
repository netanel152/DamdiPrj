import React, { useState, useEffect } from 'react';
import { View, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native';


const url = "http://proj13.ruppin-tech.co.il/"

export default function Home({ navigation, route }) {
  const [Donator, onChangeDonator] = useState(route.params.route)
  const [roleModal, setRoleModal] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRoleModal(false)
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setRoleModal(false)
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity onPress={() => setRoleModal(true)}>
        <View style={styles.button_normal}>

          <Text style={styles.button_text} >בחירת עמדה</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Appointments', { route: Donator })}>
        <View style={styles.button_normal}>
          <Text style={styles.button_text} >שינוי אתר התרמה</Text>
        </View>
      </TouchableOpacity>

      {roleModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={roleModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modalView} >
            <View >
              <Text style={styles.modalText}>{Donator.First_name + " " + Donator.Last_name}</Text>
              <Text style={styles.modalText} >בחר עמדה</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate('UnitOne', { route: Donator })}>
                <Text style={styles.textStyle}>עמדה 1</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate('UnitTwo', { route: Donator })}>
                <Text style={styles.textStyle}>עמדה 2</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate('UnitThree', { route: Donator })}>
                <Text style={styles.textStyle}>עמדה 3</Text>
              </Pressable>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setRoleModal(!roleModal)}>
              <Text style={styles.textStyle}>סגור</Text>
            </Pressable>
          </View>
        </Modal>
      )}
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    flexDirection: 'row'
  },
  input: {
    height: 40,
    width: 160,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  button_normal: {
    alignItems: 'center',
    width: 90,
    height: 90,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  header_img: {
    marginBottom: 40,
    width: 260,
    height: 75,
    alignSelf: 'center',
    resizeMode: 'stretch'
  },

  //Modal
  modalView: {
    margin: 20,
    backgroundColor: '#757c94',
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  list: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 16,
    padding: 28,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: 'grey',
    backgroundColor: "#fcfff9",
    color: "black",
  },
  modal_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  button: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    padding: 15,
    elevation: 2,

  },
  buttonOpen: {
    backgroundColor: "#F194FF",

  },
  buttonClose: {
    width: 120,
    backgroundColor: "#2196F3",
    opacity: 0.8,

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  modalText: {
    color: "black",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  }
});

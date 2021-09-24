import React, { useState, useEffect } from 'react';
import { Platform, View, SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spiner from '../Componentes/Spiner';

const url = "http://proj13.ruppin-tech.co.il/"

var isaac = require('isaac');
var bcrypt = require('bcryptjs');
bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);
  return buf.map(() => Math.floor(isaac.random() * 256));
});

export default function Login({ navigation }) {
  const [PersonalId, onChangeId] = useState()
  const [Email, onChangeEmail] = useState()
  const [Pass, onChangePass] = useState()
  const [loading, setLoading] = useState(false);
  const [Asaf, onChangeAsaf] = useState({ Personal_id: "204610620", First_name: "אסף", Last_name: "קרטן", Phone: "0549214258", Gender: "ז", Birthdate: "03.03.1993", Prev_first_name: "", Prev_last_name: "", City: "ranana", Address: "hertzel 101", Postal_code: "3355", Mail_box: "3", Telephone: "0549214258", Work_telephone: "", Blood_group_member: false, Personal_insurance: false, Confirm_examination: true, Agree_future_don: true, Birth_land: "ישראל", Aliya_year: "", Father_birth_land: "ישראל", Mother_birth_land: "ישראל" });

  useEffect(() => {
    (async () => {
      await getData();
    })()
  }, [])

  const storeData = async (data) => {
    try {
      var loggedUser = JSON.stringify(data);
      await AsyncStorage.setItem('loggedUser', loggedUser)
    } catch (e) {
      console.error(e)
    }
  }

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Done clear storage');
    } catch (error) {
      console.log(error);
    }
  }


  const getData = async () => {
    try {
      let loggedUser = await AsyncStorage.getItem('loggedUser')
      if (loggedUser !== null) {
        let existUser = JSON.parse(loggedUser)
        let updatedUser = await getAutenticateUser(existUser.Personal_id, existUser.Email)
        if (existUser.Email !== updatedUser.Email || existUser.Salted_hash !== updatedUser.Salted_hash) {
          await clearAsyncStorage()
          storeData(updatedUser)
          navigation.navigate('PersonalForm', { route: updatedUser })
        }
        console.log('exist user', existUser);
        navigation.navigate('PersonalForm', { route: existUser })

      }
      else {
        console.log('No user found on setion storage');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAutenticateUser = async (personal_id, email) => {
    try {
      let result = await fetch(url + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: personal_id,
          Email: email
        })
      });
      let user = await result.json();
      return user
    } catch (error) {
      console.error('user not authenticated');
    }
  }


  const getUserInfo = async () => {
    try {
      let result = await fetch(url + "api/user/info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: PersonalId,
        })
      });
      let full_user = await result.json();
      return full_user
    } catch (error) {
      console.error('error with retrun full user');
    }
  }

  const clientLogin = async () => {
    try {
      if (PersonalId == null || PersonalId == "" || Email == null || Email == "" || Pass == null || Pass == "") {
        Alert.alert("שגיאת התחברות", "אנא מלא/י את כל פרטים !")
        console.log('====================================');
        console.log("Error, Empty fields");
        console.log('====================================');
        return
      }
      else {
        if (Platform.OS !== 'web') {
          setLoading(true);
        }
        let updatedUser = await getAutenticateUser(PersonalId, Email);
        if (updatedUser !== undefined || updatedUser !== null) {
          if (Email !== updatedUser.Email || PersonalId !== updatedUser.Personal_id) {
            setLoading(false);
            console.log("error with email or id");
            Alert.alert("שגיאת התחברות", "אחד הפרטים שגויים");
            return;
          }
          var correct = bcrypt.compareSync(Pass, updatedUser.Salted_hash)
          if (!correct) {
            setLoading(false);
            console.log("error with password");
            Alert.alert("שגיאת התחברות", "אחד הפרטים שגויים");
            return;
          }
          storeData(updatedUser)
          let fullUpdatedUser = getUserInfo();
          if (
            fullUpdatedUser.First_name === null ||
            fullUpdatedUser.Last_name === null ||
            fullUpdatedUser.Phone === null ||
            fullUpdatedUser.Gender === null ||
            fullUpdatedUser.Birthdate === null ||
            fullUpdatedUser.City === null ||
            fullUpdatedUser.Address === null ||
            fullUpdatedUser.Postal_code === null ||
            fullUpdatedUser.Mail_box === null ||
            fullUpdatedUser.Telephone === null ||
            fullUpdatedUser.Confirm_examination === null ||
            fullUpdatedUser.Birth_land === null ||
            fullUpdatedUser.Father_birth_land === null ||
            fullUpdatedUser.Mother_birth_land === null) {
            setLoading(false);
            Alert.alert("אנא מלא/י את כל הפרטים כדי לתרום!")
            navigation.navigate('PersonalForm', { route: updatedUser })
          }
        }
        else {
          setLoading(false);
          Alert.alert("בעיית התחברות, הירשם או בדוק את פרטיך")
          return
        }
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeId}
              value={PersonalId}
              placeholder="תעודת זהות"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={Email}
              placeholder="אימייל"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangePass}
              value={Pass}
              secureTextEntry={true}
              placeholder="סיסמה"
            />
            <TouchableOpacity onPress={() => clientLogin()}>
              <View style={styles.button_normal}>
                <Text style={styles.button_text}>התחברות</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
              <View style={styles.button_normal}>
                <Text style={styles.button_text} >הרשמה</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DonatorsLogin')}>
              <View style={styles.button_normal}>
                <Text style={styles.button_text} >כניסת מתרימים</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PersonalForm', { route: Asaf })}>
              <View style={styles.button_normal}>
                <Text style={styles.button_text} >הכפתור של אסף</Text>
              </View>
            </TouchableOpacity>

            <Spiner loading={loading} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    padding: 40,
    flex: 1,
    justifyContent: "space-around"
  },
  input: {
    height: 40,
    width: 160,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center'
  },
  button_normal: {
    alignItems: 'center',
    width: 160,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    color: 'black'
  },
});

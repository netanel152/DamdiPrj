import React from 'react';
import { View, SafeAreaView, StyleSheet,Text, TextInput, Button, TouchableOpacity } from 'react-native';


const url = "http://ruppinmobile.tempdomain.co.il/site15/"
var bcrypt = require('bcryptjs');

const RegistrationNewUser = ({ navigation }) => {
    const [PersonalId, onChangeId] = React.useState();
    const [Email, onChangeEmail] = React.useState();
    const [Pass, onChangePass] = React.useState();
    const [CPass, onChangeCPass] = React.useState();

    const SignUp = (id, Email, Pass, CPass) => {
        if (Pass != CPass) {
            alert("סיסמא אינה תואמת, אנא בדוק פרטיך!");
            return
        }
        else if (id == null || id == "" || Email == null || Email == "" || Pass == null || Pass == "" || CPass == null || CPass == "") {
            alert("אנא מלא/י את כל השדות");
            return
        }
        else {
            var salt = bcrypt.genSaltSync(10);
            var saltedHash =  bcrypt.hashSync(Pass, salt);

            fetch(url + "api/user/post", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Personal_id: id,
                    Email: Email,
                    Salted_hash: saltedHash,
                    
                })
            })
                .then(res => {
                    console.log('res=', res);
                    return res.json()

                })
                .then(
                    (result) => {
                        debugger
                        console.log(id);
                        console.log(result);
                        console.log(result.Personal_id);
                        console.log(result.Email);
                        if (result === 'User created successfully.') {
                            navigation.navigate("Login");

                        } else {
                            alert("משתמש קיים")
                            return;
                        }
                    },
                    (error) => {
                        console.log(error);
                    });
        }
    }

    return (

        <SafeAreaView style={styles.container}>
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
            <TextInput
                style={styles.input}
                onChangeText={onChangeCPass}
                secureTextEntry={true}
                value={CPass}
                placeholder="אשר סיסמה"
            />
            <TouchableOpacity onPress={() => SignUp(PersonalId, Email, Pass, CPass)}>
        <View style={styles.button_normal}>
          <Text >סיים הרשמה</Text>
        </View>
      </TouchableOpacity>
        </SafeAreaView>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width:160,
        margin: 12,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
    },
    button_normal: {

        alignItems: 'center',
        margin: 15,
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#633689"
      },
});
export default RegistrationNewUser;
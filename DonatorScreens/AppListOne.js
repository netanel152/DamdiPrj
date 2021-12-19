import React, { useState, useEffect } from 'react';
import { View, FlatList, Modal, Pressable, StyleSheet, Text, ScrollView } from 'react-native';
import { url } from '../Utils'

export default function AppListOne({ navigation, route }) {
  console.log("AppListOne 1:", route);
  const [fullData, setFullData] = useState([])
  const [modalRefuse, setModalRefuseVis] = useState(false);
  const [Donator, setDonator] = useState(route.params.route.Donator)
  const [stationCode, setStationCode] = useState(route.params.route.staionCode)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAppointmentsList();
    });

    return unsubscribe;
  }, [navigation]);

  const getDonorInfo = async (Personal_id) => {
    try {
      let result = await fetch(url + "api/user/info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: Personal_id,
        })
      });
      let donor = await result.json();
      if (donor !== undefined || donor !== null) {
        navigation.navigate('DonorInfo', { Donator: Donator, Donor: donor})
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getUserInfo = async (id) => {
    try {
      let result = await fetch(url + "api/user/info", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: id
        })
      });
      let user = await result.json();
      console.log(user);
      if (user !== undefined || user !== null) {
        let fullname = user.First_name + ' ' + user.Last_name
        console.log(fullname);
        return fullname
      }
    } catch (error) {
      console.error('error with retrun full user');
    }
  }

  const getAppointmentsList = async () => {
    try {
      let result = await fetch(url + `api/appointments/unit/one/${stationCode}`, {
        method: 'GET'
      });
      let data = await result.json();
      console.log(data);
      if (data.length === 0) {
        setModalRefuseVis(true);
        return;
      }
      else {
        let idApp = 0
        let arr = []
        for (let index = 0; index < data.length; index++) {
          let PID = data[index].Personal_id
          let fullname = await getUserInfo(PID)
          let timeapp = data[index].App_time
          let datetime = new Date(timeapp)
          var fTime = datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getFullYear() + " " + datetime.getUTCHours() + ":" + datetime.getUTCMinutes();
          let appObj = { id: ++idApp, Personal_id: PID, time: fTime, name: fullname }
          arr.push(appObj);
        }
        setFullData(arr)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.textStyle}>לחץ על שם התורם הרצוי כדי להתחיל בביצוע תהליך אימות הפרטים</Text>
      </View>
      
        <FlatList
          data={fullData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <Text style={styles.text_list}>ת.ז. :  {item.Personal_id}</Text>
              <Text style={styles.text_list} onPress={() => getDonorInfo(item.Personal_id)}>שם  :  {item.name}</Text>
              <Text style={styles.text_list}>מועד התור :  {item.time}</Text>
            </View>
          )} />
    
      {modalRefuse && (
        <View>
          <Modal
            animationIn='zoomIn'
            animationOut='zoomOut'
            transparent={true}
            visible={modalRefuse}
            onRequestClose={() => { console.log('Modal has been closed.'); }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>רשימת התורים ריקה, אין תורמים כעת.</Text>
              <View style={styles.modal_buttons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalRefuseVis(!modalRefuse)
                    navigation.navigate('UnitOne')
                  }}>
                  <Text style={styles.textStyle}>סגור</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lableText: {
    marginTop: 17,
    fontSize: 16,
    fontWeight: 'bold'
  },
  text_container: {
    marginTop: 10,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  text: {
    borderBottomColor: 'black',
    width: 200,
    borderBottomWidth: 1,
    fontSize: 15,
  },
  date_container: {
    flexDirection: "row-reverse"
  },
  button_normal: {
    alignItems: 'center',
    width: 160,
    margin: 15,
    marginLeft: 50,
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
  list: {
    width: 350,
    height: 150,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 30,
    padding: 18,
    borderWidth: 3,
    borderRadius: 9,
    borderColor: 'grey',
    backgroundColor: "#fcfff9",
    color: "black"
  },
  text_list: {
    paddingTop: 10,
    paddingLeft: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    flexDirection: 'column',
  },
  container_city_list: {
    marginRight: 100,
  },
  button_city_list: {
    borderWidth: 2
  },
  text_city_list: {
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
  },
  //Modal buttons 
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
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  buttonClose: {
    width: 120,
    backgroundColor: "white",
    opacity: 0.8,
  },
  modalText: {
    color: "white",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  }
});




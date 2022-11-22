import {StyleSheet, TouchableOpacity, View, Text, Alert} from 'react-native'
import React, { Component } from 'react'
import {InputData} from '../../components'
import firebase from '../../config/firebase'

export default class EditRuangan extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       namaruangan : '',
       kapasitas : '',
    }
  }

  componentDidMount(){
    firebase.database().ref('Ruangan/' + this.props.route.params.id).once('value',(querySnapShot) =>{
      let data = querySnapShot.val() ? querySnapShot.val() : {} ;
      let ruanganItem = {...data};

      this.setState({
        namaruangan: ruanganItem.namaruangan,
        kapasitas : ruanganItem.kapasitas
      });
    });
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState] : value
    });
  };

  onSubmit = () => {
    if(this.state.namaruangan && this.state.kapasitas){

      const ruanganReferensi = firebase.database().ref('Ruangan/'+this.props.route.params.id);

      const ruangan = {
        namaruangan : this.state.namaruangan,
        kapasitas : this.state.kapasitas
      };

      ruanganReferensi.update(ruangan).then((data)=>{
        Alert.alert('Sukses','Ruangan Terupdate !');
        this.props.navigation.replace('Home');
      })
      .catch((error) =>{
        console.log("Error : ", error);
      })

    }else{
      Alert.alert('Error','Nama Ruangan, Kapasitas wajib diisi!')
    }
    
  };

  render() {
    return (
      <View style={styles.pages}>
        <InputData 
        label="Nama Ruangan"
        placeholder="Masukkan Nama Ruangan"
        onChangeText = {this.onChangeText} 
        value = {this.state.namaruangan}
        namaState = "namaruangan"/>
        
        <InputData 
        label="Kapasitas" 
        placeholder="Masukkan Kapasitas" 
        keyboardType="number-pad"
        onChangeText = {this.onChangeText} 
        value = {this.state.kapasitas}
        namaState = "kapasitas"/>

        <TouchableOpacity style={styles.tombol} onPress={()=>this.onSubmit()}>
          <Text style={styles.textTombol}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pages : {
    flex : 1,
    padding : 30
  },
  tombol:{
    backgroundColor : 'black',
    padding : 10,
    borderRadius : 5,
    marginTop : 10,
  },
  textTombol:{
    color : 'white',
    fontWeight : 'bold',
    textAlign : 'center',
    fontSize : 16,
  },

  
})
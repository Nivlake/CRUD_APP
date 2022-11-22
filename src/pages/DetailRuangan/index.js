import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import firebase from '../../config/firebase'

export default class DetailRuangan extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         ruangan : {},
      };
    }
    componentDidMount(){
      firebase.database().ref('Ruangan/' + this.props.route.params.id).once('value',(querySnapShot) =>{
        let data = querySnapShot.val() ? querySnapShot.val() : {} ;
        let ruanganItem = {...data};
  
        this.setState({
          ruangan: ruanganItem,
        });
      });
    }

    render() {
        const { ruangan } = this.state;
        return (
            <View style={styles.pages}>
                <Text>Nama Ruangan : </Text>
                <Text style={styles.text}>{ruangan.namaruangan}</Text>

                <Text>Kapasitas : </Text>
                <Text style={styles.text}>{ruangan.kapasitas}</Text>
                
            </View>
        )
  }
}

const styles = StyleSheet.create({
    pages:{
        padding : 20,
        margin : 30,
        backgroundColor : 'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text:{
        fontSize : 16,
        color : 'black',
        fontWeight : 'bold',
        marginBottom : 10,
    },
})
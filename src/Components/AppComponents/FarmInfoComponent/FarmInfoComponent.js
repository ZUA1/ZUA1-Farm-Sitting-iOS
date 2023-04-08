import React from 'react';
import {View,Text,ScrollView, StyleSheet,TextInput,TouchableOpacity,Image,Platform, Alert} from 'react-native';
import images from "../../../../assets/images";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';
import Button from '../../Button/Button';

import firestore from '@react-native-firebase/firestore';
export default class FarmInfoComponent extends React.Component {

    state = {
        fold_animal: false,
        fold_plant: true,
        fold_vet: true,
    }

    OnDeleteItem(sItemType, sItemId) {
        const farm = this.props.data;
        switch(sItemType) {
            case 'animal':
                Alert.alert(
                    "Delete",
                    "Are you sure to delete this animal?",
                    [{
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },{
                        text: "OK",
                        onPress: () => {
                            firestore()
                                .collection(`farms`)
                                .doc(farm?.key)
                                .collection(`animals`)
                                .doc(sItemId)
                                .delete().then(res => {
                                    //self.props.navigation.goBack();
                                    self.props.onRefresh && self.props.onRefresh('animal');
                                });
                        }
                    }],
                    { cancelable: false }
                );
                break;
            case 'plant':
                Alert.alert(
                    "Delete",
                    "Are you sure to delete this plant?",
                    [{
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },{
                        text: "OK",
                        onPress: () => {
                            firestore()
                                .collection(`farms`)
                                .doc(farm?.key)
                                .collection(`plants`)
                                .doc(sItemId)
                                .delete().then(res => {
                                    //self.props.navigation.goBack();
                                    self.props.onRefresh && self.props.onRefresh('plant');
                                });
                        }
                    }],
                    { cancelable: false }
                );
                break;
            case 'vet':
                Alert.alert(
                    "Delete",
                    "Are you sure to delete this vet?",
                    [{
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },{
                        text: "OK",
                        onPress: () => {
                            firestore()
                                .collection(`farms`)
                                .doc(farm?.key)
                                .collection(`vets`)
                                .doc(sItemId)
                                .delete().then(res => {
                                    //self.props.navigation.goBack();
                                    self.props.onRefresh && self.props.onRefresh('vet');
                                });
                        }
                    }],
                    { cancelable: false }
                );
                break;
        }
    }

    render() {
        const farm = this.props.data;
        const {fold_animal, fold_plant, fold_vet} = this.state;
        return(
            <View style={styles.mainContainer}>

                {/* Animals */ }
                <View style={styles.container}>
                    <View style={styles.nameView}>
                        <Text style={styles.title}>Farm Animals</Text>
                        <TouchableOpacity onPress={() => this.setState({fold_animal: !fold_animal})}>
                            <Image style={styles.icon} source={fold_animal? images.ic_play : images.ic_up}/>
                        </TouchableOpacity>
                    </View>
                    {!fold_animal && farm.animals && farm.animals.map((animal, i) => 
                        <View key={i} style={{alignSelf:'stretch'}}>
                            <View style={styles.infoView}>
                                <Text style={styles.textInfo}>{animal.name}</Text>
                                <Text style={styles.textInfo}>{animal.kind}</Text>
                                <Text style={styles.textInfo}>{animal.age}</Text>
                                <Text style={styles.textInfo}>{animal.note}</Text>
                            </View>
                            <View style={styles.imageView}>
                                <View style={styles.mainViewImages}>
                                    <ScrollView contentContainerStyle={styles.innerViewImages} horizontal>
                                        {animal.photos && animal.photos.map((photo,i) => typeof(photo) == 'string' &&
                                            <Image key={i} style={styles.img} source={{uri:photo}}/>
                                        )}
                                    </ScrollView>
                                </View>
                                <View style={styles.viewEdit}>
                                    {this.props.addIcon ?
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('AddFarmAnimal', {farm_id: farm?.key})
                                        }}>
                                            <Image style={[styles.iconEdit,{marginRight:9}]} source={images.ic_add_2}/>
                                        </TouchableOpacity>
                                        : null
                                    }
                                    {this.props.editIcon &&
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('AddFarmAnimal', {farm_id: farm?.key, animal_id: animal.key})
                                        }}>
                                            <Image style={[styles.iconEdit,{marginRight:9}]} source={images.ic_edit}/>
                                        </TouchableOpacity>
                                    }
                                    {this.props.deleteIcon ?
                                        <TouchableOpacity onPress={() => {
                                            this.OnDeleteItem('animal', animal.key);
                                        }}>
                                            <Image style={styles.iconEdit} source={images.ic_delete}/>
                                        </TouchableOpacity>
                                        : null
                                    }
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Plants */ }
                <View style={styles.container}>
                    <View style={styles.nameView}>
                        <Text style={styles.title}>Plants and Trees</Text>
                        <TouchableOpacity onPress={() => this.setState({fold_plant: !fold_plant})}>
                            <Image style={styles.icon} source={fold_plant? images.ic_play : images.ic_up}/>
                        </TouchableOpacity>
                    </View>
                    {!fold_plant && farm.plants && farm.plants.map((plant, i) => 
                        <View key={i} style={{alignSelf:'stretch'}}>
                            <View style={styles.infoView}>
                                <Text style={styles.textInfo}>{plant.name}</Text>
                                <Text style={styles.textInfo}>{plant.kind}</Text>
                                <Text style={styles.textInfo}>{plant.note}</Text>
                            </View>
                            <View style={styles.imageView}>
                                <View style={styles.mainViewImages}>
                                    <ScrollView contentContainerStyle={styles.innerViewImages} horizontal>
                                        {plant.photos && plant.photos.map((photo,i) => 
                                            <Image key={i} style={styles.img} source={{uri:photo}}/>
                                        )}
                                    </ScrollView>
                                </View>
                                <View style={styles.viewEdit}>
                                    {this.props.addIcon ?
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('AddPlant', {farm_id: farm?.key})
                                        }}>
                                            <Image style={[styles.iconEdit,{marginRight:9}]} source={images.ic_add_2}/>
                                        </TouchableOpacity>
                                        : null
                                    }
                                    {this.props.editIcon &&
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('AddPlant', {farm_id: farm?.key, plant_id: plant.key})
                                        }}>
                                            <Image style={[styles.iconEdit,{marginRight:9}]} source={images.ic_edit}/>
                                        </TouchableOpacity>
                                    }
                                    {this.props.deleteIcon ?
                                        <TouchableOpacity onPress={() => {
                                            this.OnDeleteItem('plant', plant.key);
                                        }}>
                                            <Image style={styles.iconEdit} source={images.ic_delete}/>
                                        </TouchableOpacity>
                                        : null
                                    }
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.container}>
                    <View style={styles.nameView}>
                        <Text style={styles.title}>Vet Information</Text>
                        <TouchableOpacity onPress={() => this.setState({fold_vet: !fold_vet})}>
                            <Image style={styles.icon} source={fold_vet? images.ic_play : images.ic_up}/>
                        </TouchableOpacity>
                    </View>
                    {!fold_vet && farm.vets && farm.vets.map((vet, i) => 
                        <View key={i} style={{alignSelf:'stretch'}}>
                            <View style={styles.infoView}>
                                <Text style={styles.clinicText}>{vet.name}</Text>
                                <View style={styles.iconInfoView}>
                                    <Image style={styles.icon} source={images.phone}/>
                                    <Text>{vet.phone}</Text>
                                </View>
                                <View style={styles.iconInfoView}>
                                    <Image style={styles.icon} source={images.mail}/>
                                    <Text>{vet.email}</Text>
                                </View>
                                <View style={styles.iconInfoView}>
                                    <Image style={styles.icon} source={images.user}/>
                                    <Text>{vet.username}</Text>
                                </View>
                            </View>
                            <View style={styles.imageView}>
                                <Text style={styles.detailText}>{vet.note}</Text>
                                <View style={styles.viewEdit}>
                                    {this.props.addIcon ?
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('VetInformation', {farm_id: farm?.key})
                                        }}>
                                            <Image style={[styles.iconEdit,{marginRight:9}]} source={images.ic_add_2}/>
                                        </TouchableOpacity>
                                        : null
                                    }
                                    {this.props.editIcon &&
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('VetInformation', {farm_id: farm?.key, vet_id: vet.key})
                                        }}>
                                            <Image style={[styles.iconEdit,{marginRight:9}]} source={images.ic_edit}/>
                                        </TouchableOpacity>
                                    }
                                    {this.props.deleteIcon ?
                                        <TouchableOpacity onPress={() => {
                                            this.OnDeleteItem('vet', vet.key);
                                        }}>
                                            <Image style={styles.iconEdit} source={images.ic_delete}/>
                                        </TouchableOpacity>
                                        : null
                                    }
                                </View>
                            </View>
                        </View>
                    )}
                </View>

            </View>

        );
    }
}




const styles= StyleSheet.create({
    mainContainer:{
        // flex:1,
        alignItems:'center',
        // backgroundColor:colors.black,
        // justifyContent: 'center',
        // paddingHorizontal:'2%'
    },
    container:{
        //height: Platform.OS === 'ios' ? hp(30):hp(37),
        width:wp(90),
        // paddingLeft:'10%',
        borderRadius:wp(2),
        backgroundColor:colors.white,
        marginTop:12
    },
    nameView:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        //height:'28%',
        width:'100%',
        // backgroundColor:'green',
        paddingHorizontal:'5%',
        paddingVertical:'5%',
        borderBottomWidth:1,
        borderColor: '#e6e6e6',
    },
    title:{
        fontSize:wp(4),
        fontWeight:'bold',
    },
    infoView:{
        //height:'37%',
        width:'100%',
        // backgroundColor:'orange',
        paddingHorizontal:'5%',
        paddingTop:Platform.OS === 'ios' ? '1%' : 0
    },
    imageView:{
        //minHeight:hp(20),
        width:'100%',
        // backgroundColor:'yellow',
        paddingHorizontal:'5%',
        paddingVertical:'5%',
        //flexDirection:'row',
        alignItems:'center',
        // justifyContent:'space-between',
        position: 'relative',
    },

    img:{
        minHeight: 95,
        width:95,
        resizeMode:'contain',
        borderRadius:wp(1),
        marginRight:5
        // backgroundColor:'red'
        // borderRadius:wp(2),
    },
    iconInfoView:{
        flexDirection:'row',
        alignItems: 'center',
        paddingTop:Platform.OS === 'ios' ? '1%' : '0.5%'
    },
    icon:{
        height:16,
        width:16,
        resizeMode:'contain',
        marginRight:7
    },
    iconEdit:{
        height:19,
        width:19,
        resizeMode:'contain',
    },
    textInfo:{
        fontSize:wp(4),
        paddingTop:Platform.OS === 'ios' ? 0.5 : 0
    },
    clinicText:{
        fontSize:wp(3.7),
        fontWeight: '500',
        paddingTop:'1%',
    },
    mainViewImages:{
        //height:'100%',
        width:'100%',
        //flexDirection:'row',
    },
    innerViewImages:{
        //height:'100%',
        //width:'75%',
        flexDirection:'row',
        alignItems:'center',
    },
    viewEdit:{
        /*
        flexDirection:'row',
        //height:'100%',
        width:'25%',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        // paddingTop:'10%',
        // backgroundColor: 'green',
        paddingBottom:'4%'
        */
       position: 'absolute',
       right: '5%',
       bottom: 15,
       flexDirection: 'row'
    },
    detailText:{
        width: '100%',
        fontSize:wp(3.6),
        lineHeight:wp(4.5),
        paddingTop:'3%'
    }




});





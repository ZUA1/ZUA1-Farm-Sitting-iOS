//====> System files <====//
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,Text, ScrollView, FlatList,TouchableOpacity,Image} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import React from 'react';

//====> Local files <====//

import Dropdown from '../../../Components/ModalDropdown';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import styles from './style';
import AppInput from '../../../Components/Inputs/AppInput';
import Textarea from 'react-native-textarea';
import colors from '../../../../assets/colors';
import Button from '../../../Components/Button/Button';
//import CowImageComponent from '../../../Components/AppComponents/CowImageComponent/CowImageComponent';
import FarmInfoComponent from '../../../Components/AppComponents/FarmInfoComponent/FarmInfoComponent';

import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';

class FarmInformation extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            farm: {},
            animals: [],
            plants: [],
            vets: []
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.fetchlinked()
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    fetchlinked() {
        //this.setState({ spinner: true })
        const farm_id = this.props.route.params?.id;

        firestore()
            .collection('farms')
            .doc(farm_id)
            .collection('animals')
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot) {
                    console.log('# querySnapshot:', querySnapshot);
                    return;
                }
                const animals = [];
                querySnapshot.forEach(documentSnapshot => {
                    animals.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                console.log('#animals:', animals);
                this.setState({ animals});
            });

        firestore()
            .collection('farms')
            .doc(farm_id)
            .collection('plants')
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot) {
                    console.log('# querySnapshot:', querySnapshot);
                    return;
                }
                const plants = [];
                querySnapshot.forEach(documentSnapshot => {
                    plants.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                console.log('#plants:', plants);
                this.setState({ plants});
            });

        firestore()
            .collection('farms')
            .doc(farm_id)
            .collection('vets')
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot) {
                    console.log('# querySnapshot:', querySnapshot);
                    return;
                }
                const vets = [];
                querySnapshot.forEach(documentSnapshot => {
                    vets.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                console.log('#vets:', vets);
                this.setState({ vets});
            });
    }


    render() {

        const actions = [
            {
                color:colors.app_ruby,
                text: "Animal",
                icon: images.ic_right,
                name: "AddFarmAnimal",
                position: 1,

            },
            {
                color:colors.app_ruby,
                text: "Plant",
                icon: images.ic_right,
                name: "AddPlant",
                position: 2,
            },
            {
                color:colors.app_ruby,
                text: "Vet",
                icon: images.ic_right,
                name: "VetInformation",
                position: 3
            },
        ];
        const {animals, plants, vets} = this.state;
        const isMyFarm = this.props.user.uid == this.props.route.params?.id;
        return(
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader title={'Farm Information'}
                               leftIconPath={images.ic_back}
                               onLeftIconPress={()=> this.props.navigation.goBack()}
                    />
                </View>

                {/*====> Container View <====*/}

                <View style={styles.bottomContainer}>

                    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                        <FarmInfoComponent
                            data={{
                                key: this.props.route.params?.id,
                                animals: this.state.animals,
                                plants: this.state.plants,
                                vets: this.state.vets
                            }}
                            navigation={this.props.navigation}
                            addIcon={false}
                            editIcon={isMyFarm}
                            deleteIcon={false}
                        />
                    </ScrollView>

                    <FloatingAction
                        actions={actions}
                        color={colors.app_ruby}
                        onPressItem={name => {
                            const farm_id = this.props.route.params?.id;
                            this.props.navigation.navigate(name, {farm_id});
                            // alert(`selected button: ${name}`);
                        }}
                    />

                </View>

                <Spinner
                    visible={this.state.spinner}
                    textStyle={{ color: 'white' }}
                />

            </View>

        );
    }
}


const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(FarmInformation)




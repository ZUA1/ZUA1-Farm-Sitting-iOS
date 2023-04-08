//====> System files <====//

import {View,Text,FlatList,TouchableOpacity} from 'react-native';
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
import CowImageComponent from '../../../Components/AppComponents/CowImageComponent/CowImageComponent';


export default class EditPlant extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {

            listImages: [

                {
                    id: 1,
                    image: images.plant_1,
                },
                {
                    id: 2,
                    image: images.plant_2,
                },
                {
                    id: 3,
                    image: images.plant_1,
                },



            ],


        }
    }



//====> Images Method <====//

    cowImages(item){
        return(
            <CowImageComponent
                image={item.image}
                // onPress={() => this.props.navigation.navigate('')}
            />
        )
    }



    render() {
        return(
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader title={'Edit Plant'}
                               leftIconPath={images.ic_back}
                               rightIconOnePath={images.ic_sort_1}
                               onLeftIconPress={()=> this.props.navigation.goBack()}
                        // onRightIconPress={()=> this.props.navigation.navigate('SearchScreen')}
                    />
                </View>

                {/*====> Container View <====*/}

                <View style={styles.bottomContainer}>

                    <View style={styles.inputsView}>
                        <AppInput placeholder={'Philodendron Selloum'} placeholderTextColor={colors.placeholder_color}/>
                        <AppInput placeholder={'Outdoor Plant'} placeholderTextColor={colors.placeholder_color} marginTop={1}/>
                        <Textarea containerStyle={styles.textArea}
                                  placeholder={'Water through. Keep away from direct sunlight.'} placeholderTextColor={colors.placeholder_color}/>


                        <View style={styles.imagesView}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={this.state.listImages}
                                renderItem={({ item }) => this.cowImages(item)}
                                keyExtractor={item => '' + item.id}
                            />
                        </View>

                    </View>

                    {/*====> Button View <====*/}

                    <View style={styles.btnView}>
                        <Button title={'Save'}/>
                    </View>

                </View>

            </View>

        );
    }
}





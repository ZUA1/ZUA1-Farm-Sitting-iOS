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
import RevtoneCategoryComponent
    from '../../../Components/AppComponents/RevtoncategoryComponent/RevtoncategoryComponent';
import CowImageComponent from '../../../Components/AppComponents/CowImageComponent/CowImageComponent';


export default class EditFarmAnimal extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {

            listImages: [

                {
                    id: 1,
                    image: images.cow_1,
                },
                {
                    id: 2,
                    image: images.cow_2,
                },
                {
                    id: 3,
                    image: images.cow_2,
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
                    <AppHeader title={'Edit Farm Animal'}
                               leftIconPath={images.ic_back}
                               rightIconOnePath={images.ic_sort_1}
                               onLeftIconPress={()=> this.props.navigation.goBack()}
                               // onRightIconPress={()=> this.props.navigation.navigate('SearchScreen')}
                    />
                </View>

                {/*====> Container View <====*/}

                <View style={styles.bottomContainer}>

                    <View style={styles.inputsView}>
                        <AppInput placeholder={'Elmer'} placeholderTextColor={colors.placeholder_color}/>

                        {/*====> DropDown View <====*/}

                        <View style={styles.dropdownView}>
                            <Dropdown
                                listViewWidth={'90%'}
                                options={['A','B','C','D','E']}
                                defaultButtontext={'Angus Cattle'}
                                tintColor={colors.app_ruby}
                                dropdownStyle={{height:'100%',width: "100%"}}
                                dropdownOptionsStyle={{width:'91.5%',marginRight:'14.5%',marginTop:'6%'}}
                            />
                        </View>

                        <View style={[styles.dropdownView,{marginTop:5}]}>
                            <Dropdown
                                listViewWidth={'90%'}
                                options={['A','B','C','D','E']}
                                defaultButtontext={'3 years old'}
                                tintColor={colors.app_ruby}
                                dropdownStyle={{height:'100%',width: "100%"}}
                                dropdownOptionsStyle={{width:'91.5%',marginRight:'14.5%',marginTop:'6%'}}
                            />
                        </View>

                        <Textarea containerStyle={styles.textArea}
                                  placeholder={'Provide necessary food, water and care. Food - 2x a day, morning and night. Water - Once Container is empty, fill it to to brim. Bring to shade 12am to 4pm'} placeholderTextColor={colors.placeholder_color}/>


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
                        <Button style={styles.btn} titleStyle={styles.titleBtn} bgColor={colors.app_input_bg} title={'Delete'}/>
                        <Button title={'Save'}/>
                    </View>

                </View>

            </View>

        );
    }
}





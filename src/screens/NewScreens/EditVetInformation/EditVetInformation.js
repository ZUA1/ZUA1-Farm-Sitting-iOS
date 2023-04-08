//====> System files <====//

import {View,Text,FlatList,TouchableOpacity} from 'react-native';
import React from 'react';

//====> Local files <====//

import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import styles from './style';
import AppInput from '../../../Components/Inputs/AppInput';
import Textarea from 'react-native-textarea';
import colors from '../../../../assets/colors';
import Button from '../../../Components/Button/Button';


export default class EditVetInformation extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {


        }
    }



    render() {
        return(
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader title={'Edit Vet Information'}
                        // lefticonSize={20}
                               leftIconPath={images.ic_back}
                               rightIconOnePath={images.ic_sort_1}
                               onLeftIconPress={()=> this.props.navigation.goBack()}
                        // onRightIconPress={()=> this.props.navigation.navigate('SearchScreen')}
                    />
                </View>

                {/*====> Container View <====*/}

                <View style={styles.bottomContainer}>

                    <View style={styles.inputsView}>
                        <AppInput placeholder={'Animal Lover\'s Clinic'} placeholderTextColor={colors.placeholder_color}/>
                        <AppInput placeholder={'+12659876536'} placeholderTextColor={colors.placeholder_color} marginTop={1}/>
                        <AppInput placeholder={'animallovers@email.com'} placeholderTextColor={colors.placeholder_color} marginTop={1}/>
                        <AppInput placeholder={'Dr. Sebastian Good'} placeholderTextColor={colors.placeholder_color} marginTop={1}/>

                        <Textarea containerStyle={styles.textArea} placeholder={'Phone in and call Dr. Sebastian during emergencies ONLY and if you cannot reach me.'} placeholderTextColor={colors.placeholder_color}/>

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





import React from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from './style';



export default class SetupPaymentComponent extends React.Component {



    render() {
        return(

            <TouchableOpacity onPress={this.props.onPress}>

                <View
                    style={styles.mainContainer}>


                    <View style={styles.container}>
                        <View style={styles.containerInnerUpperView}>
                            <Image style={styles.image}

                                   source={this.props.image}
                            />

                            <View style={{paddingLeft:'7%'}}>
                                <Text style={styles.titleUpperView}>{this.props.title}</Text>
                                <Text style={styles.textUpperView}>{this.props.text}</Text>
                            </View>

                        </View>

                        <TouchableOpacity style={styles.containerInnerBottomView} onPress={this.props.onPress}>

                            <Image style={styles.img}

                                   source={this.props.img}
                            />
                        </TouchableOpacity>


                    </View>


                </View>

            </TouchableOpacity>

        );
    }
}




import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import styles from './Styles';
import Button from '../../Button/Button';
import { AirbnbRating } from 'react-native-ratings';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { color } from 'react-native-reanimated';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';


class TransactionComponent extends React.Component {

    render() {
        return (

            // <View style={styles.mainContainer}>
            <View style={[styles.mainCard, { height: this.props.height }]}>
                <View style={styles.nameAndIcon}>
                    <View style={styles.name}>
                        <Text style={styles.CilentName}>{this.props.client} </Text>
                        <Text style={styles.titleName}>Martin Wesley </Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.rightIconStyle} source={images.ic_messaging} />
                    </View>


                </View>
                <View style={styles.price}>
                    <Text style={styles.pricetextStyle}>$105.00</Text>
                </View>
                <View style={styles.job}>
                    <View style={styles.jobTextView}>
                        <Text style={styles.jobTextStyle}>Job Offer</Text>

                    </View>
                    <View style={styles.statusStyle}>


                        {this.props.response ? <View style={[styles.statusStyleOngoing, { borderColor: this.props.borderColor }]}>
                            {this.props.image ? <Image source={images.check_icon_green}
                                                       style={[styles.checkImageStyles, { tintColor: this.props.tintColor }]}
                            /> : null}
                            <Text style={[styles.ongoingTextStyle, { color: this.props.color }]}>{this.props.status}</Text>

                        </View> : null}
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.locationStyle}>
                    <View style={styles.locationIcon}>
                        <Image style={styles.locationStyleIcon} source={images.ic_maker} />

                    </View>
                    <View style={styles.locationName}>
                        <Text style={styles.locationNameStyle}>Farm House Location</Text>
                    </View>


                    {this.props.locationPic ? <View style={styles.awayIcon}>
                        <Image style={styles.awayIconStyle} source={images.ic_ruler} />
                    </View> : null}

                    {this.props.locationAway ? <View style={styles.awayText}>
                        <Text style={styles.awayTextStyle}>0.2 km away</Text>
                    </View> : null}






                </View>
                <View style={styles.startDate}>

                    <View style={styles.startDateText}>
                        <Text style={styles.startDateStyle}>Start Date:</Text>
                    </View>
                    <View style={styles.startDateNumber}>
                        <Text style={styles.EndDateStyle}>27th November, 12:00 UTC</Text>

                    </View>
                </View>

                <View style={styles.startDate}>

                    <View style={styles.startDateText}>
                        <Text style={styles.startDateStyle}>End Date:</Text>
                    </View>
                    <View style={styles.startDateNumber}>
                        <Text style={[styles.EndDateStyle, { paddingLeft: 8 }]}>1st December, 12:00 UTC</Text>

                    </View>



                </View>

                {this.props.information ? <TouchableOpacity style={styles.viewInformation} onPress={this.props.onPressViewFarm}>
                    <Text style={styles.viewInformationStyle}>View Farm House information</Text>
                </TouchableOpacity> : null
                }
                <View style={styles.jobDescription}>
                    <Text style={styles.jobDescriptionStyle}>{this.props.additionalNotes}</Text>

                </View>
                <View style={styles.jobDescriptionInfo}>
                    <Text style={styles.jobDescriptionInfoStyle}>It is a long established fact that a reader will be distracted by the
                        readable content of a page when looking at its layout</Text>

                </View>
                {this.props.button ? <View style={styles.button}>
                    <Button
                        style={styles.buttonStyles}
                        title={this.props.title}
                        titleColor={colors.white}
                        bgColor={this.props.bgColor}
                        titleStyle={[styles.titleStyles, { color: colors.white }]}
                        // onPress={()=>this.setModalVisible(true)}
                    />

                </View> : null
                }
                {this.props.buttons ? <View style={styles.buttons}>
                    <View style={styles.joinButton}>
                        <Button
                            width={'90%'}
                            // style={styles.buttonStyles}
                            title={'Job Done'}
                            titleColor={colors.white}
                            bgColor={colors.app_green}
                            titleStyle={[styles.titleStyles, { color: colors.white }]}
                            onPress={this.props.onPressDone}
                        />
                    </View>
                    <View style={styles.cancelButton}>
                        <Button
                            width={'90%'}
                            // style={styles.buttonStyles}
                            title={'Cancel Job'}
                            titleColor={colors.white}
                            // bgColor={colors.app_ruby}
                            titleStyle={[styles.titleStyles, { color: colors.white }]}
                            // onPress={()=>this.setModalVisible(true)}
                        />
                    </View>


                </View> : null}

                {this.props.awaitingConfirmation ? <View style={styles.awaitingButton}>
                    <Text style={styles.awaitingStyle}>Awaiting Confirmation</Text>
                </View> : null}


                {this.props.divider ? <View style={styles.divider}></View> : null}

                {this.props.rating ? <View style={styles.ratingButton}>
                    <AirbnbRating
                        count={5}
                        showRating={false}
                        // reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                        defaultRating={0}
                        size={30}
                    />
                </View> : null}

            </View>

            // </View>
        )
    }
}



export default TransactionComponent;

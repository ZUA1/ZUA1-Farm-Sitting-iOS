import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import styles from './Styles';
import Button from '../../Button/Button';
import {AirbnbRating} from 'react-native-ratings';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {color} from 'react-native-reanimated';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import moment from 'moment';
//import { calcCrow } from '../../../utils/utils'

const statusData = {
  pending: {
    color: colors.app_dark_grey,
    text: 'Pending',
    text_buyer: 'Pending',
  },
  waiting: {color: colors.app_ruby, text: 'Waiting', text_buyer: 'Waiting'},
  ongoing: {color: colors.app_ruby, text: 'Ongoing', text_buyer: 'Ongoing'},
  confirm: {
    color: colors.app_ruby,
    text: 'Needs Confirmation',
    text_buyer: 'Waiting on Client',
  },
  completed: {
    color: colors.app_green,
    text: 'Completed',
    text_buyer: 'Completed',
  },
};

class JobItemComponent extends React.Component {
  actionJob(cmd, job) {
    this.props.onCommand && this.props.onCommand(cmd, job);
  }

  render() {
    const isSeller = this.props.viewtype == 'seller' ? true : false;
    const job = this.props.data;
    const statusColor = statusData[job.status]?.color;

    let statusText = ' - ';
    if (statusData[job.status]) {
      statusText = isSeller
        ? statusData[job.status].text
        : statusData[job.status].text_buyer;
    }

    //let distance = null;
    //if (this.props.location && job.location) {
    //    distance = calcCrow(job.location.latitude, job.location.longitude, this.props.location.latitude, this.props.location.longitude);
    //}
    return (
      // <View style={styles.mainContainer}>
      <View style={styles.mainCard}>
        <View style={styles.nameAndIcon}>
          <View style={styles.name}>
            <Text style={styles.CilentName}>
              {isSeller ? 'Hired' : 'Client'}:{' '}
            </Text>
            <Text style={styles.titleName}>
              {isSeller ? job.buyer?.name || '-' : job.poster?.name || '-'}
            </Text>
          </View>
          {this.props.userId && (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => {
                const isSeller = job.poster?.id == this.props.userId;
                if (isSeller && job.status == 'waiting') {
                  this.props.navigation.navigate('Messages', {job: job});
                } else {
                  this.props.navigation.navigate('ServiceChat', {job: job});
                }
              }}>
              <Image
                style={styles.rightIconStyle}
                source={images.ic_messaging}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.price}>
          <Text style={styles.pricetextStyle}>${job.cost}</Text>
        </View>
        <View style={styles.job}>
          <View style={styles.jobTextView}>
            <Text style={styles.jobTextStyle}>Job Offer</Text>
          </View>
          {(isSeller || job.status != 'waiting') && (
            <View style={styles.statusStyle}>
              <View
                style={[styles.statusStyleOngoing, {borderColor: statusColor}]}>
                {job.status == 'completed' ? (
                  <Image
                    source={images.check_icon_green}
                    style={[styles.checkImageStyles, {tintColor: statusColor}]}
                  />
                ) : null}
                <Text style={[styles.ongoingTextStyle, {color: statusColor}]}>
                  {statusText}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.divider}></View>
        <View style={styles.locationStyle}>
          <View style={styles.locationIcon}>
            <Image style={styles.locationStyleIcon} source={images.ic_maker} />
          </View>
          <TouchableOpacity
            style={styles.locationName}
            onPress={() => {
              this.props.navigation.navigate('Directions', {job: job});
            }}>
            <Text style={styles.locationNameStyle}>Farm House Location</Text>
          </TouchableOpacity>

          {!isSeller && job.distance ? (
            <>
              <View style={styles.awayIcon}>
                <Image style={styles.awayIconStyle} source={images.ic_ruler} />
              </View>
              <View style={styles.awayText}>
                <Text style={styles.awayTextStyle}>
                  {job.distance.toFixed(2)} km away
                </Text>
              </View>
            </>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.startDate}>
          <View style={styles.startDateText}>
            <Text style={styles.startDateStyle}>Start Date:</Text>
          </View>
          <View style={styles.startDateNumber}>
            <Text style={styles.EndDateStyle}>
              {moment(job.startDate).format('YYYY/MM/DD hh:mm:ss')}
            </Text>
          </View>
        </View>

        <View style={styles.startDate}>
          <View style={styles.startDateText}>
            <Text style={styles.startDateStyle}>End Date:</Text>
          </View>
          <View style={styles.startDateNumber}>
            <Text style={styles.EndDateStyle}>
              {moment(job.endDate).format('YYYY/MM/DD hh:mm:ss')}
            </Text>
          </View>
        </View>

        {!isSeller && job.status == 'waiting' && (
          <TouchableOpacity
            style={styles.viewInformation}
            onPress={() => {
              this.props.navigation.navigate('JobDetails', {job: job});
            }}>
            <Text style={styles.viewInformationStyle}>
              View Farm House information
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.jobDescription}>
          <Text style={styles.jobDescriptionStyle}>
            {isSeller ? 'Additional Notes' : 'Job Desciption'}:
          </Text>
        </View>
        <View style={styles.jobDescriptionInfo}>
          <Text style={styles.jobDescriptionInfoStyle}>{job.note}</Text>
        </View>

        {job.status == 'pending' && (
          <View style={styles.button}>
            <Button
              style={styles.buttonStyles}
              title="Pay"
              titleColor={colors.white}
              bgColor={colors.app_ruby}
              titleStyle={[styles.titleStyles, {color: colors.white}]}
              onPress={() => {
                this.props.navigation.navigate('Payments', {job: job});
              }}
            />
          </View>
        )}

        {job.status == 'waiting' &&
          (isSeller ? (
            <View style={styles.button}>
              <Button
                style={styles.buttonStyles}
                title="Waiting"
                titleColor={colors.white}
                bgColor={colors.app_light_grey}
                titleStyle={[styles.titleStyles, {color: colors.white}]}
                //onPress={()=> {this.actionJob('cancel', job)}}
              />
            </View>
          ) : (
            <View style={styles.button}>
              <Button
                style={styles.buttonStyles}
                title="Accept Job"
                titleColor={colors.white}
                bgColor={colors.app_green}
                titleStyle={[styles.titleStyles, {color: colors.white}]}
                onPress={() => {
                  this.actionJob('accept', job);
                }}
              />
            </View>
          ))}

        {job.status == 'confirm' &&
          (isSeller ? (
            <View style={styles.button}>
              <Button
                style={styles.buttonStyles}
                title="Confirm Job Done"
                titleColor={colors.white}
                bgColor={colors.app_green}
                titleStyle={[styles.titleStyles, {color: colors.white}]}
                onPress={() => {
                  this.actionJob('confirm', job);
                }}
              />
            </View>
          ) : (
            <View style={styles.button}>
              {/*
                        <Button
                            style={styles.buttonStyles}
                            title="Waiting Confirm"
                            titleColor={colors.white}
                            bgColor={colors.app_dark_grey}
                            titleStyle={[styles.titleStyles, { color: colors.white }]}
                            //onPress={()=> {}}
                        />
                        */}
              <View style={styles.awaitingButton}>
                <Text style={styles.awaitingStyle}>Awaiting Confirmation</Text>
              </View>
            </View>
          ))}
        {job.status == 'ongoing' &&
          (isSeller ? (
            <View style={styles.button}>
              <Button
                style={styles.buttonStyles}
                title="Cancel Job"
                titleColor={colors.white}
                bgColor={colors.app_ruby}
                titleStyle={[styles.titleStyles, {color: colors.white}]}
                onPress={() => {
                  this.actionJob('cancel', job);
                }}
              />
            </View>
          ) : (
            <View style={styles.buttons}>
              <View style={styles.joinButton}>
                <Button
                  width={'90%'}
                  // style={styles.buttonStyles}
                  title={'Job Done'}
                  titleColor={colors.white}
                  bgColor={colors.app_green}
                  titleStyle={[styles.titleStyles, {color: colors.white}]}
                  onPress={() => {
                    this.actionJob('complete', job);
                  }}
                />
              </View>
              <View style={styles.cancelButton}>
                <Button
                  width={'90%'}
                  // style={styles.buttonStyles}
                  title={'Cancel Job'}
                  titleColor={colors.white}
                  // bgColor={colors.app_ruby}
                  titleStyle={[styles.titleStyles, {color: colors.white}]}
                  onPress={() => {
                    this.actionJob('cancel', job);
                  }}
                />
              </View>
            </View>
          ))}

        {job.status == 'completed' && (
          <>
            <View style={styles.divider}></View>
            <View style={styles.ratingButton}>
              <TouchableOpacity
                onPress={() => {
                  if (isSeller && !job.review_from_seller) {
                    this.props.navigation.navigate('RateClient', {
                      job: job,
                      isSeller,
                    });
                  } else if (!isSeller && !job.review_from_buyer) {
                    this.props.navigation.navigate('RateClient', {
                      job: job,
                      isSeller,
                    });
                  }
                }}>
                <AirbnbRating
                  count={5}
                  showRating={false}
                  defaultRating={
                    (isSeller
                      ? job.review_from_buyer?.rate
                      : job.review_from_seller?.rate) || 0
                  }
                  isDisabled={true}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      // </View>
    );
  }
}

export default JobItemComponent;

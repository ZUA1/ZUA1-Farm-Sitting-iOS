//====> System files <====//

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {updateUser, updateUserProfile} from '../reducers/user';
import {store} from '../../App';
import {CommonActions} from '@react-navigation/native';
//====> Local files <====//

import styles from '../Components/AppComponents/MyNav/styles';
import SplashScreen from './SplashScreen/SplashScreen';
import {DrawerItem} from '@react-navigation/drawer';
import OnBoarding from './OnBoarding/OnBoarding';
import images from '../../assets/images';
import AddFarmAnimal from './NewScreens/AddFarmAnimal/AddFarmAnimal';
import TransactionComponent from '../Components/AppComponents/TransactionComponent/TransactionComponent';
import EditFarmAnimal from './NewScreens/EditFarmAnimal/EditFarmAnimal';
import CowImageComponent from '../Components/AppComponents/CowImageComponent/CowImageComponent';
import AddPlant from './NewScreens/AddPlant/AddPlant';
import EditPlant from './NewScreens/EditPlant/EditPlant';
import VetInformation from './NewScreens/VetInformation/VetInformation';
import EditVetInformation from './NewScreens/EditVetInformation/EditVetInformation';
import FarmInformation from './NewScreens/FarmInformation/FarmInformation';
import FarmInformationComponent from '../Components/AppComponents/FarmInformationComponent/FarmInformationComponent';
import MyProfile from './NewScreens/MyProfile/MyProfile';
import EditProfile from './NewScreens/EditProfileScreen/View';
import ReviewComponent from '../Components/AppComponents/ReviewComponent/ReviewComponent';
import Home from './NewScreens/Home/Home';
import Directions from './NewScreens/Directions/Directions';
import ConfirmDelivery from './NewScreens/ConfirmDelivery/ConfirmDelivery';
import RateClient from './NewScreens/RateClient/RateClient';
import MessagesComponent from '../Components/AppComponents/MessagesComponent/MessagesComponent';
import Messages from './NewScreens/Messages/Messages';
import ServiceChat from './NewScreens/ServiceChat/ServiceChat';
//import Chat from './NewScreens/Chat/Chat';
import Payments from './NewScreens/Payments/Payments';
import JobAdd from './NewScreens/JobAdd/JobAdd';
import JobDetailsComponent from '../Components/AppComponents/JobDetailsComponent/JobDetailsComponent';
import JobItemComponent from '../Components/AppComponents/JobItemComponent/JobItemComponent';
import JobDetails from './NewScreens/JobDetails/JobDetails';
import Transaction from './NewScreens/Transactions/Transaction';
import SettingsScreen from './NewScreens/SettingScreens/SettingScreen/View';
import SignupWith from './NewScreens/AuthScreens/SignupScreens/SignupWithScreen/View';
import SignUpScreen from './NewScreens/AuthScreens/SignupScreens/SignupScreen/View';
import LoginScreen from './NewScreens/AuthScreens/LoginScreens/LoginScreen/View';
import SelectUserTypeScreen from './NewScreens/AuthScreens/SignupScreens/SelectUserType/SelectUserType';
import ResetPassword from './NewScreens/AuthScreens/LoginScreens/ResetPasswordScreen/View';
import NewPassword from './NewScreens/AuthScreens/LoginScreens/EnterNewPasswordScreen/View';
import TermsAndCondtions from './NewScreens/SettingScreens/TermConditionScreen/View';
import PrivacyScreen from './NewScreens/SettingScreens/PrivacyScreen/View';
import SendFeedback from './NewScreens/SettingScreens/SendFeedBackScreen/View';
import AboutAppScreen from './NewScreens/SettingScreens/AboutAppScreen/View';
import PaymentsBalance from './NewScreens/PaymentsBalance/PaymentsBalance';
import GetAddress from './NewScreens/GetAddress/View';
import AttachDocumentScreen from './NewScreens/AuthScreens/SignupScreens/AttachDocumentScreen/View';

//================================ Drawer Function ======================================//
function CustomDrawerContent(props) {
  const {user, profile} = store.getState().user;
  return (
    <ImageBackground
      {...props}
      style={styles.drawerMainContainer}
      source={images.bg_img}>
      <View style={styles.userInfoContainer}>
        <TouchableOpacity
          style={styles.userImageContainer}
          // onPress={() => props.navigation.navigate('MyProfile')}
        >
          {/*
                    <Image source={images.avatar} style={styles.userProfileImage} resizeMode={"contain"} />
                    */}
          <Image
            source={
              profile && profile.avatar
                ? {uri: (profile && profile.avatar) || ''}
                : require('../../assets/images/user.png')
            }
            style={styles.userProfileImage}
          />
        </TouchableOpacity>
        {
          /*
                <TouchableOpacity style={styles.userTextContainer}>
                    <Text style={styles.userNameText}>Hi, John</Text>
                </TouchableOpacity>
                */
          profile?.name || profile?.displayName ? (
            <TouchableOpacity
              style={styles.userTextContainer}
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate('EditProfile');
              }}>
              <Text style={styles.userNameText}>
                Hi, {profile.name || profile.displayName}
              </Text>
            </TouchableOpacity>
          ) : null
        }
      </View>
      <View style={styles.drawerItemsContainer}>
        <DrawerItem
          style={[styles.drawerItemStyles]}
          label={() => <Text style={styles.drawerItemLabelText}>{'Home'}</Text>}
          icon={() => (
            <Image source={images.ic_home} style={[styles.drawerItemImage]} />
          )}
          onPress={() => props.navigation.navigate('Home')}
        />

        {user && (
          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={styles.drawerItemLabelText}>{'Transactions'}</Text>
            )}
            icon={() => (
              <Image
                source={images.ic_transaction}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() => props.navigation.navigate('Transaction')}
          />
        )}

        {user && (
          <DrawerItem
            style={[styles.drawerItemStyles]}
            label={() => (
              <Text style={styles.drawerItemLabelText}>{'Messaging'}</Text>
            )}
            icon={() => (
              <Image
                source={images.ic_messaging}
                style={[styles.drawerItemImage]}
              />
            )}
            onPress={() =>
              props.navigation.navigate('Messages', {userId: user.uid})
            }
          />
        )}

        {user && (
          <DrawerItem
            style={styles.drawerItemStyles}
            label={() => (
              <Text style={styles.drawerItemLabelText}>{'My Profile'}</Text>
            )}
            icon={() => (
              <Image
                source={images.ic_user}
                style={[styles.drawerItemImage, {tintColor: '#c6667a'}]}
              />
            )}
            onPress={() => props.navigation.navigate('MyProfile')}
          />
        )}

        <DrawerItem
          style={styles.drawerItemStyles}
          label={() => (
            <Text style={styles.drawerItemLabelText}>{'Settings'}</Text>
          )}
          icon={() => (
            <Image
              source={images.ic_settings}
              style={[styles.drawerItemImage]}
            />
          )}
          onPress={() => props.navigation.navigate('SettingsScreen')}
        />

        {user ? (
          <DrawerItem
            style={styles.drawerItemStyles}
            label={() => (
              <Text style={styles.drawerItemLabelText}>{'Logout'}</Text>
            )}
            icon={() => (
              <Image source={images.ic_logout} style={styles.drawerItemImage} />
            )}
            onPress={() => {
              try {
                auth()
                  .signOut()
                  .then(() => {
                    store.dispatch(updateUser());
                    props.navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [
                          {name: 'SignupWith'},
                          {
                            name: 'SignupWith',
                          },
                        ],
                      }),
                    );
                    console.log('User signed out!');
                  })
                  .catch((e) => {
                    store.dispatch(updateUser());
                  });
              } catch (e) {
                store.dispatch(updateUser());
                return;
              }
            }}
          />
        ) : (
          <DrawerItem
            style={styles.drawerItemStyles}
            label={() => (
              <Text style={styles.drawerItemLabelText}>{'Login'}</Text>
            )}
            icon={() => (
              <Image source={images.ic_logout} style={styles.drawerItemImage} />
            )}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('SignupWith');
            }}
          />
        )}

        {/*<DrawerItem*/}
        {/*    style={[styles.drawerItemStyles, { marginTop: wp(35) }]}*/}
        {/*    label={() => <Text style={styles.drawerItemLabelText} >{"Switch to Seller Account"}</Text>}*/}
        {/*    icon={() => <Image source={images.ic_switch_to_buyer} style={styles.drawerItemImage}*/}
        {/*    />}*/}
        {/*//

                {/*<DrawerItem style={[styles.drawerItemStylesLogin, { backgroundColor: colors.AppRedColor, }]}*/}
        {/*            label={() => <Text style={[styles.drawerItemLabelText, { color: colors.bright_red, fontWeight: 'bold' }]}>{"Logout"}</Text>}*/}
        {/*            icon={() => <Image source={images.ic_logout_settings} style={[styles.drawerItemImage, { tintColor: colors.bright_red }]} />}*/}
        {/*            onPress={() => props.navigation.navigate('LoginScreen')} />*/}
      </View>
    </ImageBackground>
  );
}

//================================ Drawer Navigator ======================================//

const Drawer = createDrawerNavigator();
function drawerNav() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => CustomDrawerContent(props)}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Transaction" component={Transaction} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
    </Drawer.Navigator>
  );
}

const RootStack = createStackNavigator();

export default function Stack() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        headerMode={'none'}
        initialRouteName={'SplashScreen'}
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {/*Farm Screens*/}
        <RootStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="SignupWith"
          component={SignupWith}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="SelectUserTypeScreen"
          component={SelectUserTypeScreen}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="AttachDocumentScreen"
          component={AttachDocumentScreen}
          options={{gestureEnabled: false}}
        />

        <RootStack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="TermsAndCondtions"
          component={TermsAndCondtions}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="PrivacyScreen"
          component={PrivacyScreen}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="SendFeedback"
          component={SendFeedback}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="AboutAppScreen"
          component={AboutAppScreen}
          options={{gestureEnabled: false}}
        />

        <RootStack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{gestureEnabled: false}}
        />

        <RootStack.Screen
          name="AddFarmAnimal"
          component={AddFarmAnimal}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="EditFarmAnimal"
          component={EditFarmAnimal}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="AddPlant"
          component={AddPlant}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen name="EditPlant" component={EditPlant} />
        <RootStack.Screen
          name="VetInformation"
          component={VetInformation}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="EditVetInformation"
          component={EditVetInformation}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="FarmInformation"
          component={FarmInformation}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="Directions"
          component={Directions}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="ConfirmDelivery"
          component={ConfirmDelivery}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="RateClient"
          component={RateClient}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="Messages"
          component={Messages}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="ServiceChat"
          component={ServiceChat}
          options={{gestureEnabled: false}}
        />
        {/* <RootStack.Screen name="Chat" component={Chat} options={{ gestureEnabled: false }} /> */}
        <RootStack.Screen
          name="Payments"
          component={Payments}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="JobAdd"
          component={JobAdd}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="JobDetails"
          component={JobDetails}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="PaymentsBalance"
          component={PaymentsBalance}
          options={{gestureEnabled: false}}
        />

        <RootStack.Screen
          name="drawer"
          component={drawerNav}
          options={{gestureEnabled: false}}
        />

        {/*<RootStack.Screen name="Home" component={Home} />*/}
        {/*<RootStack.Screen name="MyProfile" component={MyProfile} />*/}

        {/*Farm Components*/}
        {/*<RootStack.Screen name="TransactionComponent" component={TransactionComponent} />*/}
        <RootStack.Screen
          name="CowImageComponent"
          component={CowImageComponent}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="FarmInformationComponent"
          component={FarmInformationComponent}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="ReviewComponent"
          component={ReviewComponent}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="MessagesComponent"
          component={MessagesComponent}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="JobDetailsComponent"
          component={JobDetailsComponent}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="JobItemComponent"
          component={JobItemComponent}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen
          name="TransactionComponent"
          component={TransactionComponent}
          options={{gestureEnabled: false}}
        />

        <RootStack.Screen
          name="GetAddress"
          component={GetAddress}
          options={{gestureEnabled: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

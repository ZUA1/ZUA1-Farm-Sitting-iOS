
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, ScrollView, Text, StatusBar } from 'react-native';
import React from 'react';
import RenderHtml from 'react-native-render-html';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader';
import colors from '../../../../../assets/colors';
import images from '../../../../../assets/images';
import styles from './Styles';

const source = {
    html: `<p style="text-align: center">[FARM SITTING SERVICES]</p>
    <p>Last updated [February 3, 2021]</p>
    <p>[FARM SITTING SERVICES] (&ldquo;we&rdquo; or &ldquo;us&rdquo; or &ldquo;our&rdquo;) respects the privacy of our users (&ldquo;user&rdquo; or &ldquo;you&rdquo;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our mobile application (the &ldquo;Application&rdquo;). &nbsp;&nbsp;Please read this Privacy Policy carefully.&nbsp; IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS THE APPLICATION.</p>
    <p>We reserve the right to make changes to this Privacy Policy at any time and for any reason.&nbsp; We will alert you about any changes by updating the &ldquo;Last updated&rdquo; date of this Privacy Policy.&nbsp; You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Application after the date such revised Privacy Policy is posted.&nbsp;</p>
    <p>This Privacy Policy does not apply to the third-party online/mobile store from which you install the Application or make payments, including any in-game virtual items, which may also collect and use data about you.&nbsp; We are not responsible for any of the data collected by any such third party.</p>
    <h1>COLLECTION OF YOUR INFORMATION</h1>
    <p>We may collect information about you in a variety of ways.&nbsp; The information we may collect via the Application depends on the content and materials you use, and includes:&nbsp;</p>
    <h2>Personal Data</h2>
    <p>Demographic and other personally identifiable information (such as your name and email address) that you voluntarily give to us when choosing to participate in various activities related to the Application, such as chat, posting messages in comment sections or in our forums, liking posts, sending feedback, and responding to surveys.&nbsp; If you choose to share data about yourself via your profile, online chat, or other interactive areas of the Application, please be advised that all data you disclose in these areas is public and your data will be accessible to anyone who accesses the Application.</p>
    <h2>Derivative Data&nbsp;</h2>
    <p>Information our servers automatically collect when you access the Application, such as your native actions that are integral to the Application, including liking, re-blogging, or replying to a post, as well as other interactions with the Application and other users via server log files.&nbsp;</p>
    <h2>Financial Data</h2>
    <p>Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Application. [We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor,<a href="https://stripe.com/us/privacy/"> Stripe,</a> and you are encouraged to review their privacy policy and contact them directly for responses to your questions.</p>
    <h2>Facebook Permissions&nbsp;</h2>
    <p>The Application may by default access your<a href="https://www.facebook.com/about/privacy/"> Facebook</a> basic account information, including your name, email, gender, birthday, current city, and profile picture URL, as well as other information that you choose to make public. We may also request access to other permissions related to your account, such as friends, checkins, and likes, and you may choose to grant or deny us access to each individual permission. For more information regarding Facebook permissions, refer to the<a href="https://developers.facebook.com/docs/facebook-login/permissions"> Facebook Permissions Reference</a> page.</p>
    <h2>Data from Social Networks&nbsp;</h2>
    <p>User information from social networking sites, such as [Apple&rsquo;s Game Center, Facebook, Google+ Instagram, Pinterest, Twitter], including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks. This information may also include the contact information of anyone you invite to use and/or join the Application.</p>
    <h2>Geo-Location Information</h2>
    <p>We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using the Application, to provide location-based services. If you wish to change our access or permissions, you may do so in your device&rsquo;s settings.</p>
    <h2>Mobile Device Access</h2>
    <p>We may request access or permission to certain features from your mobile device, including your mobile device&rsquo;s [bluetooth, calendar, camera, contacts, microphone, reminders, sensors, SMS messages, social media accounts, storage,] and other features. If you wish to change our access or permissions, you may do so in your device&rsquo;s settings.</p>
    <h2>Mobile Device Data</h2>
    <p>Device information such as your mobile device ID number, model, and manufacturer, version of your operating system, phone number, country, location, and any other data you choose to provide.</p>
    <h2>Push Notifications</h2>
    <p>We may request to send you push notifications regarding your account or the Application. If you wish to opt-out from receiving these types of communications, you may turn them off in your device&rsquo;s settings.</p>
    <h2>Third-Party Data</h2>
    <p>Information from third parties, such as personal information or network friends, if you connect your account to the third party and grant the Application permission to access this information.</p>
    <h2>Data From Contests, Giveaways, and Surveys</h2>
    <p>Personal and other information you may provide when entering contests or giveaways and/or responding to surveys.</p>
    <h1>USE OF YOUR INFORMATION</h1>
    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience.&nbsp; Specifically, we may use information collected about you via the Application to:</p>
    <p>1. &nbsp;&nbsp;&nbsp; Administer sweepstakes, promotions, and contests.</p>
    <p>2. &nbsp;&nbsp;&nbsp; Assist law enforcement and respond to subpoena.</p>
    <p>3. &nbsp;&nbsp;&nbsp; Compile anonymous statistical data and analysis for use internally or with third parties.</p>
    <p>4. &nbsp;&nbsp;&nbsp; Create and manage your account.</p>
    <p>5. &nbsp;&nbsp;&nbsp; Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Application to you.</p>
    <p>6. &nbsp;&nbsp;&nbsp; Email you regarding your account or order.</p>
    <p>7. &nbsp;&nbsp;&nbsp; Enable user-to-user communications.</p>
    <p>8. &nbsp;&nbsp;&nbsp; Fulfill and manage purchases, orders, payments, and other transactions related to the Application.</p>
    <p>9. &nbsp;&nbsp;&nbsp; Generate a personal profile about you to make future visits to the Application more personalized.</p>
    <p>10.&nbsp; Increase the efficiency and operation of the Application.</p>
    <p>11.&nbsp; Monitor and analyze usage and trends to improve your experience with the Application.</p>
    <p>12.&nbsp; Notify you of updates to the Application.</p>
    <p>13.&nbsp; Offer new products, services, mobile applications, and/or recommendations to you.</p>
    <p>14.&nbsp; Perform other business activities as needed.</p>
    <p>15.&nbsp; Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</p>
    <p>16.&nbsp; Process payments and refunds.</p>
    <p>17.&nbsp; Request feedback and contact you about your use of the Application.</p>
    <p>18.&nbsp; Resolve disputes and troubleshoot problems.</p>
    <p>19.&nbsp; Respond to product and customer service requests.</p>
    <p>20.&nbsp; Send you a newsletter.</p>
    <p>21.&nbsp; Solicit support for the Application.</p>
    <p>22.&nbsp; [Other]</p>
    <h1>DISCLOSURE OF YOUR INFORMATION</h1>
    <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
    <h2>By Law or to Protect Rights</h2>
    <p>If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.&nbsp; This includes exchanging information with other entities for fraud protection and credit risk reduction.</p>
    <h2>Third-Party Service Providers</h2>
    <p>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.&nbsp;</p>
    <h2>Marketing Communications</h2>
    <p>With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.</p>
    <h2>Interactions with Other Users</h2>
    <p>If you interact with other users of the Application, those users may see your name, profile photo, and descriptions of your activity, including sending invitations to other users, chatting with other users, liking posts, following blogs.</p>
    <h2>Online Postings</h2>
    <p>When you post comments, contributions or other content to the Applications, your posts may be viewed by all users and may be publicly distributed outside the Application in perpetuity</p>
    <h2>Third-Party Advertisers</h2>
    <p>We may use third-party advertising companies to serve ads when you visit the Application. These companies may use information about your visits to the Application and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.</p>
    <h2>Affiliates</h2>
    <p>We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</p>
    <h2>Business Partners</h2>
    <p>We may share your information with our business partners to offer you certain products, services or promotions.</p>
    <h2>Offer Wall&nbsp;</h2>
    <p>The Application may display a third-party-hosted &ldquo;offer wall.&rdquo;&nbsp; Such an offer wall allows third-party advertisers to offer virtual currency, gifts, or other items to users in return for acceptance and completion of an advertisement offer.&nbsp; Such an offer wall may appear in the Application and be displayed to you based on certain data, such as your geographic area or demographic information.&nbsp; When you click on an offer wall, you will leave the Application.&nbsp; A unique identifier, such as your user ID, will be shared with the offer wall provider in order to prevent fraud and properly credit your account.&nbsp; &nbsp;&nbsp;</p>
    <h2>Social Media Contacts&nbsp;</h2>
    <p>If you connect to the Application through a social network, your contacts on the social network will see your name, profile photo, and descriptions of your activity.</p>
    <h2>Other Third Parties</h2>
    <p>We may share your information with advertisers and investors for the purpose of conducting general business analysis. We may also share your information with such third parties for marketing purposes, as permitted by law.</p>
    <h2>Sale or Bankruptcy</h2>
    <p>If we reorganize or sell all or a portion of our assets, undergo a merger, or are acquired by another entity, we may transfer your information to the successor entity.&nbsp; If we go out of business or enter bankruptcy, your information would be an asset transferred or acquired by a third party.&nbsp; You acknowledge that such transfers may occur and that the transferee may decline honor commitments we made in this Privacy Policy.</p>
    <p>We are not responsible for the actions of third parties with whom you share personal or sensitive data, and we have no authority to manage or control third-party solicitations.&nbsp; If you no longer wish to receive correspondence, emails or other communications from third parties, you are responsible for contacting the third party directly.</p>
    <h1>TRACKING TECHNOLOGIES</h1>
    <h2>Cookies and Web Beacons</h2>
    <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Application to help customize the Application and improve your experience. When you access the Application, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Application. You may not decline web beacons. However, they can be rendered ineffective by declining all cookies or by modifying your web browser&rsquo;s settings to notify you each time a cookie is tendered, permitting you to accept or decline cookies on an individual basis.</p>
    <h2>Internet-Based Advertising</h2>
    <p>Additionally, we may use third-party software to serve ads on the Application, implement email marketing campaigns, and manage other interactive marketing initiatives.&nbsp; This third-party software may use cookies or similar tracking technology to help manage and optimize your online experience with us.&nbsp; For more information about opting-out of interest-based ads, visit the<a href="http://www.networkadvertising.org/choices/"> Network Advertising Initiative Opt-Out Tool</a> or<a href="http://www.aboutads.info/choices/"> Digital Advertising Alliance Opt-Out Tool</a>.</p>
    <h1>THIRD-PARTY WEBSITES</h1>
    <p>The Application may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Application, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices (if any) of the third party responsible for that website, and should take those steps necessary to, in your discretion, protect the privacy of your information. We are not responsible for the content or privacy and security practices and policies of any third parties, including other sites, services or applications that may be linked to or from the Application.</p>
    <h1>SECURITY OF YOUR INFORMATION</h1>
    <p>We use administrative, technical, and physical security measures to help protect your personal information.&nbsp; While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.&nbsp; Any information disclosed online is vulnerable to interception and misuse by unauthorized parties.&nbsp; Therefore, we cannot guarantee complete security if you provide personal information.</p>
    <h1>POLICY FOR CHILDREN</h1>
    <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>
    <h1>CONTROLS FOR DO-NOT-TRACK FEATURES&nbsp;</h1>
    <p>Most web browsers and some mobile operating systems [and our mobile applications] include a Do-Not-Track (&ldquo;DNT&rdquo;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected.&nbsp; No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.&nbsp; If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.&nbsp;</p>
    <h1>OPTIONS REGARDING YOUR INFORMATION</h1>
    <h2>[Account Information</h2>
    <p>You may at any time review or change the information in your account or terminate your account by:</p>
    <p>●&nbsp; &nbsp;&nbsp;&nbsp; Logging into your account settings and updating your account</p>
    <p>●&nbsp; &nbsp;&nbsp;&nbsp; Contacting us using the contact information provided below</p>
    <p>●&nbsp; &nbsp;&nbsp;&nbsp; [Other]</p>
    <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.]</p>
    <h2>Emails and Communications</h2>
    <p>If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:</p>
    <p>●&nbsp; &nbsp;&nbsp;&nbsp; Noting your preferences at the time you register your account with the Application</p>
    <p>●&nbsp; &nbsp;&nbsp;&nbsp; Logging into your account settings and updating your preferences.</p>
    <p>●&nbsp; &nbsp;&nbsp;&nbsp; Contacting us using the contact information provided below</p>
    <p>If you no longer wish to receive correspondence, emails, or other communications from third parties, you are responsible for contacting the third party directly.</p>
    <h1>CALIFORNIA PRIVACY RIGHTS</h1>
    <p>California Civil Code Section 1798.83, also known as the &ldquo;Shine The Light&rdquo; law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>
    <p>If you are under 18 years of age, reside in California, and have a registered account with the Application, you have the right to request removal of unwanted data that you publicly post on the Application. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California.&nbsp; We will make sure the data is not publicly displayed on the Application, but please be aware that the data may not be completely or comprehensively removed from our systems.</p>
    <h1>CONTACT US</h1>
    <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
    <p>[FARM SITTING SERVICES ]</p>
    <p>[11175 E. SOUTH AVE]</p>
    <p>DEL REY, CA, 93616]</p>
    <p>5598178649 OR 5593938250]</p>
    <p>[Fax Number]</p>
    <p>Dink1333@live.com or shelbyball71@gmail.com]</p>
    `
  };
class PrivacyScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (

            <View style={styles.mainContainer}>

                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />

                {/* //================================ Header ======================================// */}

                <View style={styles.headerView}>

                    <AppHeader title={'Privacy Policy'}
                               leftIconPath={images.ic_back}
                               onLeftIconPress={()=> this.props.navigation.goBack()}
                    />
                </View>

                {/* //================================ Text Container ======================================// */}

                <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 40}}>
                    {/*
                    <Text style={styles.textContainer}>
                        {this.state.dummyText}
                    </Text>
                    */}
                    <RenderHtml html={source.html} />
                </ScrollView>
            </View>
        )
    }
}
export default PrivacyScreen;

/**
 * Created by sohobloo on 16/9/13.
 */

'use strict';

import React, {
    Component,
} from 'react';

import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    ActivityIndicator,
    Image, Platform
} from 'react-native';

import ListView from "deprecated-react-native-listview";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


import PropTypes from 'prop-types';
import images from '../../assets/images';
import colors from '../../assets/colors';

const TOUCHABLE_ELEMENTS = [
    'TouchableHighlight',
    'TouchableOpacity',
    'TouchableWithoutFeedback',
    'TouchableNativeFeedback'
];

export default class Dropdown extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        scrollEnabled: PropTypes.bool,
        defaultIndex: PropTypes.number,
        defaultButtontext: PropTypes.string,
        options: PropTypes.array,
        accessible: PropTypes.bool,
        animated: PropTypes.bool,
        showsVerticalScrollIndicator: PropTypes.bool,
        keyboardShouldPersistTaps: PropTypes.string,

        style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        dropdownStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        dropdownTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        dropdownTextHighlightStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

        adjustFrame: PropTypes.func,
        renderRow: PropTypes.func,
        renderSeparator: PropTypes.func,
        renderButtonText: PropTypes.func,

        onDropdownWillShow: PropTypes.func,
        onDropdownWillHide: PropTypes.func,
        onSelect: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        scrollEnabled: true,
        defaultIndex: -1,
        defaultButtontext: 'Please select...',
        options: null,
        animated: true,
        showsVerticalScrollIndicator: true,
        keyboardShouldPersistTaps: 'never'
    };

    constructor(props) {
        super(props);

        this._button = null;
        this._buttonFrame = null;
        this._nextValue = null;
        this._nextIndex = null;

        this.state = {
            accessible: !!props.accessible,
            loading: !props.options,
            showDropdown: false,
            buttonText: props.defaultButtontext,
            selectedIndex: props.defaultIndexxx
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let {buttonText, selectedIndex} = this.state;
        const {defaultIndex, defaultButtontext, options} = nextProps;
        buttonText = this._nextValue == null ? buttonText : this._nextValue;
        selectedIndex = this._nextIndex == null ? selectedIndex : this._nextIndex;
        if (selectedIndex < 0) {
            selectedIndex = defaultIndex;
            if (selectedIndex < 0) {
                buttonText = defaultButtontext;
            }
        }
        this._nextValue = null;
        this._nextIndex = null;

        this.setState({
            loading: !options,
            buttonText,
            selectedIndex
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.defaultButtontext !== prevProps.defaultButtontext) {
            this.setState({buttonText: this.props.defaultButtontext})
        }
    }

    render() {
        // const { previousProps }= {...this.props}
        return (
            <View  {...this.props} >
                    {this._renderButton()}
                {this._renderModal()}
            </View>
        );
    }

    _updatePosition(callback) {
        if (this._button && this._button.measure) {
            this._button.measure((fx, fy, width, height, px, py) => {
                this._buttonFrame = {x: px, y: py, w: width, h: height};
                callback && callback();
            });
        }
    }

    show() {
        this._updatePosition(() => {
            this.setState({
                showDropdown: true
            });
        });
    }

    hide() {
        this.setState({
            showDropdown: false
        });
    }

    select(idx) {
        const {defaultButtontext, options, defaultIndex, renderButtonText} = this.props;

        let value = defaultButtontext;
        if (idx == null || !options || idx >= options.length) {
            idx = defaultIndex;
        }

        if (idx >= 0) {
            value = renderButtonText ? renderButtonText(options[idx]) : options[idx].toString();
        }

        this._nextValue = value;
        this._nextIndex = idx;

        this.setState({
            buttonText: value,
            selectedIndex: idx
        });
    }

    _renderButton() {
        const {disabled, accessible, children,ArrowImages,dropdownHeight,buttonTextStyle, type,showArrow,dropDownImage,placeholderText,dropdownStyle,shadowStyle,arrowStyle} = this.props;
        const {buttonText} = this.state;
            return (
                <TouchableOpacity  ref={button => this._button = button}
                                          disabled={disabled}
                                          accessible={accessible}
                                          onPress={this._onButtonPress}
                >
                    <View style={[styles.button,shadowStyle,dropdownStyle,]}>
                    {buttonText === placeholderText  ?
                        <Text style={[styles.buttonText, buttonTextStyle]}
                              numberOfLines={1}
                        >
                            {buttonText}
                        </Text> : <Text style={[styles.buttonText, buttonTextStyle,]}
                                        numberOfLines={1}
                        >
                            {buttonText}
                        </Text>}

                            {/*<Image style={[styles.loginDropdownImages,arrowStyle]} source={ArrowImages}  />*/}
                    { showArrow === false ?

                            <Image style={[styles.loginDropdownImages,arrowStyle]} source={''}  />

                            : <Image style={[styles.loginDropdownImages,arrowStyle,{tintColor:this.props.tintColor || colors.white}]} source = {dropDownImage  ?  dropDownImage : images.ic_dropdown }    />}
                </View>
                </TouchableOpacity>
            );

    }

    _onButtonPress = () => {
        const {onDropdownWillShow} = this.props;
        if (!onDropdownWillShow ||
            onDropdownWillShow() !== false) {
            this.show();
        }
    };

    _renderModal() {
        const {animated, accessible, dropdownOptionsStyle} = this.props;
        const {showDropdown, loading} = this.state;
        if (showDropdown && this._buttonFrame) {
            const frameStyle = this._calcPosition();
            const animationType = animated ? 'none' : 'fade';
            return (
                <Modal animationType={animationType}
                       visible={true}
                       transparent={true}
                       onRequestClose={this._onRequestClose}
                       supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
                >
                    <TouchableWithoutFeedback accessible={accessible}
                                              disabled={!showDropdown}
                                              onPress={this._onModalPress}
                    >
                        <View style={styles.modal}>
                            <View
                                elevation={10}
                                style={[styles.dropdown, dropdownOptionsStyle, frameStyle,{height:this.props.listViewHeight || '22%',width:this.props.listViewWidth || '100%'}]}>
                                {loading ? this._renderLoading() : this._renderDropdown()}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            );
        }
    }

    _calcPosition() {
        const {dropdownStyle, style, adjustFrame} = this.props;

        const dimensions = Dimensions.get('window');
        const windowWidth = dimensions.width;
        const windowHeight = dimensions.height;

        const dropdownHeight = (dropdownStyle && StyleSheet.flatten(dropdownStyle).height) ||
            StyleSheet.flatten(styles.dropdown).height;

        const bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
        const rightSpace = windowWidth - this._buttonFrame.x;
        const showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
        const showInLeft = rightSpace >= this._buttonFrame.x;

        const positionStyle = {
            height: dropdownHeight,
            top: showInBottom ? this._buttonFrame.y + this._buttonFrame.h : Math.max(0, this._buttonFrame.y - dropdownHeight),
        };

        if (showInLeft) {
            positionStyle.left = this._buttonFrame.x;
        } else {
            const dropdownWidth = (dropdownStyle && StyleSheet.flatten(dropdownStyle).width) ||
                (style && StyleSheet.flatten(style).width) || -1;
            if (dropdownWidth !== -1) {
                positionStyle.width = dropdownWidth;
            }
            positionStyle.right = rightSpace - this._buttonFrame.w;
        }

        return adjustFrame ? adjustFrame(positionStyle) : positionStyle;
    }

    _onRequestClose = () => {
        const {onDropdownWillHide} = this.props;
        if (!onDropdownWillHide ||
            onDropdownWillHide() !== false) {
            this.hide();
        }
    };

    _onModalPress = () => {
        const {onDropdownWillHide} = this.props;
        if (!onDropdownWillHide ||
            onDropdownWillHide() !== false) {
            this.hide();
        }
    };

    _renderLoading() {
        return (
            <ActivityIndicator size='small'/>
        );
    }

    _renderDropdown() {
        const {scrollEnabled, renderSeparator, showsVerticalScrollIndicator, keyboardShouldPersistTaps} = this.props;
        return (
            <ListView scrollEnabled={scrollEnabled}
                      style={styles.list}
                      dataSource={this._dataSource}
                      renderRow={this._renderRow}
                      renderSeparator={renderSeparator || this._renderSeparator}
                      automaticallyAdjustContentInsets={false}
                      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            />
        );
    }

    get _dataSource() {
        const {options} = this.props;
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return ds.cloneWithRows(options);
    }

    _renderRow = (rowData, sectionID, rowID, highlightRow) => {
        const {renderRow, dropdownTextStyle, dropdownTextHighlightStyle, accessible} = this.props;
        const {selectedIndex} = this.state;
        const key = `row_${rowID}`;
        const highlighted = rowID == selectedIndex;
        const row = !renderRow ?
            (<Text style={[
                styles.rowText,
                dropdownTextStyle,
                highlighted && styles.highlightedRowText,
                highlighted && dropdownTextHighlightStyle
            ]}
            >
                {rowData}
            </Text>) :
            renderRow(rowData, rowID, highlighted);
        const preservedProps = {
            key,
            accessible,
            onPress: () => this._onRowPress(rowData, sectionID, rowID, highlightRow),
        };
        if (TOUCHABLE_ELEMENTS.find(name => name == row.type.displayName)) {
            const props = {...row.props};
            props.key = preservedProps.key;
            props.onPress = preservedProps.onPress;
            const {children} = row.props;
            switch (row.type.displayName) {
                case 'TouchableHighlight': {
                    return (
                        <TouchableHighlight {...props}>
                            {children}
                        </TouchableHighlight>
                    );
                }
                case 'TouchableOpacity': {
                    return (
                        <TouchableOpacity {...props}>
                            {children}
                        </TouchableOpacity>
                    );
                }
                case 'TouchableWithoutFeedback': {
                    return (
                        <TouchableWithoutFeedback {...props}>
                            {children}
                        </TouchableWithoutFeedback>
                    );
                }
                case 'TouchableNativeFeedback': {
                    return (
                        <TouchableNativeFeedback {...props}>
                            {children}
                        </TouchableNativeFeedback>
                    );
                }
                default:
                    break;
            }
        }
        return (
            <TouchableHighlight {...preservedProps}>
                {row}
            </TouchableHighlight>
        );
    };

    _onRowPress(rowData, sectionID, rowID, highlightRow) {
        const {onSelect, renderButtonText, onDropdownWillHide} = this.props;
        if (!onSelect || onSelect(rowID, rowData) !== false) {
            highlightRow(sectionID, rowID);
            const value = renderButtonText && renderButtonText(rowData) || rowData.toString();
            this._nextValue = value;
            this._nextIndex = rowID;
            this.setState({
                buttonText: value,
                selectedIndex: rowID
            });
        }
        if (!onDropdownWillHide || onDropdownWillHide() !== false) {
            this.setState({
                showDropdown: false
            });
        }
    }

    _renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
        const key = `spr_${rowID}`;
        return (
            <View style={styles.separator}
                  key={key}
            />
        );
    };
}


const styles = StyleSheet.create({
    loginDropdownImages: {
        width: 12,
        height: 10,
        resizeMode: "contain",
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:40,
        width:"100%",
        marginTop:12
    },
    buttonText: {
            color: colors.placeholder_color,
            width: '90%',
            fontSize: wp('3.9%'),
            // fontFamily: "OpenSans",
            paddingLeft: '2%',
    },
    modal: {
        // height:'10%'
        flexGrow: 1,
    },
    dropdown: {
        // position: 'absolute',
        // height: (2 + StyleSheet.hairlineWidth) * 5,
        // borderWidth: StyleSheet.hairlineWidth,
        // borderColor: 'lightgray',
        borderColor: 'lightgray',
        borderRadius: 2,
        backgroundColor: '#DCDCDC',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    loading: {
        alignSelf: 'center'
    },
    list: {
        // height:'1%'
        // flexGrow: 1,
        // backgroundColor:'green',
    },
    rowText: {
        paddingHorizontal: 6,
        paddingVertical: 10,
        fontSize: wp('3.3%'),
        color: 'black',
        backgroundColor: 'white',
        textAlignVertical: 'center'
    },
    highlightedRowText: {
        color: 'black'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'lightgray'
    }
});

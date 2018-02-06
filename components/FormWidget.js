import React, {PureComponent} from 'react';
import { 
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native';
import {black, gray, lightPurp, white} from '../styles/colors';

class FormWidget extends PureComponent {
    render() {
        const {onCancel, onSubmit, submitBtnText, cancelBtnText} = this.props
        return (
          <View style={styles.formWrapper}>
            <TouchableOpacity style={[styles.btnStyle]} onPress={onSubmit}>
              <Text style={styles.btnTextStyle}>{submitBtnText || 'Submit'}</Text>
            </TouchableOpacity>
            {
              (cancelBtnText && onCancel) ? 
                <TouchableOpacity style={[styles.btnStyle, styles.cancelBtnStyle]} onPress={onCancel}>
                  <Text style={styles.btnTextStyle}>{cancelBtnText || 'Cancel'}</Text>
                </TouchableOpacity>
              : null
            }
          </View>
        )
    }
}

export default FormWidget;

const styles = StyleSheet.create({
    formWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    btnStyle: {
      flex: 1,
      backgroundColor: black,
      padding: 10,
      height: 45,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        ios: {
          borderRadius: 7
        },
        android: {
          paddingLeft: 30,
          paddingRight: 30,
          borderRadius: 2
        }
      })
    },
    cancelBtnStyle: {
      backgroundColor: lightPurp
    },
    submitBtnStyle: {
      backgroundColor: lightPurp,
    },
    btnTextStyle: {
      fontSize: 22,
      textAlign: 'center',
      color: white
    }
  })
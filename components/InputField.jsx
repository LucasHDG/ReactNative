import React from 'react';
import {
  View, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import theme from '../styles/theme.style';

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: theme.ONBACK,
    marginBottom: 20,
  },
  leftIcon: {
    marginRight: 10,
    marginTop: 3,
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 18,
  },
  rightIcon: {
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 3,
  },
});

const InputField = ({
  leftIcon,
  iconColor,
  rightIcon,
  placeholderTextColor,
  handlePasswordVisibility,
  autoCorrect,
  value,
  onChangeText,
  secureTextEntry,
  textContentType,
  keyboardType = 'default',
  placeholder,
}) => (
  <View style={styles.container}>
    {leftIcon ? (
      <MaterialCommunityIcons
        name={leftIcon}
        size={20}
        color={iconColor}
        style={styles.leftIcon}
      />
    ) : null}
    <TextInput
      autoCorrect={autoCorrect}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      textContentType={textContentType}
      keyboardType={keyboardType}
      autoCapitalize="none"
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      style={styles.input}
    />
    {rightIcon ? (
      <TouchableOpacity onPress={handlePasswordVisibility}>
        <MaterialCommunityIcons
          name={rightIcon}
          size={20}
          color={iconColor}
          style={styles.rightIcon}
        />
      </TouchableOpacity>
    ) : null}
  </View>
);
InputField.propTypes = {
  leftIcon: PropTypes.string,
  iconColor: PropTypes.string,
  rightIcon: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  handlePasswordVisibility: PropTypes.func,
  autoCorrect: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  textContentType: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

InputField.defaultProps = {
  leftIcon: '',
  iconColor: theme.ONBACKTEXT,
  rightIcon: '',
  placeholderTextColor: theme.ONBACKTEXT,
  handlePasswordVisibility: () => {},
  autoCorrect: true,
  secureTextEntry: false,
  keyboardType: 'default',
  placeholder: '',
};

export default InputField;

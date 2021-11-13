import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../styles/theme.style';

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
  },
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
});

const Button = ({
  title,
  backgroundColor,
  titleColor,
  titleSize,
  onPress,
  width = '100%',
}) => (
  <Pressable
    onPress={onPress}
    style={(args) => {
      if (args.pressed) {
        return [
          styles.base,
          {
            opacity: 0.5,
            backgroundColor,
            width,
          },
        ];
      }

      return [
        styles.base,
        {
          opacity: 1,
          backgroundColor,
          width,
        },
      ];
    }}
  >
    <Text style={[styles.text, { color: titleColor, fontSize: titleSize }]}>
      {title}
    </Text>
  </Pressable>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  titleColor: PropTypes.string,
  titleSize: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  width: PropTypes.string,
};

Button.defaultProps = {
  backgroundColor: theme.ONBACKTEXT,
  titleColor: theme.BACK,
  titleSize: 14,
  width: '100%',
};

export default Button;

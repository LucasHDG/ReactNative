import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const IconButton = ({
  color, size, onPress, name,
}) => (
  <Pressable
    style={(args) => {
      if (args.pressed) {
        return [
          styles.base,
          {
            opacity: 0.5,
            backgroundColor: 'transparent',
          },
        ];
      }

      return [styles.base, { opacity: 1, backgroundColor: 'transparent' }];
    }}
    onPress={onPress}
  >
    <AntDesign name={name} size={size} color={color} />
  </Pressable>
);

IconButton.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default IconButton;

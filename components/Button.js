/**
 * Author: RSP Aguilar
 * Created On: 2021-01-04T04:25:00.102Z
 */

import React from 'react';
import { View, Button as RNButton } from 'react-native';

const Button = (props) => (
  <View style={props.style}>
    <RNButton {...props} />
  </View>
);

export default Button;

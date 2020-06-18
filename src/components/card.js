import React from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientCard = ({onPress = () => {}, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{x: 0.0, y: 0.5}}
        end={{x: 0.5, y: 1.0}}
        locations={[0.5, 1]}
        useAngle
        angle={200}
        angleCenter={{x: 0.9, y: 0.1}}
        colors={props.gradientColors}
        {...props}>
        {props.children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientCard;

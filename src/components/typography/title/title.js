import { View, Text } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';
import { FontSize } from '../../constants/styles';

export default function Title({
  text,
  size = 'large',
  color = COLORS.WHITE,
  fontFamily = FONT.TTForseMedium,
  align = 'left',
  numberOfLines,
  style,
  showImage = false,
}) {
  return (
    <View>
      <Text
        style={[
          {
            fontSize: FontSize[size] || FontSize.large,
            color,
            fontFamily,
            textAlign: align,
          },
          style,
        ]}
        numberOfLines={numberOfLines}
      >
        {text}
      </Text>
    </View>
  );
}

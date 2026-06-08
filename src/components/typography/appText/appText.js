import { View, Text } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';
import { FontSize } from '../../constants/styles';

export default function AppText({
  text,
  size = 'medium',
  color = COLORS.WHITE,
  fontFamily = FONT.TTForseMedium,
  align = 'left',
  numberOfLines,
  style,
}) {
  return (
    <View>
      <Text
        style={[
          {
            fontSize: FontSize[size] || FontSize.medium,
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

import React, { useCallback, useMemo } from 'react';
import { Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { COLORS } from '../../constants/color';
import { FONT } from '../../constants/font';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';
import { TouchableRipple } from 'react-native-paper';

const ConfirmBottomSheet = ({
  bottomSheetRef,
  title = 'Delete Account?',
  description = 'This action is permanent and cannot be undone.',
  buttonText = 'Delete',
  accentColor = '#FF3B30',
  loading = false,
  onConfirm,
}) => {
  const snapPoints = useMemo(() => ['32%'], []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.6}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={!loading}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.container}>
        <View
          style={[styles.iconWrapper, { backgroundColor: `${accentColor}15` }]}
        >
          <Ionicons name="trash" size={Responsive.width(30)} color={'red'} />
        </View>
        <Text style={[styles.title, { color: accentColor }]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableRipple
          style={[styles.confirmButton, { backgroundColor: COLORS.ERROR }]}
          onPress={onConfirm}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.confirmText}>{buttonText}</Text>
          )}
        </TouchableRipple>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  handleIndicator: {
    backgroundColor: '#D0D5DD',
    width: 50,
    height: 5,
  },

  container: {
    padding: Spacing.large,
    gap: Spacing.medium,
  },

  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  icon: {
    fontSize: 34,
  },

  title: {
    textAlign: 'center',
    fontSize: FontSize.xlarge,
    fontFamily: FONT.SpaceGroteskBold,
  },

  description: {
    textAlign: 'center',
    lineHeight: 22,
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskRegular,
    paddingHorizontal: 10,
  },

  label: {
    marginBottom: 10,
    color: COLORS.TEXT_PRIMARY,
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskMedium,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 16,
    paddingHorizontal: 16,
    color: COLORS.TEXT_PRIMARY,
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskRegular,
    backgroundColor: '#FAFAFA',
  },

  confirmButton: {
    flex: 1,
    height: Responsive.height(40),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmText: {
    color: '#FFF',
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskBold,
  },
});

export default ConfirmBottomSheet;

import React from 'react';
import {View, Image, StyleSheet, TextInput, Text} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {styles} from './styles';

interface CustomComposerProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  avatarUri?: string;
  disabled?: boolean;
  paginatedData?: any; // Adjust type as necessary
}

const CustomComposer: React.FC<CustomComposerProps> = ({
  value,
  onChangeText,
  placeholder,
  avatarUri,
  paginatedData,
  disabled = false,
}) => {
  const hasValidAvatar =
    avatarUri && typeof avatarUri === 'string' && avatarUri.trim() !== '';

  return (
    <View style={composerStyles.container}>
      {hasValidAvatar ? (
        <Image
          source={{uri: avatarUri}}
          style={composerStyles.avatar}
          defaultSource={paginatedData?.pages[0]?.data?.LoogedInUserImgPath} // ← optional local fallback
          onError={e => console.log('Avatar load error:', e.nativeEvent.error)}
        />
      ) : (
        // Nice fallback circle with initials or icon
        <View style={[composerStyles.avatar, composerStyles.fallbackAvatar]}>
          {/* Option 1: Initials (recommended) */}
          <Text style={composerStyles.fallbackText}>
            A
          </Text>
          {/* Option 2: Simple icon
          <AppImages.Common.UserPlaceholder /> */}
        </View>
      )}

      <View style={composerStyles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={color.S_GRAY_3}
          multiline
          editable={!disabled}
          // maxLength={10} ← probably remove this, very restrictive
          style={[
            styles.textInputStyle,
            composerStyles.input,
            {
              backgroundColor: value ? color.WHITE : color.S_GRAY_1,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default CustomComposer;

const composerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: color.WHITE,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },

  inputWrapper: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
  },

  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: 14,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  fallbackAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: color.P_PINK, // or gray, your brand color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  fallbackText: {
    color: color.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});

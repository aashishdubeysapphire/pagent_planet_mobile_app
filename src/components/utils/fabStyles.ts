import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },

  container: {
    height: 56,
    minHeight: 56, // ✅ safety for Android

    borderRadius: 28, // perfect pill

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 16,
    paddingLeft: 14, // ✅ better visual balance

    overflow: 'hidden',

    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  icon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 2, // ✅ spacing from text
  },

  label: {
    color: '#fff',

    fontSize: 14,
    fontWeight: '500',

    includeFontPadding: false, // ✅ Android fix
    textAlignVertical: 'center',
    marginLeft: 20,
    // prevent text jumping
    lineHeight: 18,
  },
  measureLabel: {
    opacity: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: 0,
    zIndex: -1,
  },
});

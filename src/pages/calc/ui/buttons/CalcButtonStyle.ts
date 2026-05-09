import { StyleSheet } from 'react-native';
import Colors from '../../../../features/theme/Colors';

const CalcButtonStyle = StyleSheet.create({
  button: {
    borderRadius: 5.0,
    flex: 1,
    margin: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgDigit: {
    backgroundColor: '#3b3b3b',
  },
  bgOperation: {
    backgroundColor: '#323232',
  },
  bgEqual: {
    backgroundColor: '#4cc2ff',
  },
  label: {
    fontSize: 22.0,
  },
  labelDigit: {
    color: Colors.onPrimary,
  },
  labelOperation: {
    color: Colors.onPrimary,
  },
  labelEqual: {
    color: Colors.primary,
  },
  memoryButton: {
    color: Colors.onPrimary,
    fontSize: 13.0,
    backgroundColor: 'primary',
  },
  memoryDisabled: {
    fontSize: 13.0,
    color: 'grey',
  },
  bgMemoryDisabled: {},
});

export default CalcButtonStyle;

import { StyleSheet } from 'react-native';
import Colors from '../../../features/theme/Colors';

const CalcStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    padding: 3.0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: Colors.onPrimary,
  },
  expression: {
    flex: 1,
    color: '#939393',
    textAlign: 'right',
  },
  result: {
    flex: 4,
    color: Colors.onPrimary,
    // fontSize: 48.0,
    fontWeight: 500,
    textAlign: 'right',
  },
  memory: {
    flex: 2,
    backgroundColor: '#252525',
    fontSize: 14.0,
  },
  keyboard: {
    flex: 18,
    justifyContent: 'space-between',
  },
  kbRow: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // landscape

  topRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10.0,
  },
  topCol: {
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
  },
});

export default CalcStyle;

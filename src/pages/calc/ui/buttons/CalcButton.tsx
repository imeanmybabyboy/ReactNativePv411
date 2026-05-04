import { Text, TouchableOpacity } from 'react-native';
import { CalcButtonTypes } from './CalcButtonTypes';
import CalcButtonStyle from './CalcButtonStyle';

export default function CalcButton({
  buttonType,
  title,
  action,
}: {
  buttonType: CalcButtonTypes;
  title: string;
  action?: (title: string) => void;
}) {
  const bg =
    buttonType === CalcButtonTypes.digit
      ? CalcButtonStyle.bgDigit
      : buttonType === CalcButtonTypes.equal
      ? CalcButtonStyle.bgEqual
      : CalcButtonStyle.bgOperation;

  const label =
    buttonType === CalcButtonTypes.digit
      ? CalcButtonStyle.labelDigit
      : buttonType === CalcButtonTypes.equal
      ? CalcButtonStyle.labelEqual
      : CalcButtonStyle.labelOperation;

  return (
    <TouchableOpacity
      style={[CalcButtonStyle.button, bg]}
      onPress={() => {
        if (action) action(title);
      }}
    >
      <Text style={[CalcButtonStyle.label, label]}>{title}</Text>
    </TouchableOpacity>
  );
}

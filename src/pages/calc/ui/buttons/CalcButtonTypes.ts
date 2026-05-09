const CalcButtonTypes = {
  digit: 'digit',
  operation: 'operation',
  equal: 'equal',
  memoryEnabled: 'memoryEnabled',
  memoryDisabled: 'memoryDisabled',
} as const;

type CalcButtonTypes = (typeof CalcButtonTypes)[keyof typeof CalcButtonTypes];

export { CalcButtonTypes };

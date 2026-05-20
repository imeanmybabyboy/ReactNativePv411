export {};

declare global {
  interface Date {
    toDotted: () => string;
  }

  interface DateConstructor {
    fromDotted: (str: string) => Date;
  }
}

Date.fromDotted = function (str: string): Date {
  const dateParts = str.split('.');
  return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
};

Date.prototype.toDotted = function (): string {
  return `${this.getDate().pad2()}.${(
    this.getMonth() + 1
  ).pad2()}.${this.getFullYear()}`;
};

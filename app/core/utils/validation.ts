export function validatePositiveNumber(value: number, fieldName: string): void {
  if (value < 0) {
    throw new Error(`${fieldName} cannot be negative`);
  }
}

export function validateRequiredField<T>(value: T, fieldName: string): void {
  if (value === undefined || value === null) {
    throw new Error(`${fieldName} is required`);
  }
}
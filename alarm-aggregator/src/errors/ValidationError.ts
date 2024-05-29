export class ValidationError extends Error {
  public readonly value: string;
  constructor({ message, value }) {
    super(message);
    this.value = value;
  }
}

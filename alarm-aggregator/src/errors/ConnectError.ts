export class ConnectError extends Error {
  public readonly message: string;
  public readonly action: string;

  constructor({ message }) {
    super(message);
    this.action = 'connect';
  }
}

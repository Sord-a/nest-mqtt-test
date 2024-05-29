export class SubscribeError extends Error {
  public readonly message: string;
  public readonly topic: string;
  public readonly action: string;

  constructor({ message, topic }) {
    super(message);
    this.action = 'subscribe';
    this.topic = topic;
  }
}

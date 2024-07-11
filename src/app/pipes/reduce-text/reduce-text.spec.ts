import { ReduceTextPipe } from './reduce-text.pipe';

describe('ReduceTextPipe', () => {
  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the text reduced', () => {
    const text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const result = pipe.transform(text, 10);
    expect(result.length).toBe(10);
  });

  it('should return the text reduced with the default value', () => {
    const text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const result = pipe.transform(text);
    expect(result.length).toBe(result.length);
  });
});

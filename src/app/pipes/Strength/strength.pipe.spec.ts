import { StrengthPipe } from './strength.pipe';

let pipe: StrengthPipe;

beforeEach(() => {
  pipe = new StrengthPipe();
})

describe('StrengthPipe', () => {
  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should return weak instance', () => {
    let result = pipe.transform(5);
    expect(result).toContain('(weak)');
  })

  it('Should return a strong instance', () => {
    let result = pipe.transform(12);
    expect(result).toContain('(strong)');
  })

  it('Should return a strength instance', () => {
    let result = pipe.transform(28);
    expect(result).toContain('(strongest)');
  })
});

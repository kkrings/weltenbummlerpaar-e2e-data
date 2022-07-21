import { getImageFile } from './get-image-file';

describe('getImageFile', () => {
  it('jpg file should have been returned by default', () => {
    expect(getImageFile()).toMatch('image.jpg');
  });

  it('jpg file should have been returned', () => {
    expect(getImageFile('jpg')).toMatch('image.jpg');
  });

  it('png file should have been returned', () => {
    expect(getImageFile('png')).toMatch('image.png');
  });
});

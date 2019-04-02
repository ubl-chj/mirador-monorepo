import {getLanguagesFromConfigWithCurrent} from "../config"

describe('getLanguagesFromConfigWithCurrent', () => {
  it('returns an array of objects with locale, label, and current properties', () => {
    const state = {
      config: {
        availableLanguages: {
          epo: 'Esparanto',
          tlh: 'Klingon',
        },
        language: 'epo',
      },
    };

    const expected = [
      {
        current: true,
        label: 'Esparanto',
        locale: 'epo',
      },
      {
        current: false,
        label: 'Klingon',
        locale: 'tlh',
      },
    ];

    expect(getLanguagesFromConfigWithCurrent(state)).toEqual(expected);
  });
});

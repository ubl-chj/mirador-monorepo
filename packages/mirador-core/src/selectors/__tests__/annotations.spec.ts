import {
  getAllOrSelectedAnnotationsOnCanvases,
  getAnnotationResourcesByMotivation,
  getSelectedAnnotationIds,
} from '../annotations';

describe('getAnnotationResourcesByMotivation', () => {
  it('returns an array of annotation resources (filtered by the passed in array of motiviations)', () => {
    const expected = [
      ['oa:commenting'],
      ['sc:something-else', 'oa:commenting'],
    ];

    const state = {
      annotations: {
        cid1: {
          annoId1: {
            id: 'annoId1',
            json: {
              resources: [
                { '@id': 'annoId1', motivation: 'oa:commenting' },
                { '@id': 'annoId2', motivation: 'oa:not-commenting' },
                { '@id': 'annoId3', motivation: ['sc:something-else', 'oa:commenting'] },
              ],
            },
          },
        },
      },
      config: {
        annotations: {
          motivations: ['oa:commenting', 'sc:painting']
        }
      },
      manifests: {
        mid: {
          json: {
            '@context': 'http://iiif.io/api/presentation/2/context.json',
            '@id':
             'http://iiif.io/api/presentation/2.1/example/fixtures/19/manifest.json',
            '@type': 'sc:Manifest',
            sequences: [
              {
                canvases: [
                  {
                    '@id': 'cid1',
                  },
                ],
              },
            ],
          },
        },
      },
      windows: {
        abc123: {
          canvasIndex: 0,
          manifestId: 'mid',
        },
      },
    };

    expect(
      getAnnotationResourcesByMotivation(state, { motivations: ['something', 'oa:commenting'], windowId: 'abc123' }).map(r => r.motivations),
    ).toEqual(expected);
  });
});

it('getSelectedAnnotationIds returns an array of selected annotation IDs from state', () => {
  const state = {
    manifests: {
      mid: {
        json: {
          '@context': 'http://iiif.io/api/presentation/2/context.json',
          '@id':
           'http://iiif.io/api/presentation/2.1/example/fixtures/19/manifest.json',
          '@type': 'sc:Manifest',
          sequences: [
            {
              canvases: [
                {
                  '@id': 'tid1',
                },
              ],
            },
          ],
        },
      },
    },
    windows: {
      wid: {
        canvasIndex: 0,
        manifestId: 'mid',
        selectedAnnotations: {
          tid1: ['aid1', 'aid2'],
          tid2: ['aid3'],
        },
      },
    },
  };

  expect(getSelectedAnnotationIds(state, { windowId: 'wid' })).toEqual(
    ['aid1', 'aid2'],
  );
});

describe('getAllOrSelectedAnnotationsOnCanvases', () => {
  it('returns all annotations if the given window is set to display all', () => {
    const state = {
      annotations: {
        cid1: {
          annoId1: { id: 'annoId1', json: { resources: [{ '@id': 'annoId1' }, { '@id': 'annoId2' }] } },
        },
      },
      manifests: {
        mid: {
          json: {
            '@context': 'http://iiif.io/api/presentation/2/context.json',
            '@id':
             'http://iiif.io/api/presentation/2.1/example/fixtures/19/manifest.json',
            '@type': 'sc:Manifest',
            sequences: [
              {
                canvases: [
                  {
                    '@id': 'cid1',
                  },
                ],
              },
            ],
          },
        },
      },
      windows: {
        abc123: { canvasIndex: 0, displayAllAnnotations: true, manifestId: 'mid' },
      },
    };

    expect(
      getAllOrSelectedAnnotationsOnCanvases(state, { windowId: 'abc123' })[0].resources.length,
    ).toBe(2);
  });

  it('returns only selected annotations if the window is not set to display all', () => {
    const state = {
      annotations: {
        cid1: {
          annoId1: { id: 'annoId1', json: { resources: [{ '@id': 'annoId1' }, { '@id': 'annoId2' }] } },
        },
      },
      manifests: {
        mid: {
          json: {
            '@context': 'http://iiif.io/api/presentation/2/context.json',
            '@id':
             'http://iiif.io/api/presentation/2.1/example/fixtures/19/manifest.json',
            '@type': 'sc:Manifest',
            sequences: [
              {
                canvases: [
                  {
                    '@id': 'cid1',
                  },
                ],
              },
            ],
          },
        },
      },
      windows: {
        abc123: {
          canvasIndex: 0,
          displayAllAnnotations: false,
          manifestId: 'mid',
          selectedAnnotations: { cid1: ['annoId1'] },
        },
      },
    };

    expect(
      getAllOrSelectedAnnotationsOnCanvases(state, { windowId: 'abc123' })[0].resources.length,
    ).toBe(1);
  });

  it('filters the annotation resources by the selected annotations for the window', () => {
    const state = {
      annotations: {
        cid1: {
          annoId1: { id: 'annoId1', json: { resources: [{ '@id': 'annoId2' }, { '@id': 'annoId3' }] } },
        },
      },
      manifests: {
        mid: {
          json: {
            '@context': 'http://iiif.io/api/presentation/2/context.json',
            '@id':
             'http://iiif.io/api/presentation/2.1/example/fixtures/19/manifest.json',
            '@type': 'sc:Manifest',
            sequences: [
              {
                canvases: [
                  {
                    '@id': 'cid1',
                  },
                ],
              },
            ],
          },
        },
      },
      windows: {
        abc123: { canvasIndex: 0, manifestId: 'mid', selectedAnnotations: { cid1: ['annoId2'] } },
      },
    };

    expect(
      getAllOrSelectedAnnotationsOnCanvases(state, { windowId: 'abc123' })[0].resources.length,
    ).toBe(1);
  });
});

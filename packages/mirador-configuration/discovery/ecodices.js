export const ec = {
  indices: {
    ec9: {
      host: 'https://es.iiif.cloud',
      name: 'e-codices',
      queryFields: [
        'Century',
        'collection',
        'Collection Name',
        'attribution',
        'Date of Origin (English)',
        'Dated',
        'Digitized by',
        'DOI',
        'Dimensions',
        'Document Type',
        'Location',
        'license',
        'Liturgica christiana',
        'Material',
        'Number of Pages',
        'Shelfmark',
        'Summary (English)',
        'Text Language',
        'Persons',
        'Place of Origin (English)',
        'Owned By (English)',
        'Sponsored by',
        'title',
        'Title (English)',
        'related',
        'thumbnail',
        'manifest'
      ],
      listItem: 'StandardListItem',
      gridItem: 'StandardGridItem',
      refinementListFilters: {
        1: {
          field: 'Text Language.keyword',
          title: 'Language',
          id: 'language'
        },
        2: {
          field: 'Collection Name.keyword',
          title: 'Collection',
          id: 'collection'
        },
        3: {
          field: 'Location.keyword',
          title: 'Location',
          id: 'place'
        },
      },
      sortingSelectorOptions: [
        {
          label: 'Relevance',
          field: '_score',
          order: 'asc'
        },
        {
          label: 'Century',
          field: 'Century.keyword',
          order: 'asc'
        },
        {
          label: 'Persons',
          field: 'Persons.keyword',
          order: 'asc'
        }
      ],
      highlightFields: [
        'Century',
        'Collection Name',
        'Date of Origin (English)',
        'DOI',
        'Dimensions',
        'Document Type',
        'Location',
        'Material',
        'Number of Pages',
        'Shelfmark',
        'Summary (English)',
        'Text Language',
        'Persons',
        'Place of Origin (English)',
        'title',
        'Title (English)',
        'related'
      ],
      suggestionField: 'Title (English)'
    },
  }
}

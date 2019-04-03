export const ubl = {
  indices: {
    m4: {
      gridItem: 'StandardGridItem',
      hasRangeFilter: true,
      highlightField: [
        'Abmessungen',
        'Beschreibstoff',
        'Author',
        'Date',
        'Date of publication',
        'Datierung',
        'Call number',
        'Collection',
        'Lokalisierung',
        'Medium',
        'Objekttitel',
        'Part of',
        'Place',
        'Place of publication',
        'Publisher',
        'Signatur',
        'Sprache',
        'Title',
        'title',
        'Titel (aus Signatur)',
        'Umfang',
        'URN',
        'Source PPN (SWB)'
      ],
      host: 'https://es.iiif.cloud',
      name: 'Universitätsbibliothek Leipzig',
      listItem: 'StandardListItem',
      queryFields: [
        'Abmessungen',
        'Author',
        'Beschreibstoff',
        'Callnumber',
        'Call number',
        'Date',
        'Datierung',
        'Date of publication',
        'Call number',
        'Collection',
        'Lokalisierung',
        'manifest',
        'Manifest Type',
        'Medium',
        'Objekttitel',
        'Owner',
        'Place',
        'Place of publication',
        'Publisher',
        'Signatur',
        'Sprache',
        'thumbnail',
        'title',
        'Title',
        'Titel (aus Signatur)',
        'Umfang',
        'URN',
        'Source PPN (SWB)'],
      refinementListFilters: {
        1: {
          field: 'Sprache.keyword',
          title: 'Language',
          id: 'language'
        },
        2: {
          field: 'Collection.keyword',
          title: 'Collection',
          id: 'collection'
        },
        3: {
          field: 'Place of publication.keyword',
          title: 'Place',
          id: 'place'
        },
      },
      rangeFilter: {
        field: 'Date of publication.raw',
        id: 'date',
        min: 1470,
        max: 1975
      },
      sortingSelectorOptions: [
        {
          label: 'Date of publication',
          field: 'Date of publication.keyword',
          order: 'asc'
        },
        {
          label: 'Title',
          field: 'title.keyword',
          order: 'desc'
        },
        {
          label: 'Author',
          field: 'Author.keyword',
          order: 'asc'
        }
      ],
      suggestionField: 'Title',
    },
  }
}

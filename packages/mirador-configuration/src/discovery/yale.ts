export const yale = {
  indices: {
    yba2: {
      host: 'https://es.iiif.cloud',
      name: 'Yale Center for British Art',
      queryFields: [
        'Accession number',
        'Bibliography',
        'Collection',
        'Creator(s)',
        'Credit line',
        'Date',
        'Dimensions',
        'Inscriptions',
        'Institution',
        'Medium',
        'Titles',
        'title',
        'manifest',
        'description',
        'attribution',
        'thumbnail',
      ],
      listItem: 'StandardListItem',
      gridItem: 'StandardGridItem',
      refinementListFilters: {
        1: {
          field: 'Collection.keyword',
          title: 'Collection',
          id: 'collection'
        },
        2: {
          field: 'Creator(s).keyword',
          title: 'Creator(s)',
          id: 'creators'
        },
        3: {
          field: 'Medium.keyword',
          title: 'Medium',
          id: 'medium'
        },
      },
      sortingSelectorOptions: [
        {
          label: 'Title',
          field: 'title.keyword',
          order: 'asc'
        },
        {
          label: 'Medium',
          field: 'Medium.keyword',
          order: 'asc'
        },
        {
          label: 'Date',
          field: 'Date.keyword',
          order: 'asc'
        }
      ],
      highlightFields: [
        'Accession number',
        'Bibliography',
        'Collection',
        'Creator(s)',
        'Credit line',
        'Date',
        'Dimensions',
        'Inscriptions',
        'Institution',
        'Medium',
        'Titles',
        'title',
        'manifest',
        'description',
        'attribution'
      ],
      suggestionField: 'title'
    }
  },
}

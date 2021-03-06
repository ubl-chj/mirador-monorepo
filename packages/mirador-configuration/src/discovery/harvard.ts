export const harvard = {
  indices: {
    hvd2: {
      gridItem: 'StandardGridItem',
      highlightFields: [
        'Medium',
        'Classification',
        'Credit Line',
        'Dimensions',
        'Object Number',
        'title',
        'Technique',
        'Provenance',
        'People',
        'Date'
      ],
      host: 'https://es.iiif.cloud',
      listItem: 'StandardListItem',
      name: 'Harvard Art Museums',
      queryFields: [
        'Medium',
        'Classification',
        'Credit Line',
        'Dimensions',
        'Object Number',
        'title',
        'Technique',
        'Provenance',
        'People',
        'Date',
        'manifest',
        'thumbnail',
      ],
      refinementListFilters: {
        1: {
          field: 'Classification.keyword',
          title: 'Classification',
          id: 'classification'
        },
        2: {
          field: 'Date.keyword',
          title: 'Date',
          id: 'date'
        },
        3: {
          field: 'Technique.keyword',
          title: 'Technique',
          id: 'technique'
        },
      },
      sortingSelectorOptions: [
        {
          label: 'Title',
          field: 'title.keyword',
          order: 'asc'
        },
        {
          label: 'Technique',
          field: 'Technique.keyword',
          order: 'asc'
        },
        {
          label: 'Date',
          field: 'Date.keyword',
          order: 'asc'
        }
      ],
      suggestionField: 'title'
    },
  }
}

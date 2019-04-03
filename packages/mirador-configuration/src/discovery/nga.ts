export const nga = {
  indices: {
    nga2: {
      host: 'https://es.iiif.cloud',
      name: 'National Gallery of Art',
      queryFields: [
        'title',
        'Accession Number',
        'Artist',
        'Creation Year',
        'Title',
        'attribution',
        'description',
        'manifest',
        'thumbnail',
        'title'
      ],
      listItem: 'StandardListItem',
      gridItem: 'StandardGridItem',
      refinementListFilters: {
        1: {
          field: 'Artist.keyword',
          title: 'Artist',
          id: 'artist'
        },
        2: {
          field: 'Creation Year.keyword',
          title: 'Creation Year',
          id: 'creation'
        },
        3: {
          field: 'description.keyword',
          title: 'description',
          id: 'description'
        },
      },
      hasRangeFilter: true,
      rangeFilter: {
        field: 'Creation Year.raw',
        id: 'date',
        min: 1400,
        max: 1975
      },
      sortingSelectorOptions: [
        {
          label: 'Title',
          field: 'title.keyword',
          order: 'asc'
        },
        {
          label: 'Creation Year',
          field: 'Creation Year.keyword',
          order: 'asc'
        },
        {
          label: 'Artist',
          field: 'Artist.keyword',
          order: 'asc'
        }
      ],
      highlightFields: [
        'title',
        'Artist'
      ],
      suggestionField: 'title'
    },
  }
}

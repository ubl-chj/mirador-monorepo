export const ox = {
  indices: {
    ox1: {
      host: 'https://es.iiif.cloud',
      name: 'Oxford: Digital Bodleian',
      queryFields: [
        "accessRights",
        "alternatives",
        "attribution",
        "catalogueId",
        "collections",
        "contributors",
        "coverages",
        "creators",
        "dates",
        "description",
        "descriptions",
        "displayLanguages",
        "formats",
        "identifiers",
        "incipits",
        "languages",
        "locations",
        "manifest",
        "publisher",
        "related",
        "shelfmark",
        "sources",
        "subjects",
        "thumbnail",
        "title",
        "titles",
        "types",
        "seeAlso"
      ],
      listItem: "StandardListItem",
      gridItem: "StandardGridItem",
      refinementListFilters: {
        1: {
          field: "collections.keyword",
          title: "Collection",
          id: "collection"
        },
        2: {
          field: "subjects.keyword",
          title: "Subject",
          id: "subjects"
        },
        3: {
          field: "locations.keyword",
          title: "Location",
          id: "location"
        },
      },
      sortingSelectorOptions: [
        {
          "label": "Title",
          "field": "titles.keyword",
          "order": "asc"
        },
        {
          "label": "Creator",
          "field": "creators.keyword",
          "order": "asc"
        },
        {
          "label": "Date",
          "field": "dates.keyword",
          "order": "desc"
        }
      ],
      highlightFields: [
        "accessRights",
        "alternatives",
        "attribution",
        "catalogueId",
        "collections",
        "contributors",
        "coverages",
        "creators",
        "dates",
        "description",
        "descriptions",
        "displayLanguages",
        "formats",
        "identifiers",
        "incipits",
        "languages",
        "locations",
        "publisher",
        "related",
        "shelfmark",
        "sources",
        "subjects",
        "title",
        "titles",
        "types"
      ],
     suggestionField: "title",
    },
  }
}

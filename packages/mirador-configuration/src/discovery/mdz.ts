export const mdz = {
  indices: {
    mdz1: {
      host: 'https://es.iiif.cloud',
      name: 'Bayerische Staatsbibliothek',
      queryFields: [
        "Author",
        "By",
        "Contributor",
        "Creation",
        "Digital Object Identifier",
        "Extent",
        "Identifier",
        "Language",
        "Location",
        "Note",
        "Object Type",
        "Preferred title of work",
        "Title",
        "attribution",
        "manifest",
        "license",
        "seeAlso",
        "thumbnail",
        "title"
      ],
      listItem: "StandardListItem",
      gridItem: "StandardGridItem",
      refinementListFilters: {
        1: {
          field: "Language.keyword",
          title: "Language",
          id: "language"
        },
        2: {
          field: "Note.keyword",
          title: "Note",
          id: "note"
        },
        3: {
          field: "Creation.keyword",
          title: "Creation",
          id: "creation"
        },
      },
      sortingSelectorOptions: [
        {
          label: "Title",
          field: "title.keyword",
          order: "asc"
        },
        {
          label: "Author",
          field: "Author.keyword",
          order: "asc"
        },
        {
          label: "Language",
          field: "Language.keyword",
          order: "asc"
        }
      ],
      highlightFields: [
        "Author",
        "By",
        "Contributor",
        "Creation",
        "Digital Object Identifier",
        "Extent",
        "Identifier",
        "Language",
        "Location",
        "Note",
        "Object Type",
        "Preferred title of work",
        "Title",
        "attribution",
        "manifest",
        "license",
        "seeAlso",
        "thumbnail",
        "title"
      ],
     suggestionField: "title",
    },
  }
}

export const uc = {
  indices: {
    uc2: {
      host: 'https://es.iiif.cloud',
      name: 'University of Cambridge',
      queryFields: [
        "Abstract",
        "Additions",
        "Alternative Title(s)",
        "Associated Person(s)",
        "Associated Place(s)",
        "Associated Organisation(s)",
        "Author(s)",
        "Author(s) of the Record",
        "Bibliography",
        "Binding",
        "Classmark",
        "Collation",
        "Collection",
        "Condition",
        "Creator(s)",
        "Data Source(s)",
        "Date of Acquisition",
        "Date of Creation",
        "Date of Publication",
        "Decoration",
        "Descriptive Title(s)",
        "Donor(s)",
        "Excerpts",
        "Extent",
        "Featured in",
        "Filiations",
        "Foliation",
        "Format",
        "Former Owner(s)",
        "Funding",
        "Language(s)",
        "Layout",
        "Level of Description",
        "Manifest",
        "Material",
        "Music notation",
        "Note(s)",
        "Origin Place",
        "Physical Description",
        "Physical Location",
        "Place of Publication",
        "Provenance",
        "Publisher",
        "Recipient(s)",
        "Scribe(s)",
        "Script",
        "seeAlso",
        "Subject(s)",
        "Support",
        "thumbnail",
        "title",
        "Title",
        "Uniform Title"
      ],
      listItem: "StandardListItem",
      gridItem: "StandardGridItem",
      refinementListFilters: {
        1: {
          field: "Collection.keyword",
          title: "Collection",
          id: "collection"
        },
        2: {
          field: "Format.keyword",
          title: "Format",
          id: "format"
        },
        3: {
          field: "Origin Place.keyword",
          title: "Origin",
          id: "origin"
        },
      },
      sortingSelectorOptions: [
        {
          label: "Title",
          field: "Title.keyword",
          order: "asc"
        },
        {
          label: "Author(s)",
          field: "Author(s).keyword",
          order: "asc"
        },
        {
          label: "Subject",
          field: "Subject(s).keyword",
          order: "desc"
        }
      ],
      highlightFields: [
        "Date of Publication",
        "Provenance",
        "Place of Publication",
        "Physical Location",
        "Extent",
        "Abstract",
        "Former Owner(s)",
        "Associated Person(s)",
        "Title",
        "Publisher",
        "title",
        "Classmark",
        "seeAlso",
        "Origin Place",
        "Level of Description",
        "Date of Creation",
        "Material",
        "Language(s)",
        "Bibliography",
        "Subject(s)",
        "Author(s) of the Record",
        "Collection"
      ],
      suggestionField: "Title"
    },
  }
}

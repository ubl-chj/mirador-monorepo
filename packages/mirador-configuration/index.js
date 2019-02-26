export const localConfig = {
  canvasNavigation: {
    height: 100,
  },
  discovery: {
    currentIndex: "m4",
    indices: {
      "m4": {
        gridItem: "StandardGridItem",
        hasRangeFilter: true,
        highlightField: [
          "Abmessungen",
          "Beschreibstoff",
          "Author",
          "Date",
          "Date of publication",
          "Datierung",
          "Call number",
          "Collection",
          "Lokalisierung",
          "Medium",
          "Objekttitel",
          "Part of",
          "Place",
          "Place of publication",
          "Publisher",
          "Signatur",
          "Sprache",
          "Title",
          "title",
          "Titel (aus Signatur)",
          "Umfang",
          "URN",
          "Source PPN (SWB)"
        ],
        host: "https://es.iiif.cloud",
        name: "Universitätsbibliothek Leipzig",
        listItem: "StandardListItem",
        queryFields: [
          "Abmessungen",
          "Author",
          "Beschreibstoff",
          "Callnumber",
          "Call number",
          "Date",
          "Datierung",
          "Date of publication",
          "Call number",
          "Collection",
          "Lokalisierung",
          "manifest",
          "Manifest Type",
          "Medium",
          "Objekttitel",
          "Owner",
          "Place",
          "Place of publication",
          "Publisher",
          "Signatur",
          "Sprache",
          "thumbnail",
          "title",
          "Title",
          "Titel (aus Signatur)",
          "Umfang",
          "URN",
          "Source PPN (SWB)"],
        refinementListFilterDef1: {
          field: "Sprache.keyword",
          title: "Language",
          id: "language"
        },
        refinementListFilterDef2: {
          field: "Collection.keyword",
          title: "Collection",
          id: "collection"
        },
        refinementListFilterDef3: {
          field: "Place of publication.keyword",
          title: "Place",
          id: "place"
        },
        rangeFilter: {
          field: "Date of publication.raw",
          id: "date",
          min: 1470,
          max: 1975
        },
        sortingSelectorOptions: [{
          label: "Title",
          field: "title.keyword",
          order: "desc"
        }, {
          label: "Date of publication",
          field: "Date of publication.keyword",
          order: "asc"
        }, {
          label: "Author",
          field: "Author.keyword",
          order: "asc"
        }],
        suggestionField: "Title",
      },
      "hvd2": {
        gridItem: "StandardGridItem",
        highlightFields: [
          "Medium",
          "Classification",
          "Credit Line",
          "Dimensions",
          "Object Number",
          "title",
          "Technique",
          "Provenance",
          "People",
          "Date"
        ],
        host: "https://es.iiif.cloud",
        listItem: "StandardListItem",
        name: "Harvard",
        queryFields: [
        "Medium",
        "Classification",
        "Credit Line",
        "Dimensions",
        "Object Number",
        "title",
        "Technique",
        "Provenance",
        "People",
        "Date",
        "manifest"
        ],
        refinementListFilterDef1: {
          field: "Classification.keyword",
          title: "Classification",
          id: "classification"
        },
        refinementListFilterDef2: {
          field: "Date.keyword",
          title: "Date",
          id: "date"
        },
        refinementListFilterDef3: {
          field: "Technique.keyword",
          title: "Technique",
          id: "technique"
        },
        sortingSelectorOptions: [
          {
            label: "Title",
            field: "title.keyword",
            order: "asc"
          },
          {
            label: "Technique",
            field: "Technique.keyword",
            order: "asc"
          },
          {
            label: "Date",
            field: "Date.keyword",
            order: "asc"
          }
        ],
        suggestionField: "title"
      },
      "ec9": {
        host: "https://es.iiif.cloud",
        name: "e-codices",
        queryFields: [
          "Century",
          "collection",
          "Collection Name",
          "attribution",
          "Date of Origin (English)",
          "Dated",
          "Digitized by",
          "DOI",
          "Dimensions",
          "Document Type",
          "Location",
          "license",
          "Liturgica christiana",
          "Material",
          "Number of Pages",
          "Shelfmark",
          "Summary (English)",
          "Text Language",
          "Persons",
          "Place of Origin (English)",
          "Owned By (English)",
          "Sponsored by",
          "title",
          "Title (English)",
          "related",
          "thumbnail",
          "manifest"
        ],
        listItem: "StandardListItem",
        gridItem: "StandardGridItem",
        refinementListFilterDef1: {
          field: "Text Language.keyword",
          title: "Language",
          id: "language"
        },
        refinementListFilterDef2: {
          field: "Collection Name.keyword",
          title: "Collection",
          id: "collection"
        },
        refinementListFilterDef3: {
          field: "Location.keyword",
          title: "Location",
          id: "place"
        },
        sortingSelectorOptions: [
          {
            label: "Relevance",
            field: "_score",
            order: "asc"
          },
          {
            label: "Century",
            field: "Century.keyword",
            order: "asc"
          },
          {
            label: "Persons",
            field: "Persons.keyword",
            order: "asc"
          }
        ],
        highlightFields: [
          "Century",
          "Collection Name",
          "Date of Origin (English)",
          "DOI",
          "Dimensions",
          "Document Type",
          "Location",
          "Material",
          "Number of Pages",
          "Shelfmark",
          "Summary (English)",
          "Text Language",
          "Persons",
          "Place of Origin (English)",
          "title",
          "Title (English)",
          "related"
        ],
        suggestionField: "Title (English)"
      },
     "nga2": {
        host: "https://es.iiif.cloud",
        name: "National Gallery of Art",
        queryFields: [
          "title",
          "Accession Number",
          "Artist",
          "Creation Year",
          "Title",
          "attribution",
          "description",
          "manifest",
          "thumbnail",
          "title"
        ],
        listItem: "StandardListItem",
        gridItem: "StandardGridItem",
        refinementListFilterDef1: {
        field: "Artist.keyword",
          title: "Artist",
          id: "artist"
        },
        refinementListFilterDef2: {
        field: "Creation Year.keyword",
          title: "Creation Year",
          id: "creation"
        },
        refinementListFilterDef3: {
        field: "description.keyword",
          title: "description",
          id: "description"
        },
        hasRangeFilter: true,
        rangeFilter: {
          field: "Creation Year.raw",
          id: "date",
          min: 1400,
          max: 1975
        },
        sortingSelectorOptions: [
          {
            label: "Title",
            field: "title.keyword",
            order: "asc"
          },
          {
            label: "Creation Year",
            field: "Creation Year.keyword",
            order: "asc"
          },
          {
            label: "Artist",
            field: "Artist.keyword",
            order: "asc"
          }
        ],
        highlightFields: [
          "title",
          "Artist"
        ],
        suggestionField: "title"
      },
      "yba2": {
        host: "https://es.iiif.cloud",
        name: "Yale Center for British Art",
        queryFields: [
          "Accession number",
          "Bibliography",
          "Collection",
          "Creator(s)",
          "Credit line",
          "Date",
          "Dimensions",
          "Inscriptions",
          "Institution",
          "Medium",
          "Titles",
          "title",
          "manifest",
          "description",
          "attribution"
        ],
        listItem: "StandardListItem",
        gridItem: "StandardGridItem",
        refinementListFilterDef1: {
          field: "Collection.keyword",
          title: "Collection",
          id: "collection"
        },
        refinementListFilterDef2: {
          field: "Creator(s).keyword",
          title: "Creator(s)",
          id: "creators"
        },
        refinementListFilterDef3: {
          field: "Medium.keyword",
          title: "Medium",
          id: "medium"
        },
        sortingSelectorOptions: [
          {
            label: "Title",
            field: "title.keyword",
            order: "asc"
          },
          {
            label: "Medium",
            field: "Medium.keyword",
            order: "asc"
          },
          {
            label: "Date",
            field: "Date.keyword",
            order: "asc"
          }
        ],
        highlightFields: [
          "Accession number",
          "Bibliography",
          "Collection",
          "Creator(s)",
          "Credit line",
          "Date",
          "Dimensions",
          "Inscriptions",
          "Institution",
          "Medium",
          "Titles",
          "title",
          "manifest",
          "description",
          "attribution"
        ],
        suggestionField: "title"
      }
    },
  },
  id: "app",
  language: "en",
  availableLanguages: {
    de: "Deutsch",
    en: "English",
  },
  theme: {
    palette: {
      primary: {
        main: "#37474f",
      },
      secondary: {
        light: "#616161",
        main: "#0044ff",
        contrastText: "#ffcc00",
      },
    },
    typography: {
      useNextVariants: true
    },
  },
  thumbnailNavigation: {
    "defaultPosition": "off",
    "height": 100
  },
  translations: {
  },
  window: {
    defaultView: "single",
  },
  windows: [],
  workspace: {
    type: "mosaic"
  },
  workspaceControlPanel: {
    enabled: false,
  }
}

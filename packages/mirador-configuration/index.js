export const localConfig = {
  canvasNavigation: {
    height: 100,
  },
  discovery: {
    esConfig: {
      indexName: "m4",
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
        "Source PPN (SWB)"
      ],
      listItem: "StandardListItem",
      gridItem: "StandardGridItem",
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
      hasRangeFilter: true,
      rangeFilter: {
        field: "Date of publication.raw",
        id: "date",
        min: 1470,
        max: 1975
      },
      sortingSelectorOptions: [
        {
          label: "Title",
          field: "title.keyword",
          order: "desc"
        },
        {
          label: "Date of publication",
          field: "Date of publication.keyword",
          order: "asc"
        },
        {
          label: "Author",
          field: "Author.keyword",
          order: "asc"
        }
      ],
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
      suggestionField: "Title"
    },
    host: "https://es.iiif.cloud",
    index: "m4"
  },
  id: "app",
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

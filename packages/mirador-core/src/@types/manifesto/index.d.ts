declare module 'manifesto' {
  export class StringValue {
    value: string;

    constructor(value?: string);

    toString(): string;
  }

  export class Duration {
    start: number;
    end: number;

    constructor(start: number, end: number);

    getLength(): number;
  }

  export class AnnotationMotivation extends StringValue {
    static BOOKMARKING: AnnotationMotivation;
    static CLASSIFYING: AnnotationMotivation;
    static COMMENTING: AnnotationMotivation;
    static DESCRIBING: AnnotationMotivation;
    static EDITING: AnnotationMotivation;
    static HIGHLIGHTING: AnnotationMotivation;
    static IDENTIFYING: AnnotationMotivation;
    static LINKING: AnnotationMotivation;
    static MODERATING: AnnotationMotivation;
    static PAINTING: AnnotationMotivation;
    static QUESTIONING: AnnotationMotivation;
    static REPLYING: AnnotationMotivation;
    static TAGGING: AnnotationMotivation;
    static TRANSCRIBING: AnnotationMotivation;

    bookmarking(): AnnotationMotivation;

    classifying(): AnnotationMotivation;

    commenting(): AnnotationMotivation;

    describing(): AnnotationMotivation;

    editing(): AnnotationMotivation;

    highlighting(): AnnotationMotivation;

    identifying(): AnnotationMotivation;

    linking(): AnnotationMotivation;

    moderating(): AnnotationMotivation;

    painting(): AnnotationMotivation;

    questioning(): AnnotationMotivation;

    replying(): AnnotationMotivation;

    tagging(): AnnotationMotivation;

    transcribing(): AnnotationMotivation;
  }

  export class Behavior extends StringValue {
    static AUTOADVANCE: Behavior;
    static NONAV: Behavior;
    static PAGED: Behavior;

    autoadvance(): Behavior;

    nonav(): Behavior;

    paged(): Behavior;
  }

  export class IIIFResourceType extends StringValue {
    static ANNOTATION: IIIFResourceType;
    static CANVAS: IIIFResourceType;
    static COLLECTION: IIIFResourceType;
    static MANIFEST: IIIFResourceType;
    static RANGE: IIIFResourceType;
    static SEQUENCE: IIIFResourceType;

    annotation(): IIIFResourceType;

    canvas(): IIIFResourceType;

    collection(): IIIFResourceType;

    manifest(): IIIFResourceType;

    range(): IIIFResourceType;

    sequence(): IIIFResourceType;
  }

  export class ManifestType extends StringValue {
    static EMPTY: ManifestType;
    static MANUSCRIPT: ManifestType;
    static MONOGRAPH: ManifestType;

    empty(): ManifestType;

    manuscript(): ManifestType;

    monograph(): ManifestType;
  }

  export class RenderingFormat extends StringValue {
    static PDF: RenderingFormat;
    static DOC: RenderingFormat;
    static DOCX: RenderingFormat;

    pdf(): RenderingFormat;

    doc(): RenderingFormat;

    docx(): RenderingFormat;
  }

  export class MediaType extends StringValue {
    static JPG: MediaType;
    static MP4: MediaType;
    static PDF: MediaType;
    static THREEJS: MediaType;
    static WEBM: MediaType;

    jpg(): MediaType;

    mp4(): MediaType;

    pdf(): MediaType;

    threejs(): MediaType;

    webm(): MediaType;
  }

  export class ResourceType extends StringValue {
    static CANVAS: ResourceType;
    static CHOICE: ResourceType;
    static DOCUMENT: ResourceType;
    static IMAGE: ResourceType;
    static MOVINGIMAGE: ResourceType;
    static PHYSICALOBJECT: ResourceType;
    static SOUND: ResourceType;
    static TEXT: ResourceType;

    canvas(): ResourceType;

    choice(): ResourceType;

    document(): ResourceType;

    image(): ResourceType;

    movingimage(): ResourceType;

    physicalobject(): ResourceType;

    sound(): ResourceType;

    text(): ResourceType;
  }

  export class ServiceProfile extends StringValue {
    static STANFORDIIIFIMAGECOMPLIANCE0: ServiceProfile;
    static STANFORDIIIFIMAGECOMPLIANCE1: ServiceProfile;
    static STANFORDIIIFIMAGECOMPLIANCE2: ServiceProfile;
    static STANFORDIIIFIMAGECONFORMANCE0: ServiceProfile;
    static STANFORDIIIFIMAGECONFORMANCE1: ServiceProfile;
    static STANFORDIIIFIMAGECONFORMANCE2: ServiceProfile;
    static STANFORDIIIF1IMAGECOMPLIANCE0: ServiceProfile;
    static STANFORDIIIF1IMAGECOMPLIANCE1: ServiceProfile;
    static STANFORDIIIF1IMAGECOMPLIANCE2: ServiceProfile;
    static STANFORDIIIF1IMAGECONFORMANCE0: ServiceProfile;
    static STANFORDIIIF1IMAGECONFORMANCE1: ServiceProfile;
    static STANFORDIIIF1IMAGECONFORMANCE2: ServiceProfile;
    static IIIF1IMAGELEVEL0: ServiceProfile;
    static IIIF1IMAGELEVEL0PROFILE: ServiceProfile;
    static IIIF1IMAGELEVEL1: ServiceProfile;
    static IIIF1IMAGELEVEL1PROFILE: ServiceProfile;
    static IIIF1IMAGELEVEL2: ServiceProfile;
    static IIIF1IMAGELEVEL2PROFILE: ServiceProfile;
    static IIIF2IMAGELEVEL0: ServiceProfile;
    static IIIF2IMAGELEVEL0PROFILE: ServiceProfile;
    static IIIF2IMAGELEVEL1: ServiceProfile;
    static IIIF2IMAGELEVEL1PROFILE: ServiceProfile;
    static IIIF2IMAGELEVEL2: ServiceProfile;
    static IIIF2IMAGELEVEL2PROFILE: ServiceProfile;
    static AUTHCLICKTHROUGH: ServiceProfile;
    static AUTHLOGIN: ServiceProfile;
    static AUTHLOGOUT: ServiceProfile;
    static AUTHRESTRICTED: ServiceProfile;
    static AUTHTOKEN: ServiceProfile;
    static AUTH1CLICKTHROUGH: ServiceProfile;
    static AUTH1EXTERNAL: ServiceProfile;
    static AUTH1KIOSK: ServiceProfile;
    static AUTH1LOGIN: ServiceProfile;
    static AUTH1LOGOUT: ServiceProfile;
    static AUTH1PROBE: ServiceProfile;
    static AUTH1TOKEN: ServiceProfile;
    static AUTOCOMPLETE: ServiceProfile;
    static SEARCH: ServiceProfile;
    static TRACKINGEXTENSIONS: ServiceProfile;
    static UIEXTENSIONS: ServiceProfile;
    static PRINTEXTENSIONS: ServiceProfile;
    static SHAREEXTENSIONS: ServiceProfile;
    static OTHERMANIFESTATIONS: ServiceProfile;
    static IXIF: ServiceProfile;

    auth1Clickthrough(): ServiceProfile;

    auth1External(): ServiceProfile;

    auth1Kiosk(): ServiceProfile;

    auth1Login(): ServiceProfile;

    auth1Logout(): ServiceProfile;

    auth1Probe(): ServiceProfile;

    auth1Token(): ServiceProfile;

    autoComplete(): ServiceProfile;

    iiif1ImageLevel1(): ServiceProfile;

    iiif1ImageLevel2(): ServiceProfile;

    iiif2ImageLevel1(): ServiceProfile;

    iiif2ImageLevel2(): ServiceProfile;

    ixif(): ServiceProfile;

    login(): ServiceProfile;

    clickThrough(): ServiceProfile;

    restricted(): ServiceProfile;

    logout(): ServiceProfile;

    otherManifestations(): ServiceProfile;

    search(): ServiceProfile;

    stanfordIIIFImageCompliance1(): ServiceProfile;

    stanfordIIIFImageCompliance2(): ServiceProfile;

    stanfordIIIFImageConformance1(): ServiceProfile;

    stanfordIIIFImageConformance2(): ServiceProfile;

    stanfordIIIF1ImageCompliance1(): ServiceProfile;

    stanfordIIIF1ImageCompliance2(): ServiceProfile;

    stanfordIIIF1ImageConformance1(): ServiceProfile;

    stanfordIIIF1ImageConformance2(): ServiceProfile;

    token(): ServiceProfile;

    trackingExtensions(): ServiceProfile;

    uiExtensions(): ServiceProfile;

    printExtensions(): ServiceProfile;

    shareExtensions(): ServiceProfile;
  }

  export class ViewingDirection extends StringValue {
    static LEFTTORIGHT: ViewingDirection;
    static RIGHTTOLEFT: ViewingDirection;
    static TOPTOBOTTOM: ViewingDirection;
    static BOTTOMTOTOP: ViewingDirection;

    leftToRight(): ViewingDirection;

    rightToLeft(): ViewingDirection;

    topToBottom(): ViewingDirection;

    bottomToTop(): ViewingDirection;
  }

  export class ViewingHint extends StringValue {
    static CONTINUOUS: ViewingHint;
    static EMPTY: ViewingHint;
    static INDIVIDUALS: ViewingHint;
    static NONPAGED: ViewingHint;
    static PAGED: ViewingHint;
    static TOP: ViewingHint;

    continuous(): ViewingHint;

    empty(): ViewingHint;

    individuals(): ViewingHint;

    nonPaged(): ViewingHint;

    paged(): ViewingHint;

    top(): ViewingHint;
  }

  export class JSONLDResource implements IJSONLDResource {
    context: string;
    id: string;
    __jsonld: any;

    constructor(jsonld?: any);

    getProperty(name: string): any;
  }

  export class ManifestResource extends JSONLDResource implements IManifestResource {
    externalResource: IExternalResource;
    options: IManifestoOptions;

    constructor(jsonld: any, options?: IManifestoOptions);

    getIIIFResourceType(): IIIFResourceType;

    getLabel(): LanguageMap;

    getDefaultLabel(): string | null;

    getMetadata(): LabelValuePair[];

    getRendering(format: RenderingFormat | string): IRendering | null;

    getRenderings(): IRendering[];

    getService(profile: ServiceProfile | string): IService | null;

    getServices(): IService[];

    getThumbnail(): Thumbnail | null;

    isAnnotation(): boolean;

    isCanvas(): boolean;

    isCollection(): boolean;

    isManifest(): boolean;

    isRange(): boolean;

    isSequence(): boolean;
  }

  export class Resource extends ManifestResource implements IResource {
    index: number;

    constructor(jsonld?: any, options?: IManifestoOptions);

    getFormat(): MediaType | null;

    getResources(): IAnnotation[];

    getType(): ResourceType | null;

    getWidth(): number;

    getHeight(): number;

    getMaxWidth(): number;

    getMaxHeight(): number | null;
  }

  export class Canvas extends Resource implements ICanvas {
    ranges: IRange[];

    constructor(jsonld?: any, options?: IManifestoOptions);

    getCanonicalImageUri(w?: number): string;

    getMaxDimensions(): Size | null;

    getContent(): IAnnotation[];

    getDuration(): number | null;

    getImages(): IAnnotation[];

    getIndex(): number;

    getOtherContent(): Promise<AnnotationList[]>;

    getWidth(): number;

    getHeight(): number;
  }

  export class IIIFResource extends ManifestResource implements IIIIFResource {
    defaultTree: ITreeNode;
    index: number;
    isLoaded: boolean;
    parentCollection: ICollection;
    parentLabel: string;

    constructor(jsonld?: any, options?: IManifestoOptions);

    getAttribution(): LanguageMap;

    getDescription(): LanguageMap;

    getIIIFResourceType(): IIIFResourceType;

    getLogo(): string | null;

    getLicense(): string | null;

    getNavDate(): Date;

    getRelated(): any;

    getSeeAlso(): any;

    getDefaultTree(): ITreeNode;

    getRequiredStatement(): LabelValuePair | null;

    isCollection(): boolean;

    isManifest(): boolean;

    load(): Promise<IIIIFResource>;
  }

  export class Manifest extends IIIFResource implements IManifest {
    index: number;
    private _allRanges;
    items: ISequence[];
    private _topRanges;

    constructor(jsonld?: any, options?: IManifestoOptions);

    getPosterCanvas(): ICanvas | null;

    getBehavior(): Behavior | null;

    getDefaultTree(): ITreeNode;

    private _getTopRanges;

    getTopRanges(): IRange[];

    private _getRangeById;
    private _parseRanges;

    getAllRanges(): IRange[];

    getRangeById(id: string): IRange | null;

    getRangeByPath(path: string): IRange | null;

    getSequences(): ISequence[];

    getSequenceByIndex(sequenceIndex: number): ISequence;

    getTotalSequences(): number;

    getManifestType(): ManifestType;

    getTrackingLabel(): string;

    isMultiSequence(): boolean;

    isPagingEnabled(): boolean;

    getViewingDirection(): ViewingDirection | null;

    getViewingHint(): ViewingHint | null;
  }

  export class Collection extends IIIFResource implements ICollection {
    items: IIIIFResource[];
    private _collections;
    private _manifests;

    constructor(jsonld: any, options: IManifestoOptions);

    getCollections(): ICollection[];

    getManifests(): IManifest[];

    getCollectionByIndex(collectionIndex: number): Promise<ICollection>;

    getManifestByIndex(manifestIndex: number): Promise<IManifest>;

    getTotalCollections(): number;

    getTotalManifests(): number;

    getTotalItems(): number;

    getViewingDirection(): ViewingDirection;

    /**
     * Get a tree of sub collections and manifests, using each child manifest's first 'top' range.
     */
    getDefaultTree(): ITreeNode;

    private _parseManifests;
    private _parseCollections;
  }

  export class Range extends ManifestResource implements IRange {
    private _ranges;
    canvases: string[] | null;
    items: IManifestResource[];
    parentRange: Range;
    path: string;
    treeNode: ITreeNode;

    constructor(jsonld?: any, options?: IManifestoOptions);

    getCanvasIds(): string[];

    getDuration(): Duration | undefined;

    getRanges(): IRange[];

    getBehavior(): Behavior | null;

    getViewingDirection(): ViewingDirection | null;

    getViewingHint(): ViewingHint | null;

    getTree(treeRoot: ITreeNode): ITreeNode;

    spansTime(time: number): boolean;

    private _parseTreeNode;
  }

  export class Rendering extends ManifestResource implements IRendering {
    constructor(jsonld?: any, options?: IManifestoOptions);

    getFormat(): RenderingFormat;
  }

  export class Sequence extends ManifestResource implements ISequence {
    items: ICanvas[];
    private _thumbnails;

    constructor(jsonld?: any, options?: IManifestoOptions);

    getCanvases(): ICanvas[];

    getCanvasById(id: string): ICanvas | null;

    getCanvasByIndex(canvasIndex: number): any;

    getCanvasIndexById(id: string): number | null;

    getCanvasIndexByLabel(label: string, foliated?: boolean): number;

    getLastCanvasLabel(alphanumeric?: boolean): string;

    getLastPageIndex(): number;

    getNextPageIndex(canvasIndex: number, pagingEnabled?: boolean): number;

    getPagedIndices(canvasIndex: number, pagingEnabled?: boolean): number[];

    getPrevPageIndex(canvasIndex: number, pagingEnabled?: boolean): number;

    getStartCanvasIndex(): number;

    getThumbs(width: number, height?: number): IThumb[];

    getThumbnails(): IThumbnail[];

    getStartCanvas(): string;

    getTotalCanvases(): number;

    getViewingDirection(): ViewingDirection | null;

    getViewingHint(): ViewingHint | null;

    isCanvasIndexOutOfRange(canvasIndex: number): boolean;

    isFirstCanvas(canvasIndex: number): boolean;

    isLastCanvas(canvasIndex: number): boolean;

    isMultiCanvas(): boolean;

    isPagingEnabled(): boolean;

    isTotalCanvasesEven(): boolean;
  }

  export class Deserialiser {
    static parse(manifest: any, options?: IManifestoOptions): IIIIFResource | null;

    static parseJson(json: any, options?: IManifestoOptions): IIIIFResource | null;

    static parseCollection(json: any, options?: IManifestoOptions): ICollection;

    static parseCollections(collection: ICollection, options?: IManifestoOptions): void;

    static parseManifest(json: any, options?: IManifestoOptions): IManifest;

    static parseManifests(collection: ICollection, options?: IManifestoOptions): void;

    static parseItem(json: any, options?: IManifestoOptions): IIIIFResource | null;

    static parseItems(collection: ICollection, options?: IManifestoOptions): void;
  }

  export class Serialiser {
    static serialise(manifest: IManifest): string;
  }

  export class Service extends ManifestResource implements IService {
    constructor(jsonld?: any, options?: IManifestoOptions);

    getProfile(): ServiceProfile;

    getConfirmLabel(): string | null;

    getDescription(): string | null;

    getFailureDescription(): string | null;

    getFailureHeader(): string | null;

    getHeader(): string | null;

    getServiceLabel(): string | null;

    getInfoUri(): string;
  }

  export interface IThumb {
    data: any;
    height: number;
    index: number;
    label: string;
    uri: string;
    visible: boolean;
    width: number;
  }

  export class Thumb implements IThumb {
    data: any;
    index: number;
    uri: string;
    label: string;
    width: number;
    height: number;
    visible: boolean;

    constructor(width: number, canvas: ICanvas);
  }

  export interface ITreeNode {
    data: any;
    nodes: ITreeNode[];
    selected: boolean;
    expanded: boolean;
    id: string;
    label: string;
    navDate: Date;
    parentNode: ITreeNode;

    addNode(node: ITreeNode): void;

    isCollection(): boolean;

    isManifest(): boolean;

    isRange(): boolean;
  }

  export class TreeNode implements ITreeNode {
    data: any;
    nodes: ITreeNode[];
    selected: boolean;
    expanded: boolean;
    id: string;
    label: string;
    navDate: Date;
    parentNode: ITreeNode;

    constructor(label?: string, data?: any);

    addNode(node: ITreeNode): void;

    isCollection(): boolean;

    isManifest(): boolean;

    isRange(): boolean;
  }

  export class TreeNodeType extends StringValue {
    static COLLECTION: TreeNodeType;
    static MANIFEST: TreeNodeType;
    static RANGE: TreeNodeType;

    collection(): TreeNodeType;

    manifest(): TreeNodeType;

    range(): TreeNodeType;
  }

  export class Language {
    value: string;
    locale: string;

    constructor(value: string | string[], locale: string);
  }

  export class LanguageMap extends Array<Language> {
    static parse(language: any, defaultLocale: string): LanguageMap;

    static getValue(languageCollection: LanguageMap, locale?: string): string | null;
  }

  export class LabelValuePair {
    label: LanguageMap;
    value: LanguageMap;
    defaultLocale: string;
    resource: any;

    constructor(defaultLocale: string);

    parse(resource: any): void;

    getLabel(): string | null;

    setLabel(value: string): void;

    getValue(): string | null;

    setValue(value: string): void;
  }

  export class Size {
    width: number;
    height: number;

    constructor(width: number, height: number);
  }

  export class Annotation extends ManifestResource implements IAnnotation {
    constructor(jsonld: any, options: IManifestoOptions);

    getBody(): IAnnotationBody[];

    getMotivation(): AnnotationMotivation | null;

    getOn(): string;

    getTarget(): string | null;

    getResource(): Resource;
  }

  export class AnnotationBody extends ManifestResource {
    constructor(jsonld?: any, options?: IManifestoOptions);

    getFormat(): MediaType | null;

    getType(): ResourceType | null;

    getWidth(): number;

    getHeight(): number;
  }

  export class AnnotationList extends JSONLDResource implements IAnnotationList {
    options: IManifestoOptions;
    label: string;
    isLoaded: boolean;

    constructor(label: any, jsonld?: any, options?: IManifestoOptions);

    getIIIFResourceType(): IIIFResourceType;

    getLabel(): string;

    getResources(): Annotation[];

    load(): Promise<AnnotationList>;
  }

  export class AnnotationPage extends ManifestResource implements IAnnotationPage {
    constructor(jsonld: any, options: IManifestoOptions);

    getItems(): IAnnotation[];
  }

  export interface IAccessToken {
    accessToken: string;
    error: string;
    errorDescription: string;
    expiresIn: number;
    tokenType: string;
  }

  export interface IAnnotation extends IManifestResource {
    getBody(): IAnnotationBody[];

    getMotivation(): AnnotationMotivation | null;

    getOn(): string;

    getResource(): Resource;

    getTarget(): string | null;
  }

  export interface IAnnotationBody extends IManifestResource {
    getFormat(): MediaType | null;

    getType(): ResourceType | null;

    getWidth(): number;

    getHeight(): number;
  }

  export interface IAnnotationList extends IJSONLDResource {
  }

  export interface IAnnotationPage extends IManifestResource {
    getItems(): IAnnotation[];
  }

  export interface ICanvas extends IResource {
    ranges: IRange[];

    getCanonicalImageUri(width?: number): string;

    getContent(): IAnnotation[];

    getDuration(): number | null;

    getHeight(): number;

    getImages(): IAnnotation[];

    getIndex(): number;

    getMaxDimensions(): Size | null;

    getWidth(): number;
  }

  export interface ICollection extends IIIIFResource {
    getCollectionByIndex(index: number): Promise<ICollection>;

    getCollections(): ICollection[];

    getManifestByIndex(index: number): Promise<IManifest>;

    getManifests(): IManifest[];

    getTotalCollections(): number;

    getTotalManifests(): number;

    getViewingDirection(): ViewingDirection;

    items: IIIIFResource[];
  }

  export interface IExternalImageResourceData extends IExternalResourceData {
    width: number;
    height: number;
  }

  export interface IExternalResource {
    authAPIVersion: number;
    authHoldingPage: any;
    clickThroughService: IService | null;
    data: IExternalResourceData;
    dataUri: string | null;
    error: any;
    externalService: IService | null;

    getData(accessToken?: IAccessToken): Promise<IExternalResource>;

    hasServiceDescriptor(): boolean;

    height: number;
    index: number;

    isAccessControlled(): boolean;

    isResponseHandled: boolean;
    kioskService: IService | null;
    loginService: IService | null;
    logoutService: IService | null;
    options?: IManifestoOptions;
    restrictedService: IService | null;
    status: number;
    tokenService: IService | null;
    width: number;
  }

  export interface IExternalResourceData {
    hasServiceDescriptor: boolean;
    id: string;
    index: number;
    profile: string | any[];
  }

  export interface IExternalResourceOptions {
    authApiVersion: number;
  }

  export interface IIIIFResource extends IManifestResource {
    defaultTree: ITreeNode;

    getAttribution(): LanguageMap;

    getDefaultTree(): ITreeNode;

    getDescription(): LanguageMap;

    getIIIFResourceType(): IIIFResourceType;

    getLicense(): string | null;

    getLogo(): string | null;

    getNavDate(): Date;

    getRelated(): any;

    getRequiredStatement(): LabelValuePair | null;

    getSeeAlso(): any;

    index: number;

    isCollection(): boolean;

    isLoaded: boolean;

    isManifest(): boolean;

    load(): Promise<IIIIFResource>;

    parentCollection: ICollection;
    parentLabel: string;
  }

  export interface IJSONLDResource {
    context: string;
    id: string;
    __jsonld: any;

    getProperty(name: string): any;
  }

  export interface IManifest extends IIIIFResource {
    getAllRanges(): IRange[];

    getBehavior(): Behavior | null;

    getManifestType(): ManifestType;

    getPosterCanvas(): ICanvas | null;

    getRangeById(id: string): IRange | null;

    getRangeByPath(path: string): IRange | null;

    getSequenceByIndex(index: number): ISequence;

    getSequences(): ISequence[];

    getTopRanges(): IRange[];

    getTotalSequences(): number;

    getTrackingLabel(): string;

    getViewingDirection(): ViewingDirection | null;

    getViewingHint(): ViewingHint | null;

    isMultiSequence(): boolean;

    isPagingEnabled(): boolean;

    items: ISequence[];
  }

  export interface IManifestResource extends IJSONLDResource {
    externalResource: IExternalResource;
    options: IManifestoOptions;

    getDefaultLabel(): string | null;

    getLabel(): LanguageMap;

    getMetadata(): LabelValuePair[];

    getRendering(format: RenderingFormat | string): IRendering | null;

    getRenderings(): IRendering[];

    getService(profile: ServiceProfile | string): IService | null;

    getServices(): IService[];

    getThumbnail(): Thumbnail | null;

    isAnnotation(): boolean;

    isCanvas(): boolean;

    isManifest(): boolean;

    isRange(): boolean;

    isSequence(): boolean;
  }

  export interface IManifesto {
    AnnotationMotivation: AnnotationMotivation;
    Behavior: Behavior;
    create: (manifest: string, options?: IManifestoOptions) => IIIIFResource;
    IIIFResourceType: IIIFResourceType;
    LabelValuePair: any;
    Language: any;
    LanguageMap: any;
    loadManifest: (uri: string) => Promise<string>;
    ManifestType: ManifestType;
    MediaType: MediaType;
    RenderingFormat: RenderingFormat;
    ResourceType: ResourceType;
    ServiceProfile: ServiceProfile;
    Size: any;
    StatusCodes: IStatusCodes;
    TreeNode: any;
    TreeNodeType: TreeNodeType;
    Utils: any;
    ViewingDirection: ViewingDirection;
    ViewingHint: ViewingHint;
  }

  export interface IManifestoOptions {
    defaultLabel: string;
    locale: string;
    index?: number;
    resource: IIIIFResource;
    navDate?: Date;
    pessimisticAccessControl: boolean;
  }

  export interface IRange extends IManifestResource {
    canvases: string[] | null;

    getBehavior(): Behavior | null;

    getCanvasIds(): string[];

    getDuration(): Duration | undefined;

    getRanges(): IRange[];

    getTree(treeRoot: ITreeNode): ITreeNode;

    getViewingDirection(): ViewingDirection | null;

    getViewingHint(): ViewingHint | null;

    items: IManifestResource[];
    parentRange: IRange | undefined;
    path: string;

    spansTime(time: number): boolean;

    treeNode: ITreeNode;
  }

  export interface IRendering extends IManifestResource {
    getFormat(): RenderingFormat;
  }

  export interface IResource extends IManifestResource {
    getFormat(): MediaType | null;

    getHeight(): number;

    getMaxHeight(): number | null;

    getResources(): IAnnotation[];

    getType(): ResourceType | null;

    getWidth(): number;

    index: number;
  }

  export interface ISequence extends IManifestResource {
    getCanvasById(id: string): ICanvas | null;

    getCanvasByIndex(index: number): ICanvas;

    getCanvases(): ICanvas[];

    getCanvasIndexById(id: string): number | null;

    getCanvasIndexByLabel(label: string, foliated: boolean): number;

    getLastCanvasLabel(digitsOnly?: boolean): string;

    getLastPageIndex(): number;

    getNextPageIndex(index: number): number;

    getPagedIndices(index: number): number[];

    getPrevPageIndex(index: number): number;

    getRendering(format: RenderingFormat | string): IRendering | null;

    getStartCanvas(): string;

    getStartCanvasIndex(): number;

    getThumbnails(): IThumbnail[];

    getThumbs(width: number, height: number): IThumb[];

    getTotalCanvases(): number;

    getViewingDirection(): ViewingDirection | null;

    getViewingHint(): ViewingHint | null;

    isCanvasIndexOutOfRange(index: number): boolean;

    isFirstCanvas(index: number): boolean;

    isLastCanvas(index: number): boolean;

    isMultiCanvas(): boolean;

    isPagingEnabled(): boolean;

    isTotalCanvasesEven(): boolean;

    items: ICanvas[];
  }

  export interface IService extends IManifestResource {
    getConfirmLabel(): string | null;

    getDescription(): string | null;

    getFailureDescription(): string | null;

    getFailureHeader(): string | null;

    getHeader(): string | null;

    getInfoUri(): string;

    getProfile(): ServiceProfile;

    getServiceLabel(): string | null;
  }

  export interface IStatusCodes {
    AUTHORIZATION_FAILED: number;
    FORBIDDEN: number;
    INTERNAL_SERVER_ERROR: number;
    RESTRICTED: number;
  }

  export interface IThumbnail extends IResource {
  }

  export class Thumbnail extends Resource implements IThumbnail {
    constructor(jsonld: any, options: IManifestoOptions);
  }

  export class Utils {
    static getMediaType(type: string): string;

    static getImageQuality(profile: ServiceProfile): string;

    static getInexactLocale(locale: string): string;

    static getLocalisedValue(resource: any, locale: string): string | null;

    static generateTreeNodeIds(treeNode: ITreeNode, index?: number): void;

    static normaliseType(type: string): string;

    static normaliseUrl(url: string): string;

    static normalisedUrlsMatch(url1: string, url2: string): boolean;

    static isImageProfile(profile: string | ServiceProfile): boolean;

    static isLevel0ImageProfile(profile: string | ServiceProfile): boolean;

    static isLevel1ImageProfile(profile: string | ServiceProfile): boolean;

    static isLevel2ImageProfile(profile: string | ServiceProfile): boolean;

    static loadResource(uri: string): Promise<string>;

    static loadExternalResourcesAuth1(resources: IExternalResource[], openContentProviderInteraction: (service: IService) => any, openTokenService: (resource: IExternalResource, tokenService: IService) => Promise<any>, getStoredAccessToken: (resource: IExternalResource) => Promise<IAccessToken | null>, userInteractedWithContentProvider: (contentProviderInteraction: any) => Promise<any>, getContentProviderInteraction: (resource: IExternalResource, service: IService) => Promise<any>, handleMovedTemporarily: (resource: IExternalResource) => Promise<any>, showOutOfOptionsMessages: (resource: IExternalResource, service: IService) => void): Promise<IExternalResource[]>;

    static loadExternalResourceAuth1(resource: IExternalResource, openContentProviderInteraction: (service: IService) => any, openTokenService: (resource: IExternalResource, tokenService: IService) => Promise<void>, getStoredAccessToken: (resource: IExternalResource) => Promise<IAccessToken | null>, userInteractedWithContentProvider: (contentProviderInteraction: any) => Promise<any>, getContentProviderInteraction: (resource: IExternalResource, service: IService) => Promise<any>, handleMovedTemporarily: (resource: IExternalResource) => Promise<any>, showOutOfOptionsMessages: (resource: IExternalResource, service: IService) => void): Promise<IExternalResource>;

    static doAuthChain(resource: IExternalResource, openContentProviderInteraction: (service: IService) => any, openTokenService: (resource: IExternalResource, tokenService: IService) => Promise<any>, userInteractedWithContentProvider: (contentProviderInteraction: any) => Promise<any>, getContentProviderInteraction: (resource: IExternalResource, service: IService) => Promise<any>, handleMovedTemporarily: (resource: IExternalResource) => Promise<any>, showOutOfOptionsMessages: (resource: IExternalResource, service: IService) => void): Promise<IExternalResource | void>;

    static attemptResourceWithToken(resource: IExternalResource, openTokenService: (resource: IExternalResource, tokenService: IService) => Promise<any>, authService: IService): Promise<IExternalResource | void>;

    static loadExternalResourcesAuth09(resources: IExternalResource[], tokenStorageStrategy: string, clickThrough: (resource: IExternalResource) => Promise<any>, restricted: (resource: IExternalResource) => Promise<any>, login: (resource: IExternalResource) => Promise<any>, getAccessToken: (resource: IExternalResource, rejectOnError: boolean) => Promise<IAccessToken>, storeAccessToken: (resource: IExternalResource, token: IAccessToken, tokenStorageStrategy: string) => Promise<any>, getStoredAccessToken: (resource: IExternalResource, tokenStorageStrategy: string) => Promise<IAccessToken>, handleResourceResponse: (resource: IExternalResource) => Promise<any>, options?: IManifestoOptions): Promise<IExternalResource[]>;

    static loadExternalResourceAuth09(resource: IExternalResource, tokenStorageStrategy: string, clickThrough: (resource: IExternalResource) => Promise<any>, restricted: (resource: IExternalResource) => Promise<any>, login: (resource: IExternalResource) => Promise<any>, getAccessToken: (resource: IExternalResource, rejectOnError: boolean) => Promise<IAccessToken>, storeAccessToken: (resource: IExternalResource, token: IAccessToken, tokenStorageStrategy: string) => Promise<any>, getStoredAccessToken: (resource: IExternalResource, tokenStorageStrategy: string) => Promise<IAccessToken>, handleResourceResponse: (resource: IExternalResource) => Promise<any>, options?: IManifestoOptions): Promise<IExternalResource>;

    static createError(name: string, message: string): Error;

    static createAuthorizationFailedError(): Error;

    static createRestrictedError(): Error;

    static createInternalServerError(message: string): Error;

    static authorize(resource: IExternalResource, tokenStorageStrategy: string, clickThrough: (resource: IExternalResource) => Promise<any>, restricted: (resource: IExternalResource) => Promise<any>, login: (resource: IExternalResource) => Promise<any>, getAccessToken: (resource: IExternalResource, rejectOnError: boolean) => Promise<IAccessToken>, storeAccessToken: (resource: IExternalResource, token: IAccessToken, tokenStorageStrategy: string) => Promise<any>, getStoredAccessToken: (resource: IExternalResource, tokenStorageStrategy: string) => Promise<IAccessToken>): Promise<IExternalResource>;

    private static showAuthInteraction;

    static getService(resource: any, profile: ServiceProfile | string): IService | null;

    static getResourceById(parentResource: IJSONLDResource, id: string): IJSONLDResource;

    /**
     * Does a depth first traversal of an Object, returning an Object that
     * matches provided k and v arguments
     * @example Utils.traverseAndFind({foo: 'bar'}, 'foo', 'bar')
     */
    static traverseAndFind(object: any, k: string, v: string): object & void;

    static getServices(resource: any): IService[];

    static getTemporalComponent(target: string): number[] | null;
  }
}

declare const http: any;
declare const https: any;
declare const url: any;
declare namespace Manifesto {

}

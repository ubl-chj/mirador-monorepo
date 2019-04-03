import flatten from 'lodash/flatten';
/**
 * ManifestoCanvas - adds additional, testable logic around Manifesto's Canvas
 * https://iiif-commons.github.io/manifesto/classes/_canvas_.manifesto.canvas.html
 */
export default class ManifestoCanvas {
  public canvas: any

  public constructor(canvas) {
    this.canvas = canvas;
  }

  /**
   */
  public get canonicalImageUri() {
    return this.canvas.getCanonicalImageUri();
  }

  /**
   */
  public get aspectRatio() {
    return this.canvas.getWidth() / this.canvas.getHeight();
  }

  /** */
  public get annotationListUris() {
    return flatten(
      new Array(this.canvas.__jsonld.otherContent), // eslint-disable-line no-underscore-dangle
    )
      .filter(otherContent => otherContent && otherContent['@type'] === 'sc:AnnotationList')
      .map(otherContent => otherContent['@id']);
  }

  /**
   */
  public get imageInformationUri() {
    if (!(
      this.canvas.getImages()[0]
      && this.canvas.getImages()[0].getResource()
      && this.canvas.getImages()[0].getResource().getServices()[0]
      && this.canvas.getImages()[0].getResource().getServices()[0].id
    )) {
      return undefined;
    }

    return `${
      this.canvas.getImages()[0].getResource().getServices()[0].id.replace(/\/$/, '')
    }/info.json`;
  }

  /**
   * checks whether the canvas has a valid height
   */
  public get hasValidHeight() {
    return (
      typeof this.canvas.getHeight() === 'number'
      && this.canvas.getHeight() > 0
    );
  }

  /**
   * checks whether the canvas has a valid height
   */
  public get hasValidWidth() {
    return (
      typeof this.canvas.getHeight() === 'number'
      && this.canvas.getHeight() > 0
    );
  }

  /**
   * checks whether the canvas has valid dimensions
   */
  public get hasValidDimensions() {
    return (
      this.hasValidHeight
      && this.hasValidWidth
    );
  }

  /**
   * Get the canvas label
   */
  public getLabel() {
    return this.canvas.getLabel().length > 0
      ? this.canvas.getLabel().map(label => label.value)[0]
      : String(this.canvas.index + 1);
  }

  /**
   * Creates a canonical image request for a thumb
   * @param {Number} height
   */
  public thumbnail(maxWidth = undefined, maxHeight = undefined) {
    let width;
    let height;

    if (!this.imageInformationUri) {
      return undefined;
    }

    switch (this.thumbnailConstraints(maxWidth, maxHeight)) {
      case 'sizeByH':
        height = maxHeight;
        break;
      case 'sizeByW':
        width = maxWidth;
        break;
      default:
        height = '150';
    }

    // note that, although the IIIF server may support sizeByConfinedWh (e.g. !w,h)
    // this is a IIIF level 2 feature, so we're instead providing w, or h,-style requests
    // which are only level 1.
    return this.canonicalImageUri.replace(/\/full\/.*\/0\//, `/full/${width || ''},${height || ''}/0/`);
  }

  /** @private */
  public thumbnailConstraints(maxWidth, maxHeight) {
    if (!maxHeight && !maxWidth) return undefined;
    if (maxHeight && !maxWidth) return 'sizeByH';
    if (!maxHeight && maxWidth) return 'sizeByW';

    const { aspectRatio } = this;
    const desiredAspectRatio = maxWidth / maxHeight;

    return desiredAspectRatio < aspectRatio ? 'sizeByW' : 'sizeByH';
  }
}
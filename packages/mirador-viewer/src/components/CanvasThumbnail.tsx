import 'intersection-observer';
import React, { Component } from 'react';
import IntersectionObserver from '@researchgate/react-intersection-observer';

interface ICanvasThumbnail {
  aspectRatio?: number
  className?: any
  imageUrl: string
  isValid: boolean
  maxHeight: number
  maxWidth: number
  style?: any
}

/**
 * Uses InteractionObserver to "lazy" load canvas thumbnails that are in view.
 */
export class CanvasThumbnail extends Component<ICanvasThumbnail> {
  public state: {
    image: any
    loaded: boolean
  }
  private defaultImgPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMDQmtBwADgwF/Op8FmAAAAABJRU5ErkJggg==';

  public constructor(props) {
    super(props);
    this.state = { image: null, loaded: false };
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  /**
   * Handles the intersection (visibility) of a given thumbnail, by requesting
   * the image and then updating the state.
   */
  private handleIntersection(event) {
    const { imageUrl } = this.props;
    const { loaded } = this.state;
    if (loaded || !event.isIntersecting || !imageUrl) return;
    const image = new Image();
    image.src = imageUrl;
    this.setState({
      image,
      loaded: true,
    });
  }

  /**
   * Return a the image URL if it is loaded and valid, otherwise return a placeholder
  */
  private imageSrc() {
    const { isValid } = this.props;
    const { loaded, image } = this.state;

    if (loaded && isValid && image && image.src) {
      return image.src;
    }

    return this.defaultImgPlaceholder;
  }

  /** */
  private imageConstraints() {
    const {
      maxHeight, maxWidth, aspectRatio,
    } = this.props;

    if (maxHeight && maxWidth && aspectRatio) return 'sizeByConfinedWh';
    if (maxHeight && maxWidth) return 'sizeByDistortedWh';
    if (maxHeight && !maxWidth) return 'sizeByH';
    if (!maxHeight && maxWidth) return 'sizeByW';

    return undefined;
  }

  /**
   *
  */
  private imageStyles() {
    const {
      maxHeight, maxWidth, aspectRatio, style,
    } = this.props;

    let height;
    let width;

    switch (this.imageConstraints()) {
      case 'sizeByConfinedWh':
        // size to width
        if ((maxWidth / maxHeight) < aspectRatio) {
          height = maxWidth / aspectRatio;
          width = maxWidth;
        } else {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
        break;
      case 'sizeByDistortedWh':
        height = maxHeight;
        width = maxWidth;
        break;
      case 'sizeByH':
        height = maxHeight;
        width = 'auto';
        break;
      case 'sizeByW':
        height = 'auto';
        width = maxWidth;
        break;
      default:
        height = 'auto';
        width = 'auto';
    }

    return {
      height,
      width,
      ...style,
    };
  }

  /**
   */
  public render() {
    return (
      <>
        <IntersectionObserver onChange={this.handleIntersection}>
          <img
            alt=""
            role="presentation"
            src={this.imageSrc()}
            style={this.imageStyles()}
          />
        </IntersectionObserver>
      </>
    );
  }
}



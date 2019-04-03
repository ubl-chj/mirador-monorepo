import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import uuid from 'uuid/v4';

export default class AnnotationResource {
  private resource: any
  private _id: string
  public constructor(resource = {}) {
    this.resource = resource;
  }

  public get id() {
    this._id = this._id || this.resource['@id'] || uuid(); // eslint-disable-line no-underscore-dangle
    return this._id; // eslint-disable-line no-underscore-dangle
  }

  public get targetId() {
    const { on } = this.resource;

    switch (typeof on) {
      case 'string':
        return on.replace(/#?xywh=(.*)$/, '');
      case 'object':
        return on.full.replace(/#?xywh=(.*)$/, '');
      default:
        return null;
    }
  }

  /**
   * @return {[Array]}
   */
  public get motivations() {
    return flatten(compact(new Array(this.resource.motivation)));
  }

  /** */
  public get resources() {
    return flatten(compact(new Array(this.resource.resource)));
  }

  /** */
  public get chars() {
    return this.resources.map(r => r.chars).join(' ');
  }

  /** */
  public get fragmentSelector() {
    const { on } = this.resource;
    switch (typeof on) {
      case 'string':
        return on.match(/xywh=(.*)$/)[1].split(',').map(str => parseInt(str, 10));
      case 'object':
        return on.selector.value.match(/xywh=(.*)$/)[1].split(',').map(str => parseInt(str, 10));
      default:
        return null;
    }
  }
}

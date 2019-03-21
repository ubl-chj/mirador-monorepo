import AnnotationResource from './AnnotationResource';

interface IAnnotation {
  json: any
  target: any
}

/** */
export default class Annotation {

  json: any
  target: any

  /** */
  constructor(json, target) {
    this.json = json;
    this.target = target;
  }

  /** */
  get id() {
    return this.json['@id'];
  }

  /** */
  present() {
    return (this.resources
      && this.resources.length > 0);
  }

  /** */
  get resources() {
    if (!this.json || !this.json.resources) return [];
    return this.json.resources.map(resource => new AnnotationResource(resource));
  }
}

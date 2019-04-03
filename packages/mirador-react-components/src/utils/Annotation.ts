import AnnotationResource from './AnnotationResource';

export default class Annotation {
  private json: any
  private target: any

  public constructor(json, target) {
    this.json = json;
    this.target = target;
  }

  public get id() {
    return this.json['@id'];
  }

  public present() {
    return (this.resources
      && this.resources.length > 0);
  }

  public get resources() {
    if (!this.json || !this.json.resources) return [];
    return this.json.resources.map(resource => new AnnotationResource(resource));
  }
}

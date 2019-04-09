
interface ICanvasGroupings {
  canvases: []
  viewType: string
  _groupings: any

}
/**
 *
 */
export default class CanvasGroupings implements ICanvasGroupings {
  public canvases: []
  public viewType: string
  public _groupings: any

  public constructor(canvases, viewType = 'single') {
    this.canvases = canvases;
    this.viewType = viewType;
    this._groupings = null; // eslint-disable-line no-underscore-dangle
  }

  /**
   */
  public getCanvases(index) {
    switch (this.viewType) {
      case 'book':
        return this.groupings()[Math.ceil(index / 2)];
      default:
        return this.groupings()[index];
    }
  }

  /**
   * Groups a set of canvases based on the view type. Single, is just an array
   * of canvases, while book view creates pairs.
   */
  private groupings() {
    if (this._groupings) { // eslint-disable-line no-underscore-dangle
      return this._groupings; // eslint-disable-line no-underscore-dangle
    }
    if (this.viewType !== 'book') {
      return this.canvases.map(canvas => [canvas]);
    }
    const groupings = [];
    this.canvases.forEach((canvas, i) => {
      if (i === 0) {
        groupings.push([canvas]);
        return;
      }
      // Odd page
      if (i % 2 !== 0) {
        groupings.push([canvas]);
      } else {
        // Even page
        groupings[Math.ceil(i / 2)].push(canvas);
      }
    });
    this._groupings = groupings; // eslint-disable-line no-underscore-dangle
    return groupings;
  }
}

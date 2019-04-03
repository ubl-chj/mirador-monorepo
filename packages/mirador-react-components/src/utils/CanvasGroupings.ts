
export default class CanvasGroupings {
  private canvases: any
  private viewType: string
  private _groupings: any

  public constructor(canvases, viewType = 'single') {
    this.canvases = canvases;
    this.viewType = viewType;
    this._groupings = null; // eslint-disable-line no-underscore-dangle
  }

  /**
   */
  public getCanvases(index) {
    if (this.viewType === 'book') {
      return this.groupings()[Math.ceil(index / 2)];
    } else {
      return this.groupings()[index];
    }
  }

  /**
   * Groups a set of canvases based on the view type. Single, is just an array
   * of canvases, while book view creates pairs.
   */
  public groupings() {
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

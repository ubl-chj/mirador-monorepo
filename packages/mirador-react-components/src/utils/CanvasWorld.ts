/**
 * CanvasWorld
 */
export default class CanvasWorld {
  private canvases: any

  public constructor(canvases) {
    this.canvases = canvases;
  }

  /**
   * canvasToWorldCoordinates - calculates the canvas coordinates respective to
   * the world.
   */
  public canvasToWorldCoordinates(i) {
    const wholeBounds = this.worldBounds();
    const canvas = this.canvases[i];
    const aspectRatio = canvas.getWidth() / canvas.getHeight();
    const scaledWidth = Math.floor(wholeBounds[3] * aspectRatio);
    let x = 0;
    if (i === 1) {
      x = wholeBounds[2] - scaledWidth;
    }
    return [
      x,
      0,
      scaledWidth,
      wholeBounds[3],
    ];
  }

  /** */
  public indexOfTarget(canvasTarget) {
    return this.canvases.map(canvas => canvas.id).indexOf(canvasTarget);
  }

  /**
   * offsetByCanvas - calculates the offset for a given canvas target. Currently
   * assumes a horrizontal only layout.
   */
  public offsetByCanvas(canvasTarget) {
    const offset = { x: 0, y: 0 };
    let i;
    for (i = 0; i < this.indexOfTarget(canvasTarget); i += 1) {
      offset.x += this.canvases[i].getWidth();
    }
    return offset;
  }

  /**
   * worldBounds - calculates the "World" bounds. World in this case is canvases
   * lined up horizontally starting from left to right.
   */
  public worldBounds() {
    const heights = [];
    const dimensions = [];
    this.canvases.forEach((canvas) => {
      heights.push(canvas.getHeight());
      dimensions.push({
        height: canvas.getHeight(),
        width: canvas.getWidth(),
      });
    });
    const minHeight = Math.min(...heights);
    let scaledWidth = 0;
    dimensions.forEach((dim) => {
      const aspectRatio = dim.width / dim.height;
      scaledWidth += Math.floor(minHeight * aspectRatio);
    });
    return [
      0,
      0,
      scaledWidth,
      minHeight,
    ];
  }
}

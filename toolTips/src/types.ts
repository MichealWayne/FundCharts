/**
 * @types info
 */

export interface PointPosition {
  x: number;
  y: number;
}

export type PointsMap = PointPosition[];

export interface PointDrawParams {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  strokeColor: string;
  width: number;
  strokeWidth: number;
}

export interface WeappCanvasRenderingContext2D extends CanvasRenderingContext2D {
  draw: (...args: any) => void;
}

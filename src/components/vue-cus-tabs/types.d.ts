export interface TabControllerOptions<T> {
  selector?: string;
  initIndex?: number;
  onChange?: (i: number, d: any) => void;
  data: T[];
  rebound?: boolean;
  tabScroll?: boolean;
  duration?: number;
  scrollEndOffset?: number;
  indicatorOptions?: IndicatorOptions;
  onScrollEnd?: (i: number) => void;
  touchEndTransitionTime?: number;
}

/*export enum IndicatorType {
  block = 'block', underline = 'underline',
}*/

export interface IndicatorOptions {
  backgroundColor?: string;
  height?: string;
  width?: string;
}

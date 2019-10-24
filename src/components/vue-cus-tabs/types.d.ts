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
  activeColor?: string;
  inactiveColor?: string
}

export interface IndicatorOptions {
  backgroundColor?: string;
  height?: string;
  width?: string;
}

export * from './index';

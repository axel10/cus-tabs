import { TabItem } from '@/components/cus-tabs/types';export default class TabStore {  public states: IState = {    data: [],  };  public mutations = {    setData(states: IState, data: any) {      states.data = data;    },  };  constructor({ /*tabBar, tabContainer, */}: TabStoreOptions) {    // this.states.tabBar = tabBar;    // this.states.tabContainer = tabContainer;  }  public commit(action: string, ...args: any[]) {    const mutations = this.mutations as any;    if (mutations[action]) {      mutations[action].apply(this, [this.states].concat(args));    } else {      throw new Error(`Action not found: ${action}`);    }  }}interface IState {  data: TabItem[];  tabBar?: HTMLElement;  tabContainer?: HTMLElement;}interface TabStoreOptions {  // tabBar: HTMLElement,  // tabContainer: HTMLElement,  // currentIndex?: number;}
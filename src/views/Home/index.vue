<template>
  <div class="tab-wrap">
    <div class="tab-bar" id="__tab-bar">
      <div class="tab-bar-item" v-for="item in tabItems" :key="item.title">
        {{item.title}}
      </div>
      <div class="indicator"></div>
    </div>
    <div class="tab-container" id="__tab-container">
      <div class="tab-container-items-wrap">
        <div class="tab-container-item" v-for="item in tabItems">
          <div class="list" v-if="item.type==='list'">
            <ul>
              <li v-for="listItem in item.data">{{listItem.title}}</li>
            </ul>
          </div>
          <div class="video" v-if="item.type==='block'">
            <ul>
              <li>video</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { TabControllerOptions, TabItem } from '@/utils/types';
  import TabStore from '@/utils/tabStore';


  class TabController {

    activeColor = '#00BFFF';
    inactiveColor = '#000';

    touchStartPoint: number[] = [];
    touchCurrentPoint: number[] = [];
    distanceThreshold = 5;
    slideThreshold = 40;
    sliding = false;
    currentIndex = 0;

    distX = 0;
    distY = 0;
    distance = 0;

    touchBeginTime = 0;

    beginTransform = 0;

    onChange: (index: number, data: any) => void;

    indicator: HTMLDivElement;
    tabBar: HTMLDivElement;
    transition = `transform .5s`;
    containerItemsWrap: HTMLDivElement;
    tabContainer: HTMLDivElement;
    data: TabItem[];

    changeTab: (targetIndex: number) => void = targetIndex => {
      const { tabContainer, indicator, containerItemsWrap, data } = this;
      if (targetIndex === this.currentIndex) {
        return;
      }
      if (targetIndex >= data.length) {
        console.warn('target index out of range');
        return;
      }
      const tabContainerItemWidth = tabContainer.offsetWidth;
      const tabBarItems = Array.from(this.tabBar.children) as HTMLDivElement[];
      const clickedTab = tabBarItems[targetIndex];
      tabBarItems.forEach(o => {
        o.style.color = this.inactiveColor;
      });
      this.currentIndex = targetIndex;
      clickedTab.style.color = this.activeColor;
      // 移动到相应tab
      indicator.style.transform = `translateX(${clickedTab.offsetLeft}px)`;
      indicator.style.width = `${getComputedStyle(clickedTab).width}px`;
      containerItemsWrap.style.transition = this.transition;
      setTimeout(() => {
        containerItemsWrap.style.transform = `translateX(${-tabContainerItemWidth * targetIndex}px)`;
      });
      this.onChange(this.currentIndex, data[this.currentIndex]);
    };

    getTransformX(transform: string): number {
      if (!transform || transform === 'none') {
        return 0;
      }
      console.log(transform);
      if (transform.startsWith('translateX')) {
        return parseInt(transform.match(/translateX\(([\-0-9\.]+)px\)/)![1]);
      }
      if (transform.startsWith('matrix')) {
        return parseInt(transform.match(/matrix\(.*? ([\-0-9\.]+), [0-9\.]+\)/)![1]);
      }
      console.warn('unknown transform');
      return 0;
    }


    constructor(options?: TabControllerOptions) {


      const {
        initIndex = 0, tabBarId = '__tab-bar', tabContainerId = '__tab-container', data = [], onChange = () => {
        }
      } = options ? options : {};
      const tabBar = document.getElementById(tabBarId)! as HTMLDivElement;
      const tabContainer = document.getElementById(tabContainerId) as HTMLDivElement;
      if (!tabBar) {
        throw new Error('tab bar id error');
      }
      if (!tabContainer) {
        throw new Error('tab container id error');
      }

      this.tabBar = tabBar;
      this.currentIndex = initIndex;

      this.tabContainer = tabContainer;
      this.onChange = onChange;
      this.data = data;

      const containerItemsWrap = tabContainer.querySelector<HTMLDivElement>('.tab-container-items-wrap')!;
      this.containerItemsWrap = containerItemsWrap;
      const tabContainerItems = Array.from(containerItemsWrap.children) as HTMLDivElement[];
      const tabContainerItemWidth = tabContainer.offsetWidth;
      this.indicator = tabBar.querySelector<HTMLDivElement>('.indicator')!;
      this.store = new TabStore({ /*tabBar, tabContainer: containerWrap*/ });
      this.store.commit('setData', data);
      const tabBarItems = Array.from(tabBar.children) as HTMLDivElement[];
      this.indicator.style.width = tabBarItems[0].offsetWidth + 'px';
      containerItemsWrap.style.transform = `translateX(${initIndex * tabContainerItemWidth}px)`;


      tabBarItems.forEach(item => {
        item.addEventListener('click', (e) => {
          const clickedTab = e.currentTarget as HTMLDivElement;
          const targetIndex = tabBarItems.findIndex(o => o === clickedTab);
          this.changeTab(targetIndex);
        });
      });

      tabContainerItems.forEach(container => {
        container.style.width = tabContainerItemWidth + 'px';
      });

      containerItemsWrap.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        this.touchStartPoint = [touch.clientX, touch.clientY];
        this.touchBeginTime = Date.now();
        containerItemsWrap.style.transition = 'none';
        containerItemsWrap.style.transform = getComputedStyle(containerItemsWrap).transform;

        this.beginTransform = this.getTransformX(containerItemsWrap.style.transform!);
      });


      containerItemsWrap.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        this.touchCurrentPoint = [touch.clientX, touch.clientY];
        this.distX = this.touchCurrentPoint[0] - this.touchStartPoint[0];
        this.distY = this.touchCurrentPoint[1] - this.touchStartPoint[1];
        const { distX, distY } = this;
        this.distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
        const distance = this.distance;

        if (distance > this.distanceThreshold && Math.abs(distX) > Math.abs(distY)) {
          this.sliding = true;
          // const currentTransform = this.getTransformX(containerItemsWrap.style.transform!);
          containerItemsWrap.style.transform = `translateX(${this.beginTransform + distX}px)`;
        }
      });

      containerItemsWrap.addEventListener('touchend', () => {

        const reset = () => {
          containerItemsWrap.style.transition = `transform .5s`;
          containerItemsWrap.style.transform = `translateX(${-this.currentIndex * tabContainerItemWidth}px)`;
        };

        if (
          (this.currentIndex === 0 && this.distX > 0) ||
          (this.currentIndex === data.length - 1 && this.distX < 0)
        ) {
          // 归位
          reset();
          return;
        }

        const duration = Date.now() - this.touchBeginTime;
        if (duration < 500) {
          if (this.distX > this.slideThreshold) {
            this.changeTab(this.currentIndex - 1);
            return;
          }
          if (-this.distX > this.slideThreshold) {
            this.changeTab(this.currentIndex + 1);
            return;
          }
        } else {
          if (this.distX > tabContainerItemWidth / 2) {
            this.changeTab(this.currentIndex - 1);
            return;
          }
          if (-this.distX > tabContainerItemWidth / 2) {
            this.changeTab(this.currentIndex + 1);
            return;
          }
        }

        reset();

      });

      containerItemsWrap.style.width = tabContainerItems.length * tabContainerItemWidth + 'px';
    }

    store: TabStore;
  }

  @Component({
    components: {},
  })
  export default class Home extends Vue {
    public tabItems = [
      { 'title': '新闻', type: 'list', data: [{ img: '', title: 'list item title' }] },
      { 'title': '视频', type: 'block', data: [{ video: '', title: 'list item title' }] },
    ];

    mounted() {
      const tabController = new TabController({ data: this.tabItems });

    }

    testArr = [{ id: '1', data: [{ title: 'title' }] }];
  }
</script>

<style lang="less" scoped>
  @import "style";
</style>

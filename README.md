<h2>
    Vue-Cus-Tabs
</h2>

<p>Vue-Cus-Tabs is a customizable Vue Tab component. Just depend on Vue.</p>

<p>Vue-Cus-Tabs是一个能够自定义的Vue Tab组件。仅仅依赖Vue。</p>

### Introduction

Vue-Cus-Tabs implements most of the common tab requirements, and you only need a simple configuration to render a tab on the page. Vue-Cus-Tabs has no dependencies other than Vue.   
   
Vue-Cus-Tabs实现了大部分常见的tab需求，你只需要简单配置即可在页面上呈现一个tab。Vue-Cus-Tabs除了Vue以外没有任何依赖项。   

demo:<a href="https://vue-cus-tabs-axel10.now.sh" target="_blank">https://vue-cus-tabs-axel10.now.sh</a>

<img src="http://tva1.sinaimg.cn/large/007X8olVly1g754skmf37g308c0c87wj.gif"/>

## Example
install:
```
npm i vue-cus-tabs -S
```
template:
```vue
    <CusTabWrap>
      <template v-slot:tabBar>
        <CusTabBar :style="{'height':'50px'}">
          <CusTabItem v-for="item in tabItems" :key="item.title">
            {{item.title}}
          </CusTabItem>
        </CusTabBar>
      </template>

      <template v-slot:tabContainer>
        <CusTabContainer>
          <CusTabContainerItem v-for="item in tabItems">
            <ul>
              <li v-for="data in item.data">
                {{data.title}}
              </li>
            </ul>
          </CusTabContainerItem>
        </CusTabContainer>
      </template>
    </CusTabWrap>
```
script:
```typescript
  import { TabController,CusTabs } from 'vue-cus-tabs';
  import Vue from 'vue'
  import 'vue-cus-tabs/style/index.css'
 
  Vue.use(CusTabs);

  export default class Test extends Vue{
        public tabItems = [
          { title: '新闻', type: 'list', data: [{ img: '', title: 'list item title' }] },
          { title: '视频', type: 'block', data: [{ video: '', title: 'list item title' }] },
          { title: '视频1', type: 'block', data: [{ video: '', title: 'list item title' }] },
        ];
    public tabController?: TabController;
    public mounted() {
      this.tabController = new TabController({ data: this.tabItems, tabScroll: true, initIndex: 1 });
    }
  }
```

## Configuration

Constructor:

| name | type | detail | required | default value |
| --- | --- | --- | --- | --- |
| data | array | 用于渲染的数据 | true |  | 
| selector | string | 用于选择CusTabWrap组件 | false | #__cus-tabs | 
| activeColor | string | 指定已激活tab的文字颜色 | false |  | 
| inactiveColor | string | 指定未激活tab的文字颜色 | false |  | 
| initIndex | number | 用于指定初始索引 | false | 0 | 
| rebound | boolean | 指定tab处于左右边缘时滑动是否回弹 | false | false | 
| tabScroll | boolean | 指定tab是否可滚动 | false | false | 
| duration | number | 点击tab | false | #__cus-tabs | 
| selector | string | 用于选择CusTabWrap组件 | false | #__cus-tabs | 
| scrollEndOffset | number | 触发onScrollEnd事件的偏移 | false | 0 | 
| indicatorOptions | object | 用于配置指示器的对象 | false |  | 
| onScrollEnd | (index: number) => void | 容器内容滚动到底部时的回调 | false |  | 
| onChange | (index: number, data: any) => void | 指定tab切换后的回调 | false |  | 

indicatorOptions:

| name | type | detail | required | default value |
| --- | --- | --- | --- | --- |
| backgroundColor | string | 指定指示器的颜色 | false | #409eff | 
| height | string | 指定指示器的颜色 | false | type | 
| width | string | 指定指示器的宽度，值可为'cover','content'或者百分比。如90%。<br/>为cover时宽度为整个tab项的宽度，<br/>为content时宽度为tab项内部内容的宽度。<br/>为百分比时宽度为内部内容宽度的百分比 | false | 2px | 

instance method:   
实例方法：   

| name | params | detail |
| --- | --- | --- |
| push | tabItem:object | 添加tab。参数为结构与data数组内元素相同的数据对象 |
| remove | i:number | 移除指定序号的tab |
| changeTab | targetIndex: number, isAnimate?: boolean, time?: number | 切换到指定序号的tab。可以选择是否有动画以及动画时间。 |

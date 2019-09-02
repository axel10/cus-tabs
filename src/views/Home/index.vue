<template>
  <CusTabWrap>
    <template v-slot:tabBar>
      <CusTabBar :style="{'height':'50px'}" :controller="tabController"></CusTabBar>
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
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TabController from '@/components/cus-tabs/Controller';


  @Component({
    components: {},
  })
  export default class Home extends Vue {
    public tabItems: any[] = [
      { 'title': '新闻', type: 'list', data: [{ img: '', title: 'list item title' }] },
      { 'title': '视频', type: 'block', data: [{ video: '', title: 'list item title' }] },
      { 'title': '视频1', type: 'block', data: [{ video: '', title: 'list item title' }] },
      { 'title': '视频2', type: 'block', data: [{ video: '', title: 'list item title' }] },
      { 'title': '视频3', type: 'block', data: [{ video: '', title: 'list item title' }] },
      { 'title': '视频4', type: 'block', data: [{ video: '', title: 'list item title' }] },
      { 'title': '视频5', type: 'block', data: [{ video: '', title: 'list item title' }] },
      { 'title': '视频6', type: 'block', data: [{ video: '', title: 'list item title' }] },
      { 'title': '视频7', type: 'block', data: [{ video: '', title: 'list item title' }] },
      { 'title': '视频8', type: 'block', data: [{ video: '', title: 'list item title' }] },
      { 'title': '视频9', type: 'block', data: [{ video: '', title: 'list item title' }] },
      /*      { 'title': '视频1', type: 'block', data: [{ video: '', title: 'list item title' }] },
            { 'title': '视频2', type: 'block', data: [{ video: '', title: 'list item title' }] },
            { 'title': '视频3', type: 'block', data: [{ video: '', title: 'list item title' }] },
            { 'title': '视频4', type: 'block', data: [{ video: '', title: 'list item title' }] },
            { 'title': '视频5', type: 'block', data: [{ video: '', title: 'list item title' }] },
            { 'title': '视频6', type: 'block', data: [{ video: '', title: 'list item title' }] },*/
    ];

    mounted() {
      this.tabController = new TabController({ data: this.tabItems, tabScroll: true, initIndex: 1 });

      setTimeout(() => {
        // this.tabItems.push({
        //   'title': `视频 ${Date.now()}`,
        //   type: 'block', data: [{ video: '', title: 'list item title' }]
        // });

/*        this.tabController!.push({
          'title': `视频 ${Date.now()}`,
          type: 'block', data: [{ video: '', title: 'list item title' }]
        });

        this.tabItems[0].data.push({ img: '', title: '12312312' });*/

      }, 1000);
    }

    data() {
      return {
        tabController: null
      };
    }

    tabController?: TabController;
    testArr = [{ id: '1', data: [{ title: 'title' }] }];
  }
</script>

<style lang="less" scoped>
  @import "../../components/cus-tabs/style";
</style>

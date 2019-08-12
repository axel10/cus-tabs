<template>
  <CusTabWrap>
    <template v-slot:tabBar>
      <CusTabBar :controller="tabController"></CusTabBar>
    </template>

    <template v-slot:tabContainer>
      <CusTabContainer :controller="tabController"></CusTabContainer>
    </template>
  </CusTabWrap>
  <!--  <div class="tab-wrap">
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
    </div>-->
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TabController from '@/components/cus-tabs/Controller';


  @Component({
    components: {},
  })
  export default class Home extends Vue {
    public tabItems = [
      { 'title': '新闻', type: 'list', data: [{ img: '', title: 'list item title' }] },
      { 'title': '视频', type: 'block', data: [{ video: '', title: 'list item title' }] },
    ];

    mounted() {
      this.tabController = new TabController({ data: this.tabItems });
    }

    data(){
      return {
        tabController:null
      }
    }

    tabController?: TabController;
    testArr = [{ id: '1', data: [{ title: 'title' }] }];
  }
</script>

<style lang="less" scoped>
  @import "../../components/cus-tabs/style";
</style>

<template>
  <div class="wrap">
    <h1>Vue Tabs</h1>
    <ul>
      <li>
        <router-link to="/news">news</router-link>
      </li>
      <li>
        <router-link to="/multi-instance">multi-instance</router-link>
      </li>
      <li>
        <router-link to="/dynamic">dynamic</router-link>
      </li>
      <li>
        <router-link to="/scroll">scroll</router-link>
      </li>
      <li>
        <router-link to="/custom">custom</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class Home extends Vue {

  }
</script>

<style lang="less" scoped>
  .wrap{
    padding: 1rem;
  }
  a{
    color: #42b983;
  }
</style>

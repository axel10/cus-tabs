<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {

}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

  html,body,#app{
    margin: 0;
    width: 100%;
    height: 100%;
  }
  #app{

  }
</style>

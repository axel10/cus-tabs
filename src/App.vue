<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

#app {

}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

  html,body,#app{
    width: 100%;
    height: 100%;
    margin: 0;
  }
  #app{

  }
</style>

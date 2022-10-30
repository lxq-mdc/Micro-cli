<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/micro-cli.svg" style="height: 6em; padding: 1.5em; will-change: filter;" />
    <img alt="Vue logo" src="../assets/vue.svg" style="height: 6em; padding: 1.5em; will-change: filter;" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>

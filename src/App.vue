<template>
  <div id="app">
    <voiceWx/>
  </div>
</template>

<script>
import '../static/js/common'
import voiceWx from './components/voiceWx'

export default {
  name: 'app',
  components: {
    voiceWx
  }
}
</script>

<style lang="scss">
 @import "../static/sass/common";
  html,body{
    background-color: #6dbcb8;
  }
</style>

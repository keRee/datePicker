<template>
  <div class="hello">
    <s-head></s-head>
    <h1></h1>
    
  </div>
</template>
<script>
import sHead from 'components/Head'

export default {
  name: 'hello',
  components: {sHead},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>

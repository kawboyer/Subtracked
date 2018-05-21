<template>
  <div id="app">
    <Navbar></Navbar>

    <router-view/>
     <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
export default {
  name: 'App',
  components: {
    Footer,
    Navbar,
  }
}
</script>

<style>
 #app {
  background-color:#F7F9FB;
  font-family: 'Noto Sans', sans-serif;
 }

</style>

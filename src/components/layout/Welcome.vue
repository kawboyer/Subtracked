<template>
  <div class="mainpage">
    <div class="background" v-bind:style="{ 'background-image' : 'url(' + image + ')' }">
      <div class="container">
        <div class="text-content">
          <!-- <h6>Overwhelmed by subscriptions and free trials? SubTracked keeps track of all your online subscriptions in one convenient app. Monitor your monthly charges and get notified when your free trials expires. Save time. Save money.</h6> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data: () => {
    return {
      image: require("../../assets/more_time5.jpg"),
    }
  }
}
</script>

<style>
.background {
  min-height: 100%;
  min-width: 1024px;
  width:100%;
  /* background-color: white; */
  background-size: 110%;
  /* background-position: 110px; */
  background-repeat: no-repeat;
  height: auto;
  padding: 180px;
  opacity: 0.8;
}
h6 {
  color: #31708e;
  font: bolder;
}
.mainpage {
  top: 100%;
  bottom: 100%;
}
</style>
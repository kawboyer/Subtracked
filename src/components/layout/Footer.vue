<template>
<footer class="page-footer">
  <div class="container">
    <div class="row">
      <div class="col l6 s12">
        <h5 class="white-text">About SubTracked</h5>
        <p class="footer-text grey-text text-lighten-4">Overwhelmed by subscriptions and free trials? SubTracked keeps track of all your online subscriptions in one convenient app. We monitor your monthly charges and notify you when your free trials are about to expire. Save time. Save money.</p>
      </div>
      <div class="col l4 offset-l2 s12">
        <h5 class="footer-github white-text">Developers Information</h5>
        <ul class="footer-github">

          <li> Erik Augenzucker 
            <a class="footer-github grey-text text-lighten-3" target= "_blank"  alt="Erik's Github" href="https://github.com/Eaug2"><img class="link-icon" src="../../assets/social-github.png">  </a>
            <a class="footer-github grey-text text-lighten-3" target= "_blank" alt="Erik's Linkedin" href="https://www.linkedin.com/in/erik-augenzucker/"><img class="link-icon" src="../../assets/social-linkedin.png">  </a>
          </li>

          <li> Klara Boyer 
            <a class="footer-github grey-text text-lighten-3" target= "_blank" alt="Klara's Github" href="https://github.com/kawboyer"><img class="link-icon" src="../../assets/social-github.png"> </a>
            <a class="footer-github grey-text text-lighten-3" target= "_blank" alt="Klara's Linkedin" href="https://www.linkedin.com/in/klaraboyer/"><img class="link-icon" src="../../assets/social-linkedin.png"> </a>
          </li>
          
          <li> Josh Dulin 
            <a class="footer-github grey-text text-lighten-3" target= "_blank" alt="Josh's Github" href="https://github.com/jzdulin"><img class="link-icon" src="../../assets/social-github.png"> </a>
            <a class="footer-github grey-text text-lighten-3" target= "_blank" alt="Josh's Linkedin" href="https://www.linkedin.com/in/joshuadulin/"><img class="link-icon" src="../../assets/social-linkedin.png">  </a>
          </li>
          
          <li> Taddes Korris 
            <a class="footer-github grey-text text-lighten-3" target= "_blank" alt="Taddes's Github" href="https://github.com/taddes"><img class="link-icon" src="../../assets/social-github.png">  </a>
            <a class="footer-github grey-text text-lighten-3" target= "_blank" alt="Taddes's Linkedin" href="https://www.linkedin.com/in/taddes/"><img class="link-icon" src="../../assets/social-linkedin.png"> </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
    <div class="container">
      © 2018 SubTracked
        <!-- <a class="grey-text text-lighten-4 right" href="#!">More Links</a> -->
    </div>
  </div>
</footer>
</template>

<script>
import axios from "axios";
const url = "/Github";
export default {
  name: "Footer",
  data() {
    return {
      results: []
    };
  },
  mounted() {
    // axios.get(url).then(response => {
    //   this.results = response.data;
    //   console.log(response.data)
    // });
  }
};
</script>

<style>
.footer-text {
  text-align: left;
}

.footer-github {
  text-align: right;
}

.page-footer {
  background-color: #31708e;
  bottom: 0px;
  color: #f7f9fb;
  font-family: "Noto Sans", sans-serif;
}
.link-icon {
  height: 20px;
  width: 20px;
}
</style>

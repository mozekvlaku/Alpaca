<template>
  
  <div class="authenticated">
  </div>
</template>

<script>

export default {
  name: 'AuthenticatedEnvironment',
  components: {
    
}
}
</script>

<style>
.authenticated {
  background-image: url(https://vespotok.com/dev/mother//usr/share/backgrounds/default.jpg);
  width: 100%;
  height: 100vh;
  position: fixed;
  background-position: bottom;
  background-color: black !important;
  animation-delay: .5s;
}

@keyframes scale-in-center {
  0% {
    transform: scale(.9);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

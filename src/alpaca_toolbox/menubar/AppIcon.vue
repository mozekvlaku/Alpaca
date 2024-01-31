<template>
  <div>
    <div class="MenuIcon">
      <b-dropdown aria-role="list">
              <template #trigger>
                  <div class="MenuItem_App">{{ app_name }}</div>
              </template>


              <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
          </b-dropdown>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AppIcon',
  components: {
   
  },
  props: {
    app_name: String
  }
}
</script>

<style scoped>
.MenuItem_App
{
 height: 32px;
 background-position: center;
 background-repeat: no-repeat;
 margin-top:6px;
 font-weight: bold;
 cursor: pointer;
 font-size: 0.90rem;
}

</style>

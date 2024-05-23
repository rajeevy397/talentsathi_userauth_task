<!-- App.vue -->

<template>
  <!-- Main container for the application layout -->
  <div class="container">
    <!-- Row for aligning the content -->
    <div class="row">
      <!-- Column that spans the full width of the container -->
      <div class="col-mod-12">
        <!-- Router view component to display matched component for the route -->
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Export the default component definition
export default {
  // Name of the component
  name: 'App',
  // Register any local components if needed
  components: {},
}
</script>

<template>
  <v-app dark>
    <v-app-bar flat dense>
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    title: 'Surfingkeys Support',
  }),
}
</script>

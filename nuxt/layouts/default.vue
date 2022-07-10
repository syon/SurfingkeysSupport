<template>
  <v-app dark>
    <v-app-bar flat dense>
      <v-toolbar-title class="mx-8" v-text="title" />
      <v-spacer />
      <div class="d-flex align-center mx-8" style="line-height: 1">
        <github-button
          href="https://github.com/syon/SurfingkeysSupport"
          aria-label="View on GitHub"
          data-size="large"
          class="mx-2"
          >View on GitHub</github-button
        >
        <github-button
          href="https://github.com/syon/SurfingkeysSupport"
          data-icon="octicon-star"
          data-show-count="true"
          aria-label="Star syon/SurfingkeysSupport on GitHub"
          data-size="large"
          class="mx-2"
          >Star</github-button
        >
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import GithubButton from 'vue-github-button'

export default {
  components: {
    GithubButton,
  },
  data: () => ({
    title: 'Surfingkeys Support',
  }),
}
</script>

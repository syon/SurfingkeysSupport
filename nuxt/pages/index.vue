<template>
  <v-container class="pb-16">
    <div class="d-flex justify-center">
      <v-radio-group v-model="radioCustom" row class="mx-4">
        <v-radio label="old" value="old"></v-radio>
        <v-radio label="new" value="new"></v-radio>
      </v-radio-group>
      <v-radio-group v-model="radioTrans" row class="mx-4">
        <v-radio label="en" value="en"></v-radio>
        <v-radio label="ja" value="ja"></v-radio>
      </v-radio-group>
    </div>

    <v-data-table :headers="headers" :items="kaymapList" :items-per-page="-1">
      <template #item.stroke="{ item }">
        <code class="keystroke">{{ item.stroke }}</code>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import keymap from '@/data/out/keymap.json'

export default {
  data: () => ({
    isCustom: true,
    isTrans: true,
  }),

  computed: {
    radioCustom: {
      get() {
        return this.isCustom ? 'new' : 'old'
      },
      set(v) {
        this.isCustom = v === 'new'
      },
    },
    radioTrans: {
      get() {
        return this.isTrans ? 'ja' : 'en'
      },
      set(v) {
        this.isTrans = v === 'ja'
      },
    },
    kaymapList() {
      return keymap.map((x) => ({
        category: x.category,
        mode: x.mode,
        stroke: this.isCustom ? x['new-stroke'] : x['old-stroke'],
        desc: this.isTrans ? x['desc-ja'] : x['desc-en'],
      }))
    },
    headers() {
      return [
        { text: 'カテゴリー', value: 'category', width: 200 },
        { text: 'モード', value: 'mode', width: 90 },
        { text: 'キーストローク', value: 'stroke', width: 180 },
        { text: '説明', value: 'desc' },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
#__nuxt .keystroke {
  font-size: 16px;
}
</style>

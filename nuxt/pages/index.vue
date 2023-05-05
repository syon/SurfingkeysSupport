<template>
  <v-container class="pb-16">
    <div class="d-flex justify-space-between">
      <div class="d-flex">
        <div class="mt-5 mx-8" style="width: 500px">
          <p class="v-label theme--light text-body-2">
            Advanced mode カスタムスクリプト
          </p>
          <v-text-field
            v-model="gistUrl"
            prepend-icon="mdi-github"
            label="Gist raw file URL"
            hide-details
            dense
            outlined
            readonly
            append-icon="mdi-content-copy"
            @click:append="handleGistUrlCopy"
          />
          <v-snackbar v-model="snackbar" top timeout="3000">
            コピーしました。
          </v-snackbar>
        </div>
      </div>
      <div class="d-flex">
        <v-radio-group v-model="radioCustom" class="mx-8">
          <template #label><div>キーマップ</div></template>
          <v-radio label="カスタム" value="new"></v-radio>
          <v-radio label="デフォルト" value="old"></v-radio>
        </v-radio-group>
        <v-radio-group v-model="radioTrans" class="mx-8">
          <template #label><div>説明</div></template>
          <v-radio label="日本語" value="ja"></v-radio>
          <v-radio label="English" value="en"></v-radio>
        </v-radio-group>
      </div>
    </div>

    <v-data-table :headers="headers" :items="kaymapList" :items-per-page="-1">
      <template #item.stroke="{ item }">
        <code v-if="item.stroke" class="keystroke">{{ item.stroke }}</code>
        <span v-if="item.stroke2 && isCustom">
          <span style="font-size: 10px">または</span>
          <code class="keystroke">{{ item.stroke2 }}</code>
        </span>
        <span v-if="!item.stroke && isCustom">
          <span class="grey--text text--lighten-2">（未使用）</span>
        </span>
      </template>
      <template #item.desc="{ item }">
        <span v-html="item.desc" />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import MarkdownIt from 'markdown-it'
import keymap from '@/data/out/keymap.json'

const md = new MarkdownIt()

const gistUrl =
  'https://gist.githubusercontent.com/syon/3baa7ae49220c26d1753c77fe531501c/raw/4e63028ecd1701b01847de91c94bd420993217a7/SurfingkeysConfig.js'

export default {
  data: () => ({
    gistUrl,
    snackbar: false,
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
        stroke2: x['new-stroke-add'],
        desc: this.isTrans ? md.renderInline(x['desc-ja']) : x['desc-en'],
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

  methods: {
    handleGistUrlCopy() {
      navigator.clipboard.writeText(gistUrl).then((e) => {
        this.snackbar = true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#__nuxt .keystroke {
  font-size: 16px;
}
</style>

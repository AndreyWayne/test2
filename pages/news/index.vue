<template>
  <div>
    <div class="d-flex justify-center">
      <nuxt-link to='/'>
        <v-btn color="primary">
          Вернуться к поиску
        </v-btn>
      </nuxt-link>
    </div>

    <div class="news-list">
      <div
        v-for="(item, i) in data.items"
        :key="item.id"
        class="news-list__item"
      >
        <News :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ $axios, route, store }) {
    let {
      response
    } = await $axios.$get(`${ process.env.VK_API_URL}newsfeed.search?q=${ encodeURIComponent(route.query.search_news) }&extended=1&access_token=${ process.env.VK_TOKEN }&v=${ process.env.VK_V }&count=100`)

    store.commit('SET_DATA', response)
    store.dispatch('DATA_TRANSFORM')
  },
  computed: {
    ...mapState([
      'data'
    ])
  }
}
</script>

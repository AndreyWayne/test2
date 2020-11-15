<template>
  <v-text-field
    label="Поиск по новостям"
    hide-details="auto"
    v-model="search"
    @keyup.enter="setSearch"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    setSearch() {
      window.location = `/news?search_news=${ this.search }`
    }
  }
}
</script>

<style lang="css">
</style>

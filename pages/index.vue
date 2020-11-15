<template>
  <div class="search">
    <div class="search__container">
      <div class="search__input">
        <Search />
      </div>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss">
.search {
  width: 100%;

  &__container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__input {
    transform: translateY(-100%);
    width: 100%;
  }
}
</style>

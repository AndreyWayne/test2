<template>
  <div v-if='hideCard' ckass="card">
    <v-card
      class="mx-auto news"
      max-width="550"
    >
      <a :href="link" class="card__link">
        <v-card-title class="pb-25 card__title" >
          {{ data.source }}
        </v-card-title>
      </a>

      <v-card-subtitle class="pt-0">
        {{ date }}
      </v-card-subtitle>

      <v-card-text class="text--primary" v-if='data.text'>
        <div v-html="text"></div>
      </v-card-text>

      <div v-if="hideImages">
        <v-carousel
          :hide-delimiters="hideSlideConfig"
          :show-arrows="!hideSlideConfig"
          v-model="currentSlide"
        >
          <v-carousel-item
            v-for="(item,i) in images"
            :key="i"
            :src="item.src"
            @click="openGallery(i)"
          ></v-carousel-item>
        </v-carousel>
      </div>

      <v-card-text>
        <v-icon class="mr-1">
           mdi-heart
         </v-icon>
         <span class="subheading mr-2">{{ data.likes.count }}</span>
      </v-card-text>
    </v-card>

    <client-only v-if="hideImages">
      <light-box
        :media="lightBoxImages"
        :showImage="currentSlide"
        :showLightBox="showLightBox"
        @onImageChanged='setImageChanged'
        ref="lightbox"
      />
    </client-only>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object
    },
    detailView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentSlide: 0,
      showLightBox: false
    }
  },
  computed: {
    date() {
      return new Date(this.data.date * 1000).toLocaleString('ru')
    },
    text() {
      return this.data.text.length > 280 && !this.detailView
        ? `${ this.data.text.slice(0, 280) }...`
        : this.data.text
    },
    images() {
      return this.data.attachments && this.data.attachments.length
        ? this.data.attachments.filter(item => {
          return item.type === 'photo'
        }).map(item => {
          return { src: item.photo.sizes[item.photo.sizes.length - 1].url }
        })
        : []
    },
    lightBoxImages() {
      return this.images.map(item => {
        return {
          thumb: item.src,
          src: item.src,
          caption: 'photo',
          srcset: item.src
        }
      })
    },
    hideImages() {
      return this.images.length
    },
    hideCard() {
      return (this.hideImages || this.data.text.length) && this.data.post_type === 'post' && this.data.owner_id < 0
    },
    hideSlideConfig() {
      return !(this.images.length > 1)
    },
    link() {
      return this.data.post_id
        ? `/news/${ this.data.owner_id }_${ this.data.post_id }`
        : `/news/${ this.data.owner_id }_${ this.data.id }`
    }
  },
  methods: {
    openGallery(index) {
      this.$refs.lightbox.showImage(index)
    },
    setImageChanged(index) {
      this.currentSlide = index
    }
  }
}
</script>

<style lang="scss">
.card {
  &__link {
    text-decoration: none;
  }

  &__title {
    color: white;
  }
}
</style>

<template>
  <v-container fluid>
    <!-- Hero -->
    <v-row
      class="block-section hero-section align-center text-center bg-img"
      :style="`background-image: url('${bgHero}')`"
    >
      <v-col class="hero-section__content">
        <div class="carousel-wrapper">
          <v-carousel v-model="model" :show-arrows="false">
            <v-carousel-item v-for="(color, i) in colors" :key="color">
              <v-sheet height="100%" tile color="transparent">
                <v-row class="fill-height transparent" align="center">
                  <v-col class="text-left">
                    <div class="slide-content white--text">
                      <h1>Slide 1</h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod aliqua.
                      </p>
                      <v-btn
                        to="/"
                        elevation="0"
                        rounded
                        class="text-capitalize px-16 primary--text"
                      >
                        Unirse
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col>
                    <div
                      class="carousel-item bg-img"
                      :style="`background-image: url('${placeHolderSlide}')`"
                    ></div>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-col>
    </v-row>
    <!-- Videos -->
    <v-row class="block-section align-center text-center">
      <v-col>
        <h1>Videos</h1>
      </v-col>
    </v-row>
    <!-- Members -->
    <v-row class="block-section align-center text-center">
      <v-col>
        <h1>Members</h1>
      </v-col>
    </v-row>
    <!-- Testimonials -->
    <v-row class="block-section align-center text-center">
      <v-col>
        <h1>Testimonials</h1>
      </v-col>
    </v-row>
    <!-- FAQ -->
    <v-row class="block-section align-center text-center">
      <v-col>
        <h1>Faq</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import resources from '@/mixins/resources'
export default {
  mixins: [resources],
  data() {
    return {
      model: 0,
      colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;300;600&display=swap');
$primary: #f42f43;
$accent: #bada55;
$secondary: #ff273e;
$font_one: #321215;

* {
  font-family: 'Raleway', sans-serif !important;
}
.block-section {
  min-height: 100vh;
}
.bg-img {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.hero-section {
  position: relative;

  &::after {
    content: '';
    background-color: $primary;
    opacity: 0.7;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &__content {
    position: relative;
    z-index: 200;
  }
  .v-carousel {
    &__controls {
      background-color: transparent;
      transform: translateY(-50%);
      right: 0 !important;
      width: auto;
      &__item {
        background-color: white !important;
        width: 50px;
        height: 16px;
        border-radius: 100px;
        span {
          display: none;
        }
      }
    }
  }
  .carousel-item {
    border-radius: 20px;
    height: 350px;
    position: relative;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(
        74.29deg,
        #fe297c 0%,
        rgba(244, 47, 67, 0) 30.13%,
        rgba(244, 47, 67, 0) 100%
      );
      height: 100%;
      width: 100%;
    }
  }
  .slide-content {
    max-width: 420px;
  }
}
.carousel-wrapper {
  max-width: 1440px;
  // max-width: 1158px;
  margin: 0 auto;
}
</style>

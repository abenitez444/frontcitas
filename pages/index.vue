<template>
  <v-container fluid class="landing-page">
    <!-- Hero -->
    <v-row
      class="block-section hero-section align-center text-center bg-img"
      :style="`background-image: url('${bgHero}')`"
    >
      <v-col class="hero-section__content">
        <div class="carousel-wrapper">
          <v-carousel
            v-model="model"
            :show-arrows="false"
            continuous
            cycle
            interval="3000"
          >
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <v-sheet height="100%" tile color="transparent">
                <v-row class="fill-height transparent" align="center">
                  <v-col class="text-left">
                    <div class="slide-content white--text">
                      <h1>
                        {{ slide.title }}
                      </h1>
                      <p>
                        {{ slide.description }}
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
                    <!-- :style="`background-image: url('${placeHolderSlide}')`" -->
                    <div
                      class="carousel-item bg-img"
                      :style="`background-image: url('${slide.image}')`"
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
    <v-row class="block-section video-section align-center">
      <img :src="asset_wave" class="bg-wave" alt="" />
      <v-col class="video-section__content">
        <carousel ref="carousel" :per-page="1">
          <!-- one -->
          <slide v-for="(video, index) in videos" :key="index">
            <div class="slide-wrap">
              <div class="avatar-box">
                <v-sheet color="transparent">
                  <v-row>
                    <v-col
                      cols="7"
                      class="d-flex justify-center align-center wrapper-video"
                    >
                      <client-only placeholder="Loading...">
                        <youtube
                          :player-vars="{ autoplay: 0 }"
                          :video-id="video.link"
                          :player-height="439"
                        />
                      </client-only>
                    </v-col>
                    <v-col cols="" class="d-flex flex-column justify-center">
                      <h2 class="header-2 primary--text mb-7">
                        {{ video.title }}
                      </h2>
                      <p class="text-1">
                        {{ video.description }}
                      </p>
                    </v-col>
                  </v-row>
                </v-sheet>
              </div>
            </div>
          </slide>
        </carousel>
      </v-col>
    </v-row>

    <!-- Members PENDIENTE -->
    <v-row class="block-section members-section" justify="center">
      <div class="wave-wrapper">
        <img :src="asset_wave" class="bg-wave" alt="" />
      </div>
      <v-col cols="auto">
        <h2 class="text-center primary--text members-section__title">
          Miembros del club
        </h2>
        <carousel ref="carousel" :per-page="1">
          <!-- one -->
          <slide v-for="(slide, index) in gallery" :key="index">
            <div class="slide-wrap">
              <div class="avatar-box" v-for="(member, i) in slide" :key="i">
                <img :src="member.image" alt="" />
              </div>
            </div>
          </slide>
        </carousel>
        <div class="text-center members-section__btn">
          <!-- <v-btn class="primary--text" to="/auth/sign-up">
            ¡Unirme al club!
          </v-btn> -->
          <router-link to="/auth/sign-up">
            <img :src="putiBtn" alt="" />
          </router-link>
        </div>
      </v-col>
    </v-row>

    <!-- Testimonials -->
    <v-row class="block-section testimonial-section align-center">
      <img :src="asset_wave" class="bg-wave" alt="" />
      <v-col>
        <div class="boxed">
          <div class="testimonial-section__main-title">
            <h2 class="primary--text">Testimonios</h2>
          </div>
          <hooper style="height: auto" :settings="hooperSettings">
            <hooper-slide
              v-for="(testimony, index) in testimonies"
              :key="index"
            >
              <div class="slide-wrap text-center">
                <div class="avatar-wrapper">
                  <img :src="testimony.image" class="slide__avatar" alt="" />
                </div>
                <h3 class="slide__name">{{ testimony.name }}</h3>
                <div class="description-wrapper">
                  <p class="slide__description">
                    {{ testimony.description }}
                  </p>
                  <p class="slide__description shadow">
                    {{ testimony.description }}
                  </p>
                </div>
              </div>
            </hooper-slide>
          </hooper>
        </div>
      </v-col>
    </v-row>

    <!-- FAQ -->
    <v-row class="block-section faq-section align-center text-center">
      <v-col>
        <h2 class="header-1 primary--text mb-7">Preguntas Frecuentes</h2>
        <h3 class="text-1 subtitle">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod incididunt ut labore et dolore magna aliqua.
        </h3>
        <div class="faq-wrapper">
          <!-- @mouseleave="enableHover('default')" -->
          <div class="faq-pill">
            <!-- Men -->
            <div
              class="faq-pill__men cursor-pointer"
              :class="
                tab === 'men' ? 'enabled' : tab === 'default' ? '' : 'disabled'
              "
              @click="enableHover('men')"
            >
              <img :src="asset_man" class="clipped-image" alt="" />
              <svg width="0" height="0">
                <defs>
                  <clipPath id="myClip-left">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M755.947 27.4445L758.382 0.5H661.482H655.482H0.481842V485.5H655.482H661.482H670.182L667.747 458.556C665.129 431.611 660.535 377.722 672.617 323.833C679.765 292.426 692.733 261.019 705.702 229.612C714.985 207.13 724.268 184.648 731.417 162.167C747.937 110.761 752.878 59.3562 755.571 31.3391C755.702 29.9854 755.826 28.6863 755.947 27.4445Z"
                      fill="#FEFEFE"
                    />
                  </clipPath>
                </defs>
              </svg>
              <h4>Hombres</h4>
              <div class="woman-description">
                <v-btn
                  @click.stop="closePill()"
                  class="mr-auto"
                  color="primary"
                  x-small
                  fab
                >
                  <v-icon dark> mdi-close </v-icon>
                </v-btn>
                <h3 class="mr-auto text-left mt-7 primary--text">
                  LoremLorem ipsum dolor sit amet, consectetur adipisicing elit.
                </h3>

                <v-dialog v-model="faq_man" width="1200">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mr-auto text-capitalize"
                      width="250"
                      color="primary"
                      rounded
                      v-bind="attrs"
                      v-on="on"
                      >Ver más
                    </v-btn>
                  </template>

                  <v-card>
                    <v-expansion-panels class="custom-accordion">
                      <v-expansion-panel v-for="(item, i) in 4" :key="i">
                        <v-expansion-panel-header>
                          ¿Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit?
                          <img
                            :src="asset_figure_4"
                            class="faq-figure-4"
                            alt=""
                          />
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod incididunt ut labore et dolore
                            magna aliqua. Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit, sed do eiusmod
                            incididunt ut labore et dolore magna aliqua.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod incididunt ut labore et dolore
                            magna aliqua.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod incididunt ut labore et dolore
                            magna aliqua.
                          </p>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card>
                </v-dialog>
              </div>
            </div>

            <!-- Woman -->
            <!-- @click="enableHover('woman')" @mouseleave="enableHover('default')" -->
            <div
              class="faq-pill__woman cursor-pointer"
              :class="
                tab === 'woman'
                  ? 'enabled'
                  : tab === 'default'
                  ? ''
                  : 'disabled'
              "
              @click="enableHover('woman')"
            >
              <img :src="asset_woman" class="clipped-image" alt="" />
              <svg width="0" height="0">
                <defs>
                  <clipPath id="myClip-right">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.43469 458.056L3.8147e-06 485H96.9H102.9H757.9V0H102.9H96.9H88.2L90.6347 26.9444C93.2531 53.8889 97.8469 107.778 85.7653 161.667C78.6169 193.074 65.6484 224.481 52.6799 255.888C43.3968 278.37 34.1137 300.852 26.9653 323.333C10.4451 374.739 5.50359 426.144 2.81037 454.161C2.68025 455.515 2.55537 456.814 2.43469 458.056Z"
                      fill="#FEFEFE"
                    />
                  </clipPath>
                </defs>
              </svg>
              <img :src="asset_figure_3" class="faq-figure-3" alt="" />
              <h4>Mujeres</h4>
              <div class="men-description">
                <v-btn
                  @click.stop="closePill()"
                  class="ml-auto"
                  color="accent"
                  x-small
                  fab
                >
                  <v-icon dark> mdi-close </v-icon>
                </v-btn>
                <h3 class="ml-auto mt-7 accent--text">
                  LoremLorem ipsum dolor sit amet, consectetur adipisicing elit.
                </h3>

                <v-dialog v-model="faq_woman" width="1200">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ml-auto text-capitalize"
                      width="250"
                      color="accent"
                      rounded
                      v-bind="attrs"
                      v-on="on"
                      >Ver más</v-btn
                    >
                  </template>

                  <v-card>
                    <v-expansion-panels class="custom-accordion">
                      <v-expansion-panel v-for="(item, i) in 4" :key="i">
                        <v-expansion-panel-header>
                          ¿Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit?
                          <img
                            :src="asset_figure_4"
                            class="faq-figure-4"
                            alt=""
                          />
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod incididunt ut labore et dolore
                            magna aliqua. Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit, sed do eiusmod
                            incididunt ut labore et dolore magna aliqua.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod incididunt ut labore et dolore
                            magna aliqua.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod incididunt ut labore et dolore
                            magna aliqua.
                          </p>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-card>
                </v-dialog>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import resources from '@/mixins/resources'
import { Carousel, Slide } from 'vue-carousel'
import VueYouTubeEmbed from 'vue-youtube-embed'
import asset_avatar from '@/assets/ui-avatar.svg'
import asset_man from '@/assets/ui-faq-man.png'
import asset_woman from '@/assets/ui-faq-woman.png'
import asset_figure from '@/assets/ui-faq-figure.svg'
import asset_figure_3 from '@/assets/ui-faq-figure-3.svg'
import asset_figure_4 from '@/assets/ui-faq-figure-4.svg'
import putiBtn from '@/assets/puticlub-btn.png'
import { Hooper, Slide as HooperSlide } from 'hooper'
import 'hooper/dist/hooper.css'
export default {
  mixins: [resources],
  components: { Carousel, Slide, VueYouTubeEmbed, Hooper, HooperSlide },
  data() {
    return {
      //

      asset_avatar,
      asset_man,
      asset_woman,
      asset_figure,
      asset_figure_3,
      asset_figure_4,
      putiBtn,
      //
      faq_woman: false,
      faq_man: false,
      tab: 'default',
      hooperSettings: {
        infiniteScroll: true,
        centerMode: true,
        itemsToShow: 4.25,
      },
      model: 0,
      colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
      //landing properties
      videosIsReady: false,
      videos: [],
      slidesIsReady: false,
      slides: [],
      galleryIsReady: false,
      gallery: [],
      testimoniesIsReady: false,
      testimonies: [],
    }
  },

  methods: {
    enableHover(tab) {
      this.tab = tab
    },
    closePill() {
      this.tab = 'default'
    },
    async getVideos() {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}settings/1`)
        .then((res) => {
          this.videosIsReady = true
          this.videos = res.data
          console.debug(res)
        })
        .catch((e) => {
          console.debug(e)
        })
    },
    async getSlides() {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}settings/2`)
        .then((res) => {
          this.slidesIsReady = true
          this.slides = res.data
          console.debug(res)
        })
        .catch((e) => {
          console.debug(e)
        })
    },
    async getGallery() {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}settings-galeria`)
        .then((res) => {
          this.galleryIsReady = true
          this.gallery = res.galeria
          console.debug(res)
        })
        .catch((e) => {
          console.debug(e)
        })
    },
    async getTestimonies() {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}settings/5`)
        .then((res) => {
          this.testimoniesIsReady = true
          this.testimonies = res.data
          console.debug(res)
        })
        .catch((e) => {
          console.debug(e)
        })
    },
  },

  mounted() {
    this.getVideos()
    this.getSlides()
    this.getGallery()
    this.getTestimonies()
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;300;600;700&display=swap');
.landing-page {
  h2 {
    font-size: 36px;
    line-height: 30px;
    font-weight: 700;
    letter-spacing: -1px;
  }
  // .v-dialog:not(.v-dialog--fullscreen) {
  //   //max-height: 90px; default
  //   max-height: 750px;
  //   border-radius: 20px;
  // }
}
.cursor-pointer {
  cursor: pointer;
}
.text-1 {
  // width: 420px;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.015em;
  color: #321215;
  opacity: 0.5;
}
.boxed {
  max-width: 1440px;
  margin: 0 auto;
}

* {
  font-family: 'Raleway', sans-serif !important;
}
.VueCarousel {
  &-pagination {
    max-width: 1440px;
    margin: 0 auto;
    text-align: right !important;
  }
  &-dot-container,
  &-dot {
    margin-top: 0 !important;
  }
  &-dot-container {
  }
  &-dot {
    background-color: white !important;
    margin: 38px 7.5px 0 7.5px !important;
    padding: 0 !important;
    width: 50px !important;
    height: 16px !important;
    border-radius: 100px !important;
    filter: $elevation-1;
  }
}
.block-section {
  min-height: 100vh;
  // max-height: ;
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
    max-width: 460px;
    p {
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
      letter-spacing: 0.015em;
      color: #f5f7fa;
    }
  }
}
.carousel-wrapper {
  max-width: 1440px;
  // max-width: 1158px;
  margin: 0 auto;
}
.video-section {
  position: relative;
  .bg-wave {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: auto;
    transform: translateY(-5px) rotate(180deg);
  }
  .slide-wrap {
    max-width: 1440px;
    margin: 0 auto;
  }
  .VueCarousel-dot.VueCarousel-dot {
    background-color: $primary !important;
  }
  .wrapper-video {
    & > div {
      display: flex;
      border-radius: 10px;
      overflow: hidden;
    }
  }
}
.members-section {
  align-items: center;
  position: relative;
  // margin: 0 auto;
  .slide-wrap {
    // max-width: 1440px;
    width: max-content;
    height: max-content;
    min-height: 436px;
    margin: 0 auto;
    // background-color: teal;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    align-items: center;
    grid-gap: 35px;
    padding: 1rem;
    // min-width: 1440px;
  }
  .avatar-box {
    // padding: ;
    background-color: white;
    height: 200px;
    width: 200px;
    border-radius: 15px;
    filter: $elevation-1;
    overflow: hidden;
  }
  .wave-wrapper {
    background-color: $primary;
    min-height: 400px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .bg-wave {
    position: absolute;
    top: 0;
    transform: translateY(calc(-100% + 1rem));
    left: 0;
    width: 100%;
    height: auto;
  }
  &__title {
    margin-bottom: calc(80px - 1rem);
  }
  &__btn {
    margin-top: calc(30px - 1rem);
    z-index: 150;
    position: relative;
    margin-top: 2rem;
    img {
      width: 350px;
      height: auto;
    }
    .v-btn {
      background: #fefefe;
      border: 5px solid #e9e9e9;
      box-sizing: border-box;
      border-radius: 50px;
      height: 54px !important;
      min-width: 250px !important;
      box-shadow: 0 0 0 5px hsl(0, 0%, 80%), 0 0 0 15px $primary,
        0 0 0 15px $primary;
      filter: drop-shadow(0px 0px 10px rgba(#ffffff, 0.25));
      // padding: 0 16px;
      span {
        // width: ;
        text-transform: capitalize;
        font-weight: 600;
        font-size: 18px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
.testimonial-section {
  position: relative;
  .bg-wave {
    position: absolute;
    top: 0;
    transform: scaleX(-1) scaleY(-1) translateY(5px);
    left: 0;
    width: 100%;
    height: auto;
  }
  .hooper-slide {
    .slide-wrap {
      // background-color: #bada55;
      position: relative;
      .description-wrapper {
        position: relative;
        // background-color: aquamarine;
      }
      .avatar-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 275px;
        img {
          border-radius: 10px;
        }
      }
      .slide {
        &__avatar {
          transition: all 2 ease;
        }
        &__name {
          margin-bottom: 30px;
          margin-top: 65px;
          font-style: normal;
          font-weight: bold;
          font-size: 36px;
          line-height: 30px;
          text-align: center;
          letter-spacing: -0.025em;
          color: #321215;
          transition: opacity 0.5s ease;
        }
        &__description {
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 28px;
          text-align: center;
          letter-spacing: 0.015em;
          color: #321215;
          opacity: 0;
        }

        &__description.shadow {
          // background: tomato;
          transition: opacity 0.5s ease;
          position: absolute;
          height: 100%;
          width: 600px;
          opacity: 0.5;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      &::after {
        content: '';
        display: block;
        margin: 0 auto;
        width: 20px;
        height: 20px;
        background-color: $primary;
        border-radius: 100%;
      }
    }
    &.is-active {
      // background-color: coral;
      .slide-wrap {
        &::after {
          background-color: transparent;
        }
      }
      .slide {
        &__name,
        &__description.shadow {
          opacity: 0;
        }
        &__avatar {
          transform: scale(0.75);
          opacity: 0.75;
          filter: blur(4px);
        }
      }
    }
    &.is-current.is-active {
      // background-color: #bada55;
      .slide-wrap {
        &::after {
          background-color: $primary;
        }
      }
      .slide {
        &__name {
          opacity: 1;
        }
        &__description.shadow {
          opacity: 0.5;
        }
        &__avatar {
          transform: scale(1);
          opacity: 1;
          filter: blur(0);
        }
      }
    }
  }
  &__main-title {
    margin-bottom: 50px;
  }
}
.faq-section {
  .subtitle {
    // background-color: #bada55;
    max-width: 950px;
    margin: 0 auto;
  }
  .faq-wrapper {
    position: relative;
    min-height: 580px;
  }
  .faq-pill {
    display: grid;
    grid-template-columns: 60% 40%;
    max-width: 1440px;
    margin: 0 auto;
    // min-height: 580px;
    border-radius: 25px;
    filter: drop-shadow(0px 1px 5px rgba(50, 18, 21, 0.29));
    // margin-top: 90px;
    overflow: hidden;
    // test
    position: absolute;
    z-index: 200;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .men-description,
    .woman-description {
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    &__men,
    &__woman {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      .clipped-image {
        transition: filter 0.25s ease;
        filter: blur(10px);
      }
      &::after {
        transition: all 0.5s ease;
      }
      &.enabled {
        .clipped-image {
          filter: blur(0);
        }
      }
      &.disabled {
        &::after {
          background-color: #fff;
          opacity: 1;
        }
        h4 {
          opacity: 0;
        }
        .men-description,
        .woman-description {
          opacity: 1;
        }
      }
    }
    &__men {
      justify-self: start;
      align-self: center;
      height: 100%;
      position: relative;

      &::after {
        content: '';
        background: #783bf9;
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .woman-description {
        position: absolute;
        text-align: right;
        z-index: 250;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        // background: #bada55;
        padding: 70px;
        h3 {
          margin-bottom: 70px;
          width: 400px;
          font-weight: 600;
          font-size: 36px;
          letter-spacing: 0.09em;
          line-height: 45px;
        }
      }
    }
    &__woman {
      z-index: 100;
      margin-left: -120px;
      height: 100%;
      align-self: center;
      position: relative;
      .clipped-image {
        // display: none;
        clip-path: url(#myClip-right);
      }
      .faq-figure-3 {
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(-19%);
        z-index: 200;
      }
      &::after {
        clip-path: url(#myClip-right);
        content: '';
        background: #f42f43;
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: -18px;
        width: 200%;
        height: 100%;
      }
      .men-description {
        position: absolute;
        text-align: right;
        z-index: 250;
        right: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        // background: #bada55;
        padding: 70px;
        h3 {
          margin-bottom: 70px;
          width: 400px;
          font-weight: 600;
          font-size: 36px;
          letter-spacing: 0.09em;
          line-height: 45px;
        }
      }
    }
    h4 {
      font-weight: 800;
      font-size: 48px;
      letter-spacing: 0.06em;
      color: #f5f7fa;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      position: absolute;
      z-index: 250;
    }
  }
}
.custom-accordion {
  margin: 0px auto;
  padding: 75px;
  // max-height: 750px;
  .v-expansion-panel {
    margin: 25px 0;
    border-radius: 15px !important;
    .faq-figure-4 {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: auto;
      border-radius: 0 0 15px 0;
    }
    .v-expansion-panel-header {
      min-height: 100px;
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
      letter-spacing: 0.015em;
      color: #321215;
      overflow: hidden;
      // &::after {
      //   content: '';
      //   position: absolute;
      //   height: 100px;
      //   width: 100px;
      //   top: 0;
      //   right: 0;
      //   background-color: $primary;
      // }
    }
    .v-expansion-panel-content {
      background-color: $primary;
      color: white;
      border-radius: 0 0 15px 15px !important;
    }
    .v-expansion-panel-content__wrap {
      padding: 50px 60px;
      p {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        letter-spacing: 0.015em;
        color: #fefefe;
      }
    }
    &--active {
      .faq-figure-4 {
        border-radius: 0 0 0 0;
      }
    }
  }
}
</style>

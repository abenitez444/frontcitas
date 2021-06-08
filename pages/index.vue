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
    <v-row class="block-section video-section align-center">
      <img :src="asset_wave" class="bg-wave" alt="" />
      <v-col class="video-section__content">
        <carousel ref="carousel" :per-page="1">
          <!-- one -->
          <slide v-for="(item, index) in 5" :key="index">
            <div class="slide-wrap">
              <div class="avatar-box">
                <v-sheet color="transparent">
                  <v-row>
                    <v-col
                      cols="7"
                      class="d-flex justify-center align-center wrapper-video"
                    >
                      <no-ssr placeholder="Loading...">
                        <youtube
                          :player-vars="{ autoplay: 0 }"
                          :player-height="439"
                          video-id="pnY7m5CK-as"
                        />
                      </no-ssr>
                    </v-col>
                    <v-col cols="" class="d-flex flex-column justify-center">
                      <h2 class="header-2 primary--text mb-7">Video 1</h2>
                      <p class="text-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod incididunt ut labore et dolore
                        magna aliqua.
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

    <!-- Members -->
    <v-row class="block-section members-section">
      <div class="wave-wrapper">
        <img :src="asset_wave" class="bg-wave" alt="" />
      </div>
      <v-col cols="auto">
        <h2 class="text-center primary--text members-section__title">
          Miembros del club
        </h2>
        <carousel ref="carousel" :per-page="1">
          <!-- one -->
          <slide v-for="(item, index) in 5" :key="index">
            <div class="slide-wrap">
              <div class="avatar-box">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="avatar-box">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="avatar-box">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="avatar-box">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="avatar-box">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="avatar-box">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="avatar-box">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="avatar-box">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="avatar-box">
                <!-- <img src="" alt=""> -->
              </div>
              <div class="avatar-box">
                <!-- <img src="" alt=""> -->
              </div>
            </div>
          </slide>
        </carousel>
        <div class="text-center members-section__btn">
          <v-btn class="primary--text"> ¡Unirme al club! </v-btn>
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
            <hooper-slide v-for="(item, index) in 6" :key="index">
              <div class="slide-wrap text-center">
                <div class="avatar-wrapper">
                  <img :src="asset_avatar" class="slide__avatar" alt="" />
                </div>
                <h3 class="slide__name">Jane Doe</h3>
                <div class="description-wrapper">
                  <p class="slide__description">
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod incididunt ut labore et dolore magna aliqua.”
                  </p>
                  <p class="slide__description shadow">
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod incididunt ut labore et dolore magna aliqua.”
                  </p>
                </div>
              </div>
            </hooper-slide>
          </hooper>
          <!-- <carousel ref="carousel" :per-page="5" :paginationEnabled="false">
            <slide v-for="(item, index) in 10" :key="index">
              <div class="slide-wrap text-center">
                <img :src="asset_avatar" class="slide__avatar" alt="" />
                <h3 class="slide__name">Jane Doe</h3>
                <p class="slide__description">
                  “Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod incididunt ut labore et dolore magna aliqua.”
                </p>
              </div>
            </slide>
          </carousel> -->
        </div>
      </v-col>
    </v-row>

    <!-- FAQ -->
    <v-row class="block-section faq-section align-center text-center">
      <v-col>
        <h2 class="header-1 primary--text mb-7">Membresía</h2>
        <h3 class="text-1 subtitle">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod incididunt ut labore et dolore magna aliqua.
        </h3>
        <div class="faq-wrapper">
          <div class="faq-pill">
            <!-- :style="`background-image: url('${asset_man}')`" -->
            <div class="faq-pill__men">
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
              <!-- <h4>Hombres</h4> -->
            </div>
            <div class="faq-pill__woman">
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
              <!-- <h4>Mujeres</h4> -->
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
      //
      hooperSettings: {
        infiniteScroll: true,
        centerMode: true,
        itemsToShow: 4.25,
      },
      model: 0,
      colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;300;600;700&display=swap');
$primary: #f42f43;
$accent: #bada55;
$secondary: #ff273e;
$font_one: #321215;
$elevation-1: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1));
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
h2 {
  font-size: 36px;
  line-height: 30px;
  font-weight: 700;

  letter-spacing: -1px;
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
    max-width: 420px;
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
    background-color: #bada55;
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
    background-color: #bada55;
    &__men,
    &__woman {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__men {
      justify-self: start;
      align-self: center;
      height: 100%;
      .clipped-image {
        // display: none;
        // clip-path: url(#myClip-left);
      }
    }
    &__woman {
      margin-left: -120px;
      height: 100%;
      align-self: center;
      .clipped-image {
        // display: none;
        clip-path: url(#myClip-right);
      }
    }
    h4 {
      font-weight: 800;
      font-size: 48px;
      letter-spacing: 0.06em;
      color: #f5f7fa;

      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>

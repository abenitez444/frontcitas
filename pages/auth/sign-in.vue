<template>
  <v-container fluid fill-height class="page-sigin">
    <v-stepper v-model="step" width="500px" class="ma-auto" editable>
      <!-- <div>hey</div> -->
      <v-alert
        v-model="alertStepper"
        border="left"
        close-text="Close Alert"
        color="warning lighten-1"
        class="font-weight-bold ma-5"
        dark
        dismissible
      >
        Aenean imperdiet. Quisque id odio.
      </v-alert>
      <v-stepper-header>
        <v-stepper-step step="1" :complete="step > 1"> </v-stepper-step>

        <v-stepper-step :complete="step > 2" step="2"> </v-stepper-step>

        <v-stepper-step step="3"></v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" color="trasparent" tile elevation="0">
            <p class="gender-label text-center text-1">¿Eres Hombre ó Mujer?</p>
            <div class="d-flex justify-evenly gender-options">
              <!-- men -->
              <div
                class="d-flex flex-column justify-center gender-option"
                :class="
                  gender === 'default'
                    ? ''
                    : gender === 'male'
                    ? 'enabled'
                    : 'disabled'
                "
                @click="setGender('male')"
              >
                <img :src="icon_male" alt="" />
                <p class="text-center text-capitalize">hombre</p>
              </div>
              <!-- woman -->
              <div
                class="d-flex flex-column justify-center gender-option"
                :class="
                  gender === 'default'
                    ? ''
                    : gender === 'female'
                    ? 'enabled'
                    : 'disabled'
                "
                @click="setGender('female')"
              >
                <img :src="icon_female" alt="" />
                <p class="text-center text-capitalize">Mujer</p>
              </div>
            </div>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <!-- <v-btn color="primary" @click="step = 1">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn color="primary" @click="step = 3">
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <!-- <v-btn color="primary" @click="step = 2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn color="primary" @click="step = 3" disabled>
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
        </v-stepper-content>
      </v-stepper-items>
      <div class="text-right directions-wrapper">
        <v-btn
          color="primary"
          @click="prevStep()"
          :disabled="disablingPrevStep()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          @click="nextStep()"
          :disabled="disablingNextStep()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-stepper>
  </v-container>
</template>

<script>
import icon_female from '@/assets/auth/ui-icon-female.svg'
import icon_male from '@/assets/auth/ui-icon-male.svg'
export default {
  layout: 'auth',
  data() {
    return {
      //
      icon_female,
      icon_male,
      //
      step: 1,
      maxStep: 3,
      // disabledNextStep: false,
      // disabledPrevStep: true,
      gender: 'default',
      alertStepper: false,
    }
  },
  methods: {
    setGender(gender) {
      this.gender = gender
    },
    prevStep() {
      const prevStep = this.step === 1 ? 1 : this.step - 1

      this.step = prevStep
    },
    nextStep() {
      const nextStep = this.step === 3 ? this.maxStep : this.step + 1

      this.step = nextStep
    },
    disablingPrevStep() {
      const disabledPrevStep = this.step === 1 ? true : false
      return disabledPrevStep
    },
    disablingNextStep() {
      const disabledNextStep = this.step === this.maxStep ? true : false
      return disabledNextStep
    },
  },
}
</script>

<style lang="scss">
$primary: #f42f43;
$accent: #bada55;
$secondary: #ff273e;
$font_one: #321215;
.justify-evenly {
  justify-content: space-evenly;
}
.page-sigin {
  .login-wrapper {
    padding: 90px 60px 47px 60px;
  }
  .btn-action {
    margin-top: 120px;
  }
  .v-stepper {
    &__header {
      margin-top: 40px;
      margin-bottom: calc(60px - 24px);
      height: auto;
      box-shadow: none;
      justify-content: center;
    }
    &__step {
      margin: 0 7.5px;
      padding: 0;
      height: 15px;
      width: 15px;
      border-radius: 100%;
      background-color: rgba($primary, 0.25) !important;
      // background-color: rgba($primary, 0.25) !important;
      &__step {
        display: none;
      }
      &--complete,
      &--active {
        background-color: rgba($primary, 1) !important;
      }
    }
    &__wrapper {
      overflow-y: visible;
      position: relative;
    }
    .gender-label {
      margin-bottom: 34px;
      // font-size: ;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 30px;
      letter-spacing: -0.025em;
      color: #321215;
    }
    .gender-options {
      .gender-option {
        cursor: pointer;
        opacity: 1;
        transition: opacity 0.5s ease;
        &.enabled {
        }
        &.disabled {
          opacity: 0.5;
        }
      }
      p {
        color: #321215;
        font-weight: bold;
        font-size: 14px;
        line-height: 30px;
        letter-spacing: -0.025em;
      }
    }
    .directions-wrapper {
      // background-color: #bada55;
      // transform: translateY(50%);
      // position: absolute;
      // bottom: 0;
    }
  }
}
</style>

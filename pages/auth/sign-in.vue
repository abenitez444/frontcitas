<template>
  <v-container fluid fill-height class="page-sigin">
    <!-- <v-row class="mt-15">
      <pre>
        {{ errors }}
      </pre>
    </v-row> -->
    <v-row>
      <v-stepper v-model="step" width="500px" class="ma-auto" editable>
        <!-- Alerts -->
        <v-alert
          v-model="alertStepper"
          border="left"
          close-text="Close Alert"
          color="warning lighten-1"
          class="font-weight-bold ma-5"
          dark
          dismissible
        >
          <ul>
            <li v-if="!$v.newUser.gender.required">El genero es requerido</li>
            <li v-if="!$v.newUser.phone.required">
              El número de telefono es requerido
            </li>
            <li v-if="!$v.newUser.username.required">
              El nombre usuario es requerido
            </li>
            <li v-if="!$v.newUser.email.required">El correo es requerido</li>
            <!--  -->
            <li v-if="!$v.newUser.password.required">
              La contraseña es requerida
            </li>
            <li v-if="!$v.newUser.password.minLength">
              La contraseña debe poseer almenos 8 caracteres
            </li>
            <li v-if="!$v.newUser.password_confirmation.sameAsPassword">
              Las contraseñas no coinciden
            </li>
            <!--  -->
            <li v-if="!$v.newUser.first_name.required">
              El nombre es requerido
            </li>
            <li v-if="!$v.newUser.last_name.required">
              El apellido es requerido
            </li>
            <li v-if="!$v.newUser.birth_day.required">
              La fecha de cumpleaños es requerida
            </li>
            <li v-if="!$v.newUser.civil_status.required">
              El estatus es requerido
            </li>
            <li v-if="!$v.newUser.profession.required">
              La profesión es requerida
            </li>
          </ul>
        </v-alert>

        <!-- Stepper header -->
        <v-stepper-header>
          <v-stepper-step step="1" :complete="step > 1"> </v-stepper-step>

          <v-stepper-step :complete="step > 2" step="2"> </v-stepper-step>

          <v-stepper-step step="3"></v-stepper-step>
        </v-stepper-header>

        <!-- Stepper items -->
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-12" color="trasparent" tile elevation="0">
              <p class="gender-label text-center text-1">
                ¿Eres Hombre ó Mujer?
              </p>
              <div class="d-flex justify-evenly gender-options">
                <!-- men -->
                <div
                  class="d-flex flex-column justify-center gender-option"
                  :class="
                    this.newUser.gender === ''
                      ? ''
                      : this.newUser.gender === 1
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
                    this.newUser.gender === ''
                      ? ''
                      : this.newUser.gender === 0
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

          <!-- Informacion de cuenta -->
          <v-stepper-content step="2">
            <v-card class="mb-12" color="transparent" elevation="0">
              <v-card-text>
                <!-- Formulario -->
                <v-sheet>
                  <v-row>
                    <!-- Username -->
                    <v-col cols="12">
                      <v-text-field
                        label="Usuario"
                        class="rounded-b"
                        solo
                        hide-details=""
                        v-model="newUser.username"
                      ></v-text-field>
                    </v-col>
                    <!-- Correo -->
                    <v-col cols="12">
                      <v-text-field
                        label="Correo"
                        class="rounded-b"
                        solo
                        type="email"
                        hide-details=""
                        v-model="newUser.email"
                      ></v-text-field>
                    </v-col>
                    <!-- Telefono -->
                    <v-col cols="12">
                      <phone-mask-input
                        v-model="newUser.phone"
                        autoDetectCountry
                        wrapperClass="phone-input"
                        placeholder="Teléfono"
                      />
                    </v-col>
                    <!-- Contraseña -->
                    <v-col cols="12">
                      <v-text-field
                        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="!passwordShow ? 'text' : 'password'"
                        @click:append="passwordShow = !passwordShow"
                        label="Contraseña"
                        class="rounded-b"
                        solo
                        hide-details=""
                        v-model="newUser.password"
                      ></v-text-field>
                    </v-col>
                    <!-- Confirmar contraseña -->
                    <v-col cols="12">
                      <v-text-field
                        :append-icon="
                          confirmPasswordShow ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="!confirmPasswordShow ? 'text' : 'password'"
                        @click:append="
                          confirmPasswordShow = !confirmPasswordShow
                        "
                        label="Confirmar Contraseña"
                        class="rounded-b"
                        solo
                        hide-details=""
                        v-model="newUser.password_confirmation"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12" color="transparent" elevation="0">
              <v-card-text>
                <!-- Formulario -->
                <v-sheet>
                  <v-row>
                    <!-- Nombre completo -->
                    <v-col cols="6">
                      <v-text-field
                        label="Nombre"
                        class="rounded-b"
                        solo
                        hide-details=""
                        v-model="newUser.first_name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="Apellido"
                        class="rounded-b"
                        solo
                        hide-details=""
                        v-model="newUser.last_name"
                      ></v-text-field>
                    </v-col>

                    <!-- Fecha de nacimiento -->
                    <v-col cols="12">
                      <v-dialog
                        ref="dialog"
                        v-model="modalBirthday"
                        :return-value.sync="newUser.birth_day"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="newUser.birth_day"
                            label="Fecha de nacimiento"
                            append-icon="mdi-calendar"
                            readonly
                            solo
                            v-bind="attrs"
                            v-on="on"
                            hide-details=""
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="newUser.birth_day"
                          scrollable
                          locale="es-ve"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="modalBirthday = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(newUser.birth_day)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>

                    <!-- Estado Civil -->
                    <v-col cols="12">
                      <v-select
                        :items="civilStates"
                        label="Estado civil"
                        hide-details=""
                        v-model="newUser.civil_status"
                        solo
                      ></v-select>
                    </v-col>

                    <!-- Profesion -->
                    <v-col cols="12">
                      <v-text-field
                        label="Profesión"
                        class="rounded-b"
                        solo
                        hide-details=""
                        v-model="newUser.profession"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="text-center">
                      <v-btn
                        :disabled="loadingForm"
                        :loading="loadingForm"
                        rounded
                        class="text-capitalize"
                        width="150px"
                        color="primary"
                        @click="submit()"
                      >
                        Registrar
                      </v-btn>
                      <v-dialog
                        v-model="loadingForm"
                        hide-overlay
                        persistent
                        width="300"
                      >
                        <v-card color="primary" dark>
                          <v-card-text>
                            Espere un momento, por favor.
                            <v-progress-linear
                              indeterminate
                              color="white"
                              class="mb-0"
                            ></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-card-text>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>

        <!-- Directions -->
        <div class="text-right directions-wrapper">
          <v-btn
            color="primary"
            @click="prevStep()"
            :disabled="disablingPrevStep()"
            small
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            @click="nextStep()"
            :disabled="disablingNextStep()"
            small
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-stepper>
    </v-row>
  </v-container>
</template>

<script>
import PhoneMaskInput from 'vue-phone-mask-input'
import icon_female from '@/assets/auth/ui-icon-female.svg'
import icon_male from '@/assets/auth/ui-icon-male.svg'
import { validationMixin } from 'vuelidate'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  layout: 'auth',
  data() {
    return {
      //? Assets
      icon_female,
      icon_male,
      //? Stepper
      step: 1,
      maxStep: 3,
      gender: 'default',
      //? Form
      passwordShow: true,
      confirmPasswordShow: true,
      date: null,
      modalBirthday: false,
      civilStates: ['Soltero', 'Casado'],
      loadingForm: false,
      newUser: {
        phone: '+584245557777',
        gender: 1,
        username: 'John',
        email: 'g7.alexander@gmail.com',
        password: '12345678',
        password_confirmation: '12345678',
        first_name: 'John',
        last_name: 'Doe',
        birth_day: '1995-03-29',
        civil_status: 'Soltero',
        profession: 'Ingeniero',
        //? Debug
        // phone: '',
        // gender: '',
        // username: '',
        // email: '',
        // password: '',
        // password_confirmation: '',
        // first_name: '',
        // last_name: '',
        // birth_day: '',
        // civil_status: '',
        // profession: '',
      },
      //? errors
      alertStepper: false,
      errors: {},
    }
  },
  methods: {
    setGender(gender) {
      this.gender = gender
      this.newUser.gender = gender === 'male' ? 1 : 0
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
    async submit() {
      this.alertStepper = !this.validationSuccess
      if (this.validationSuccess) {
        this.loadingForm = true
        await this.$axios
          .$post(`${this.$axios.defaults.baseURL}signup/`, this.newUser)
          .then((res) => {
            this.loadingForm = false
            console.debug(res)
          })
          .catch((e) => {
            this.loadingForm = false
            this.errors = e.response.data
          })
      }
    },
  },
  computed: {
    validationSuccess() {
      let validationSuccess = false
      const {
        gender,
        username,
        email,
        password,
        password_confirmation,
        first_name,
        last_name,
        birth_day,
        civil_status,
        profession,
      } = this.$v.newUser
      if (
        gender.required &&
        username.required &&
        email.required &&
        password.required &&
        password.minLength &&
        password_confirmation.sameAsPassword &&
        first_name.required &&
        last_name.required &&
        birth_day.required &&
        civil_status.required &&
        profession.required
      ) {
        validationSuccess = true
      }
      return validationSuccess
    },
  },
  watch: {
    // loadingForm(val) {
    //   if (!val) return
    //   setTimeout(() => (this.loadingForm = false), 2000)
    // },
  },
  validations: {
    newUser: {
      phone: {
        required,
      },
      gender: {
        required,
      },
      username: {
        required,
      },
      email: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      password_confirmation: {
        sameAsPassword: sameAs(function () {
          return this.newUser.password
        }),
      },
      first_name: {
        required,
      },
      last_name: {
        required,
      },
      birth_day: {
        required,
      },
      civil_status: {
        required,
      },
      profession: {
        required,
      },
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
    overflow: unset;
    border-radius: 10px;
    box-shadow: 0px 1px 10px rgb(0 0 0 / 10%);
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
      transform: translateY(50%) translateX(-15px);
      .v-btn {
        padding: 0 !important;
        height: 30px;
        width: 30px;
        min-width: 30px !important;
        margin: 0 15px;
        &--disabled {
        }
      }
      // background-color: #bada55;
      // transform: translateY(50%);
      // position: absolute;
      // bottom: 0;
    }
    .phone-input {
      min-height: 48px;
      padding: 0 12px;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
      display: flex;
      align-items: center;
      border-radius: 4px;
      input {
        font-size: 16px;
        width: 100%;
        // background-color: #bada55;
        outline: 0;
      }
    }
  }
}
</style>

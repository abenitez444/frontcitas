<template>
  <v-col order="1" order-md="2">
    <v-row class="pa-4">
      <v-stepper v-model="step" width="500px" class="ma-auto" editable>
        <!-- Stepper header -->
        <v-stepper-header>
          <v-stepper-step step="1" :complete="step > 1"> </v-stepper-step>

          <v-stepper-step :complete="step > 2" step="2"> </v-stepper-step>

          <v-stepper-step step="3"></v-stepper-step>
        </v-stepper-header>

        <!-- Stepper items -->
        <v-stepper-items>
          <!-- genero -->
          <v-stepper-content step="1">
            <v-card class="mb-6" color="trasparent" tile elevation="0">
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
            <v-card class="mb-6" color="transparent" elevation="0">
              <v-card-text>
                <!-- Formulario -->
                <v-sheet>
                  <v-row>
                    <!-- Username -->
                    <v-col cols="12">
                      <v-text-field
                        autocomplete="off"
                        label="Usuario"
                        class="rounded-b"
                        v-model="newUser.username"
                        required
                        outlined
                        :error-messages="nameErrors"
                        @input="$v.newUser.username.$touch()"
                        @blur="$v.newUser.username.$touch()"
                      ></v-text-field>
                    </v-col>
                    <!-- Correo -->
                    <v-col cols="12">
                      <v-text-field
                        autocomplete="off"
                        label="Correo"
                        class="rounded-b"
                        outlined
                        type="email"
                        required
                        v-model="newUser.email"
                        :error-messages="emailErrors"
                        @input="$v.newUser.email.$touch()"
                        @blur="$v.newUser.email.$touch()"
                      ></v-text-field>
                    </v-col>
                    <!-- Telefono -->
                    <v-col cols="12" class="fixed-label">
                      <!-- <label for="" class="fixed-label-item">Teléfono</label> -->
                      <!-- <phone-mask-input
                        v-model="newUser.phone"
                        autoDetectCountry
                        wrapperClass="phone-input"
                        placeholder="Teléfono"
                      /> -->
                      <v-text-field
                        autocomplete="off"
                        label="Teléfono"
                        class="rounded-b"
                        outlined
                        required
                        v-model="newUser.phone"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <!-- Contraseña -->
                    <v-col cols="12">
                      <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            autocomplete="off"
                            v-bind="attrs"
                            v-on="on"
                            :append-icon="
                              passwordShow ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="!passwordShow ? 'text' : 'password'"
                            @click:append="passwordShow = !passwordShow"
                            label="Contraseña"
                            class="rounded-b"
                            outlined
                            v-model="newUser.password"
                            :error-messages="passwordErrors"
                            @input="$v.newUser.password.$touch()"
                            @blur="$v.newUser.password.$touch()"
                          ></v-text-field>
                        </template>
                        <ul>
                          <li>Debe contener mínimo 8 caracteres</li>
                          <li>Al menos 1 Letra minúscula del alfabeto (a-z)</li>
                          <li>Al menos 1 Cifra entera (0-9)</li>
                          <li>
                            Al menos 1 caracter especial, tales como @#$%&*-+=/
                          </li>
                          <li>
                            No se permite la letra “ñ” ni letras con tilde ni
                            espacios
                          </li>
                        </ul>
                      </v-tooltip>
                    </v-col>
                    <!-- <v-col>
                      <pre>
                        {{ $v.newUser.password }}
                      </pre>
                    </v-col> -->
                    <!-- Confirmar contraseña -->
                    <v-col cols="12">
                      <v-text-field
                        autocomplete="off"
                        :append-icon="
                          confirmPasswordShow ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="!confirmPasswordShow ? 'text' : 'password'"
                        @click:append="
                          confirmPasswordShow = !confirmPasswordShow
                        "
                        label="Confirmar Contraseña"
                        class="rounded-b"
                        outlined
                        v-model="newUser.password_confirmation"
                        :error-messages="passwordConfirmErrors"
                        @input="$v.newUser.password_confirmation.$touch()"
                        @blur="$v.newUser.password_confirmation.$touch()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-card-text>
            </v-card>
          </v-stepper-content>

          <!-- otra info -->
          <v-stepper-content step="3">
            <v-card class="mb-6" color="transparent" elevation="0">
              <v-card-text>
                <!-- Formulario -->
                <v-sheet>
                  <v-row>
                    <!-- Nombre completo -->
                    <v-col cols="6">
                      <v-text-field
                        autocomplete="off"
                        label="Nombre"
                        class="rounded-b"
                        outlined
                        v-model="newUser.first_name"
                        :error-messages="firstNameErrors"
                        @input="$v.newUser.first_name.$touch()"
                        @blur="$v.newUser.first_name.$touch()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        autocomplete="off"
                        label="Apellido"
                        class="rounded-b"
                        outlined
                        v-model="newUser.last_name"
                        :error-messages="lastNameErrors"
                        @input="$v.newUser.last_name.$touch()"
                        @blur="$v.newUser.last_name.$touch()"
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
                            autocomplete="off"
                            v-model="newUser.birth_day"
                            label="Fecha de nacimiento"
                            append-icon="mdi-calendar"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            :error-messages="birthDayErrors"
                            @input="$v.newUser.birth_day.$touch()"
                            @blur="$v.newUser.birth_day.$touch()"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          :max="maxDate()"
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
                        v-if="newUser.gender === 1"
                        :items="civilStatesMan"
                        label="Estado civil"
                        v-model="newUser.civil_status"
                        outlined
                        :error-messages="civilStatusErrors"
                        @input="$v.newUser.civil_status.$touch()"
                        @blur="$v.newUser.civil_status.$touch()"
                      ></v-select>
                      <v-select
                        v-if="newUser.gender === 0"
                        :items="civilStatesWoman"
                        label="Estado civil"
                        v-model="newUser.civil_status"
                        outlined
                        :error-messages="civilStatusErrors"
                        @input="$v.newUser.civil_status.$touch()"
                        @blur="$v.newUser.civil_status.$touch()"
                      ></v-select>
                    </v-col>

                    <!-- Profesion -->
                    <v-col cols="12">
                      <v-text-field
                        autocomplete="off"
                        label="Profesión"
                        class="rounded-b"
                        outlined
                        v-model="newUser.profession"
                        :error-messages="professionErrors"
                        @input="$v.newUser.profession.$touch()"
                        @blur="$v.newUser.profession.$touch()"
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
                        Enviar
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

    <!-- Alerts -->
    <v-alert
      v-model="alertStepper"
      border="left"
      close-text="Close Alert"
      color="error lighten-1"
      class="font-weight-bold ma-5"
      dark
      dismissible
      prominent
    >
      <ul class="error-text">
        <li class="" v-if="!$v.newUser.gender.required">
          El genero es requerido
        </li>
        <li class="" v-if="!$v.newUser.phone.required">
          El número de telefono es requerido
        </li>
        <li class="" v-if="!$v.newUser.username.required">
          El nombre usuario es requerido
        </li>
        <li class="" v-if="!$v.newUser.email.required">
          El correo es requerido
        </li>
        <!--  -->
        <li class="" v-if="!$v.newUser.password.required">
          La contraseña es requerida
        </li>
        <li class="" v-if="!$v.newUser.password.minLength">
          La contraseña debe poseer almenos 8 caracteres
        </li>
        <li class="" v-if="!$v.newUser.password_confirmation.sameAsPassword">
          Las contraseñas no coinciden
        </li>
        <!--  -->
        <li class="" v-if="!$v.newUser.first_name.required">
          El nombre es requerido
        </li>
        <li class="" v-if="!$v.newUser.last_name.required">
          El apellido es requerido
        </li>
        <li class="" v-if="!$v.newUser.birth_day.required">
          La fecha de cumpleaños es requerida
        </li>
        <li class="" v-if="!$v.newUser.civil_status.required">
          El estado civil es requerido
        </li>
        <li class="" v-if="!$v.newUser.profession.required">
          La profesión es requerida
        </li>

        <!-- otros errores -->
        <!-- v-for="(error, i) in errors" -->
        <li class="" v-if="errors">
          Lo sentimos, ha ocurrido un error pongase en contacto con el soporte
        </li>
      </ul>
    </v-alert>
  </v-col>
</template>

<script>
import PhoneMaskInput from 'vue-phone-mask-input'
import icon_female from '@/assets/auth/ui-icon-female.svg'
import icon_male from '@/assets/auth/ui-icon-male.svg'
import { validationMixin } from 'vuelidate'
import authMixin from '@/mixins/authMixin'
import {
  required,
  sameAs,
  minLength,
  email,
  alpha,
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin, authMixin],
  layout: 'auth',
  data() {
    return {
      //? Assets
      icon_female,
      icon_male,

      //? Stepper
      step: 3,
      maxStep: 3,
      gender: 'default',

      //? Form
      passwordShow: true,
      confirmPasswordShow: true,
      date: null,
      modalBirthday: false,
      civilStatesWoman: ['Soltera', 'Casada'],
      civilStatesMan: ['Soltero', 'Casado'],
      loadingForm: false,
      newUser: {
        phone: '',
        gender: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
        birth_day: '',
        civil_status: '',
        profession: '',
        //? Debug
        // phone: '+584245557777',
        // gender: 1,
        // username: 'deeply',
        // email: 'frederick.gonzalez@jirehpro.com',
        // password: '12345678',
        // password_confirmation: '12345678',
        // first_name: 'John',
        // last_name: 'Doe',
        // birth_day: '1995-03-29',
        // civil_status: 'Soltero',
        // profession: 'Ingeniero',
      },

      //? errors
      alertStepper: false,
      errors: false,
    }
  },
  mounted() {
    console.debug('accent', `${/^[áéíóúñüàè]+$/i.test('asdasdñ')}`)
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
          .$post(`${this.$axios.defaults.baseURL}signup`, this.newUser)
          .then((res) => {
            const { token, sub, prof, status } = res
            this.loadingForm = false
            this.authenticating({
              token,
              sub,
              prof,
              status,
            })
            this.$router.push('/profile')
          })
          .catch((e) => {
            console.debug(e)
            this.loadingForm = false
            this.errors = true
            this.alertStepper = true
          })
      }
    },
    maxDate() {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 18)
      return date.toISOString().substr(0, 10)
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
    nameErrors() {
      const errors = []
      if (!this.$v.newUser.username.$dirty) return errors
      !this.$v.newUser.username.required &&
        errors.push('El nombre de usuario es requerido.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.newUser.email.$dirty) return errors
      !this.$v.newUser.email.email &&
        errors.push(
          'El correo electrónico debe poseer el siguiente formato ejemplo: correo@correo.com'
        )
      !this.$v.newUser.email.required &&
        errors.push('El correo electrónico es requerido')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.newUser.password.$dirty) return errors
      !this.$v.newUser.password.minLength &&
        errors.push('La contraseña debe contener mínimo 8 caractere')
      !this.$v.newUser.password.required &&
        errors.push('La contraseña es requerida')
      !this.$v.newUser.password.containsLowercase &&
        errors.push(
          'Debe contener al menos 1 Letra minúscula del alfabeto (a-z)'
        )
      !this.$v.newUser.password.containsUppercase &&
        errors.push(
          'Debe contener al menos 1 Letra mayúscula del alfabeto (A-Z)'
        )
      !this.$v.newUser.password.containsNumber &&
        errors.push('Debe contener al menos 1 Cifra entera (0-9)')
      !this.$v.newUser.password.containsSpecial &&
        errors.push(
          'Debe contener al menos 1 caracter especial, tales como @#$%&*-+=/'
        )
      this.$v.newUser.password.containsAccent &&
        errors.push(
          'No se permite la letra “ñ” ni letras con tilde ni espacios'
        )
      return errors
    },
    passwordConfirmErrors() {
      const errors = []
      if (!this.$v.newUser.password_confirmation.$dirty) return errors
      !this.$v.newUser.password_confirmation.sameAsPassword &&
        errors.push(
          'La contrsaeña introducida es distinta a la anterior, por favor intente de nuevo'
        )
      return errors
    },
    firstNameErrors() {
      const errors = []
      if (!this.$v.newUser.first_name.$dirty) return errors
      !this.$v.newUser.first_name.required &&
        errors.push('El nombre es requerido')
      !this.$v.newUser.first_name.alpha &&
        errors.push('Solo se aceptan caracteres alfabéticos')
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.newUser.last_name.$dirty) return errors
      !this.$v.newUser.last_name.required &&
        errors.push('El apellido es requerido')
      !this.$v.newUser.last_name.alpha &&
        errors.push('Solo se aceptan caracteres alfabéticos')
      return errors
    },
    birthDayErrors() {
      const errors = []
      if (!this.$v.newUser.birth_day.$dirty) return errors
      !this.$v.newUser.birth_day.required &&
        errors.push('La fecha de nacimiento es requerida')
      return errors
    },
    civilStatusErrors() {
      const errors = []
      if (!this.$v.newUser.civil_status.$dirty) return errors
      !this.$v.newUser.civil_status.required &&
        errors.push('El estado civil es requerido')
      return errors
    },
    professionErrors() {
      const errors = []
      if (!this.$v.newUser.profession.$dirty) return errors
      !this.$v.newUser.profession.required &&
        errors.push('La profesión es requerida')
      !this.$v.newUser.profession.alpha &&
        errors.push('Solo se aceptan caracteres alfabéticos')
      return errors
    },
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
        email,
      },
      password: {
        required,
        minLength: minLength(8),
        containsLowercase: function (value) {
          return /[a-z]/.test(value)
        },
        containsUppercase: function (value) {
          return /[A-Z]/.test(value)
        },
        containsNumber: function (value) {
          return /[0-9]/.test(value)
        },
        containsSpecial: function (value) {
          return /[#?!@$%^&*-]/.test(value)
        },
        containsAccent: function (value) {
          return /[À-ÿ\u00f1\u00d1\s]/.test(value)
        },
        // valid: function (value) {
        //   const containsUppercase = /[A-Z]/.test(value)
        //   const containsLowercase = /[a-z]/.test(value)
        //   const containsNumber = /[0-9]/.test(value)
        //   const containsSpecial = /[#?!@$%^&*-]/.test(value)
        //   return (
        //     containsUppercase &&
        //     containsLowercase &&
        //     containsNumber &&
        //     containsSpecial
        //   )
        // },
      },
      password_confirmation: {
        sameAsPassword: sameAs(function () {
          return this.newUser.password
        }),
      },
      first_name: {
        required,
        alpha,
      },
      last_name: {
        required,
        alpha,
      },
      birth_day: {
        required,
      },
      civil_status: {
        required,
      },
      profession: {
        required,
        alpha,
      },
    },
  },
}
</script>

<style lang="scss">
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
  .fixed-label {
    position: relative;
    &-item {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(1.5rem, 0%);
    }
  }
  .error-text {
    font-size: 14px;
    // margin-bottom: 4px;
  }
}
@media (max-width: 576px) {
  .page-sigin {
    .login-wrapper {
      padding: 90px 30px 47px 30px;
    }
  }
}
</style>

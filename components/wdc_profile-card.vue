<template>
  <v-card class="cm-round-1 cm-elevation-1 profile-card">
    <v-card-text class="pa-4 pa-sm-8">
      <v-sheet>
        <!-- head -->
        <v-row align="center">
          <!-- avatar -->
          <v-col cols="auto" class="avatar-wrapper">
            <div
              class="profile-card__avatar"
              :class="
                getUserData.avatar !== ''
                  ? ''
                  : 'primary  d-flex justify-center align-center'
              "
              :style="`background-image: url('${img_baseUrl}${getUserData.avatar}')`"
            >
              <span
                v-if="getUserData.avatar === ''"
                class="white--text text-h5 text-uppercase"
              >
                {{ getUserData.first_name[0] }}
                {{ getUserData.last_name[0] }}
              </span>
            </div>

            <img
              v-if="!inTrial && $route.name !== 'trial_out'"
              :src="membershipIcon"
              class="profile-card__membership"
              alt=""
            />
          </v-col>
          <!-- mode -->
          <v-col>
            <v-btn
              x-small
              rounded
              color="accent"
              class="btn-trial"
              v-if="inTrial"
            >
              Modo Trial
            </v-btn>
            <h2 class="profile-card__name font_one--text">
              {{ getUserData.first_name }}
              {{ getUserData.last_name }}
              <span
                class="profile-card__icon"
                v-if="getUserData && getUserData.user.id_rol !== 1"
              >
                <img :src="maleIcon" alt="" v-if="getUserData.gender === 1" />

                <img :src="femaleIcon" alt="" v-if="getUserData.gender === 0" />
              </span>
            </h2>
            <h3
              class="profile-card__region font_one--text"
              v-if="
                getUserData !== null &&
                getUserData.region !== null &&
                getUserData.user.id_rol === 2
              "
            >
              {{ getUserData.region.name }}
            </h3>
            <h3
              class="profile-card__region font_one--text"
              v-else-if="getUserData.user.id_rol === 1"
            >
              Admin
            </h3>
          </v-col>
        </v-row>
        <!-- Profile state -->
        <!-- <v-row
          no-gutters
          class="mt-4"
          v-if="getUserData && getUserData.user.id_rol !== 1"
        >
          <v-col class="account-progress">
            <p class="mb-0 font_one--text account-progress__label">
              Estado de cuenta
            </p>
            <v-progress-linear
              color="primary"
              height="10"
              rounded
              :value="percent"
            ></v-progress-linear>
            <div
              class="percent primary--text text-right account-progress__percent"
            >
              {{ percent }}%
            </div>
          </v-col>
        </v-row> -->
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import authMixin from '@/mixins/authMixin'
import resourcesMixin from '@/mixins/resources'
import membershipIcon from '@/assets/ui-icon-membership.svg'
export default {
  mixins: [authMixin, resourcesMixin],
  mounted() {
    this.$forceUpdate()
  },
  data() {
    return {
      //? profile card
      membershipIcon,
      percent: 50,
    }
  },
}
</script>

<style lang="scss">
.profile-card {
  position: relative;
  .btn-trial {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-20px, 20px);
    @media (max-width: 576px) {
      transform: translate(-20px, -10px);
    }
  }
  &__name {
    font-weight: bold;
    font-size: 18px;
    // line-height: 30px;
    @media (max-width: 414px) {
      font-size: 14px;
    }
  }
  &__avatar {
    border: 3px solid #ffffff;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    height: 90px;
    width: 90px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  &__icon {
    margin-left: 10px;
  }
  &__region {
    font-weight: bold;
    font-size: 14px;
    // line-height: 30px;
    opacity: 0.5;
  }
  &__membership {
    position: absolute;
    width: 25px;
    height: auto;
    bottom: 0;
    right: 0;
    transform: translate(-25%, -75%);
  }
  .avatar-wrapper {
    position: relative;
  }
}
</style>

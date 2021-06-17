<template>
  <v-container fluid fill-height class="page-layout-1">
    <v-row class="block-section">
      <v-col cols="3">
        <v-card class="cm-round-1 cm-elevation-1">
          <v-card-text class="pa-8">
            <v-sheet color="transparent">
              <v-row no-gutters>
                <v-col>
                  <!-- <h1>hey</h1> -->
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-sheet color="transparent">
          <v-row no-gutters>
            <v-col>
              <v-card class="cm-round-1 cm-elevation-1">
                <v-card-text class="pa-8">
                  <h1>info</h1>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-8">
            <v-col>
              <v-card class="cm-round-1 cm-elevation-1">
                <v-card-text class="pa-8">
                  <h2 class="font_one--text">Perfil</h2>
                  <v-sheet color="transparent">
                    <v-row>
                      <v-col>
                        <v-file-input
                          accept="image/*"
                          label="File input"
                          hide-details=""
                        ></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field label="Nombre" solo></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field label="Apellido" solo></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Solo"
                          placeholder="Placeholder"
                          solo
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="3">
        <v-card class="cm-round-1 cm-elevation-1">
          <v-card-text class="pa-8">
            <v-sheet color="transparent">
              <v-row no-gutters>
                <v-col>
                  <!-- <h1>hey</h1> -->
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authMixin from '@/mixins/authMixin'
export default {
  mixins: [authMixin],
  mounted() {
    this.getProfile()
  },
  methods: {
    async getProfile() {
      // this.loadingForm = true
      const { token } = JSON.parse(localStorage.getItem('wdc_token'))
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}auth/profile/4`, config)
        .then((res) => {
          console.debug(res)
          // this.loadingForm = false
          // this.authenticating(res)
        })
        .catch((e) => {
          console.debug(e)
          // this.loadingForm = false
          // this.errors = e.response.data.error
        })
    },
  },
}
</script>

<style lang="scss">
$top-margin: 114px;
.cm-round-1 {
  border-radius: 10px !important;
}
.cm-elevation-1 {
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1) !important;
}
.page-layout-1 {
  max-width: 1710px;
  margin-top: $top-margin;
}
.block-section {
  min-height: calc(100vh - #{$top-margin});
}
</style>

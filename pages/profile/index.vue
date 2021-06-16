<template>
  <v-container fluid fill-height class="page-layout-1">
    <v-row class="block-section">
      <v-col cols="3">
        <v-card class="cm-round-1 cm-elevation-1">
          <v-card-text class="pa-8">
            <v-sheet color="transparent">
              <v-row no-gutters>
                <v-col>
                  <h1>hey</h1>
                  <h1>hey</h1>
                  <h1>hey</h1>
                  <h1>hey</h1>
                  <h1>hey</h1>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="cm-round-1 cm-elevation-1">
          <v-card-text class="pa-8">
            <v-sheet color="transparent">
              <v-row no-gutters>
                <v-col>
                  <h1>hey</h1>
                  <h1>hey</h1>
                  <h1>hey</h1>
                  <h1>hey</h1>
                  <h1>hey</h1>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="cm-round-1 cm-elevation-1">
          <v-card-text class="pa-8">
            <v-sheet color="transparent">
              <v-row no-gutters>
                <v-col>
                  <h1>hey</h1>
                  <h1>hey</h1>
                  <h1>hey</h1>
                  <h1>hey</h1>
                  <h1>hey</h1>
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
export default {}
</script>

<style lang="scss">
$top-margin: 64px;
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

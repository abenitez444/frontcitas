<template>
  <v-dialog v-model="isLoading" hide-overlay persistent width="300">
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
</template>

<script>
import loadingMixin from '@/mixins/loadingMixin'
export default {
  mixins: [loadingMixin],
}
</script>

<style>
</style>

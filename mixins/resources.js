import bgHero from '@/assets/bg-hero.jpg'
import placeHolderSlide from '@/assets/slide_1.jpg'
import asset_wave from '@/assets/asset_wave.svg'
export default {
  data() {
    return {
      bgHero,
      placeHolderSlide,
      asset_wave,
      regions: [],
      bodyTypes: [],
    }
  },
  methods: {
    async getRegions() {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}regions`)
        .then((res) => {
          console.debug(res)
          this.regions = res.regions
        })
        .catch((e) => {
          console.debug(e)
        })
    },
    async getBodyTypes() {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}physical-figures`)
        .then((res) => {
          console.debug(res)
          this.bodyTypes = res.fisical_figures
        })
        .catch((e) => {
          console.debug(e)
        })
    },
    getCivilStates() {},
    getSocialStratos() {},
  },
}

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
      childrenOptions: [],
      contactPreferences: [],
      economicLevels: [],
      monthlySalary: [],
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
    async getBodyTypes(gender) {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}physical-figures`)
        .then((res) => {
          console.debug(res)
          this.bodyTypes = {
            woman: res.fisical_figures.filter((types) => types.gender === 0),
            men: res.fisical_figures.filter((types) => types.gender === 1),
          }
        })
        .catch((e) => {
          console.debug(e)
        })
    },
    async getChildrensOptions() {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}children-options`)
        .then((res) => {
          console.debug(res)
          this.childrenOptions = res.children_option
        })
        .catch((e) => {
          console.debug(e)
        })
    },
    async getContactPreferences() {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}contact-preferences`)
        .then((res) => {
          console.debug(res)
          this.contactPreferences = res.contact_preference
        })
        .catch((e) => {
          console.debug(e)
        })
    },
    async getMonthlySalary() {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}monthly-salary`)
        .then((res) => {
          console.debug(res)
          this.monthlySalary = res.monthly_salaries
        })
        .catch((e) => {
          console.debug(e)
        })
    },
    async getEconomicLevels() {
      await this.$axios
        .$get(`${this.$axios.defaults.baseURL}economic-levels`)
        .then((res) => {
          console.debug(res)
          this.economicLevels = res.economic_levels
        })
        .catch((e) => {
          console.debug(e)
        })
    },
  },
}

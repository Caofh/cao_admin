/*
跳转方法集合
 */

export default {
  methods: {
    /* router跳转下一页，router.push
      let options = {
        name: 'sqDetail',
        query: {
          id: 3
        },
        params: {
          topicId: 6
        }
      }
      this.pushPage(options)
    */
    pushPage(options) {
      let name = options.name || {}
      let query = options.query || {}
      let params = options.params || {}

      this.$router.push({
        name: name,
        query: query,
        params: params
      }).catch((err) => {
        console.log('vue-router捕获catch，不必在意：', err)
      })
    },

    /* router跳转下一页，router.replace
      let options = {
        name: 'sqDetail',,
        query: {
          id: 3
        },
        params: {
          topicId: 6
        }
      }
      replacePage(options)
    */
    replacePage(options) {
      let name = options.name || {}
      let query = options.query || {}
      let params = options.params || {}

      this.$router.replace({
        name: name,
        query: query,
        params: params
      }).catch((err) => {
        console.log('vue-router捕获catch，不必在意：', err)
      })
    }
  }
}

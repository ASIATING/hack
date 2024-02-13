<template>
  <div>
  <div>
    <h5>後台-首頁</h5>
    <RouterLink to="/">回到前台</RouterLink> |
    <RouterLink to="/admin/products">後台產品列表</RouterLink> |
    <RouterLink to="/admin/orders">後台訂單</RouterLink> |
    <a href="#">登出</a>
    123

  </div>
  <RouterView />
</div>
</template>

<script>
import axios from 'axios'
export default {
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    alert(token)
    axios.defaults.headers.common.Authorization = token
    this.checkLogin()
  },
  data () {
    return {
      apiUrl: import.meta.env.VITE_API
      // import.meta.env.VITE_PATH
    }
  },
  methods: {
    checkLogin () {
      axios.post(`${this.apiUrl}/api/user/check`)
        .then(res => {
          alert(res)
        })
        .catch(err => {
          console.dir(err)
          alert(err)
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style scoped>
</style>

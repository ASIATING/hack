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

export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>

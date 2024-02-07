<template>
  <div>
  <div>
    <h5>使用者-首頁</h5>
    <RouterLink to="/">首頁</RouterLink> |
    <RouterLink to="/products">產品頁面</RouterLink> |
    <RouterLink to="/product">產品詳細頁面</RouterLink> |
    <RouterLink to="/cart">購物車頁面</RouterLink> |
    <RouterLink to="/admin/products">後台商品列表</RouterLink>
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

<template>
  <div>
    所有產品頁面
    <div class="container">
        <div class="mt-4">
          <!-- 產品Modal -->
          <user-product-modal ref="userProductModal" :temp-product="tempProduct" @add-to-cart="addToCart"></user-product-modal>
          <!-- 產品Modal -->
          <!-- <VueLoading :active="isLoading"></VueLoading> -->
          <table class="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in products" :key="item.id">
                <td style="width: 200px">
                  <div style="height: 100px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                </td>
                <td>
                  {{ item.title}}
                </td>
                <td>
                  <div class="h5">{{ item.price }} 元</div>
                  <del class="h6">原價 {{ item.origin_price }} 元</del>
                  <div class="h5">現在只要 {{ item.price }} 元</div>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)">
                      <i class="fas fa-spinner fa-pulse" v-if="loadingItem === item.id"></i>
                      查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger"  @click="addToCart(item.id)">
                      <i class="fas fa-spinner fa-pulse" v-if="loadingItem === item.id"></i>
                      加到購物車
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      isLoading: true,
      products: [],
      cart: {
      },
      qty: 1,
      tempProduct: {},
      productModal: null,
      loadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''

      }
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      this.isLoading = true
      const url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/products`
      axios.get(url)
        .then(res => {
          this.isLoading = false
          this.products = res.data.products
        })
        .catch(err => {
          this.isLoading = false
          alert(err.response.data.message)
        })
    },
    getProduct (productId) {
      this.loadingItem = productId
      const url = `${this.apiUrl}/api/${this.apiPath}/product/${productId}`
      axios.get(url)
        .then(res => {
          this.loadingItem = ''
          this.tempProduct = res.data.product
          this.$refs.userProductModal.openModal()
        })
        .catch(err => {
          alert(err.response.data.message)
          this.loadingItem = ''
        })
    }
  }
}
</script>

<style scoped>
</style>

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
          <paginationArea :pagination="pagination" @emit-pages="getProducts"></paginationArea>
          <!-- <paginationArea :pagination="pagination"></paginationArea> -->
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserProductModal from '@/components/UserProductModal.vue'
import paginationArea from '@/components/paginationArea.vue'
export default {
  components: {
    UserProductModal,
    paginationArea
  },
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
      pagination: {}
      // form: {
      //   user: {
      //     name: '',
      //     email: '',
      //     tel: '',
      //     address: ''
      //   },
      //   message: ''

      // }
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    getProducts (page) {
      this.isLoading = true
      console.log(page)
      const url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/products?page=${page || 1}`
      axios.get(url)
        .then(res => {
          this.isLoading = false
          this.pagination = res.data.pagination
          console.log(this.pagination)
          this.products = res.data.products
        })
        .catch(err => {
          this.isLoading = false
          alert(err.response.data.message)
        })
    },
    getProduct (productId) {
      this.loadingItem = productId
      const url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/product/${productId}`
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
    },
    addToCart (id, qty = 1) {
      this.loadingItem = id
      console.log(id)
      const url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/cart`
      axios.post(url, { data: { product_id: id, qty } })
        .then(res => {
          this.loadingItem = ''
          alert(res.data.message)
          this.$refs.userProductModal.hideModal()
          this.getCart()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>

<style scoped>
</style>

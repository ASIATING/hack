<template>
  <div>
    <div class="text-end">
            <button class="btn btn-outline-danger" type="button" @click="clearCart()">清空購物車</button>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cart.carts">
                <tr v-for="(item) in cart.carts" :key="item">
                  <td>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                      <i class="fas fa-spinner fa-pulse" v-if="loadingItem === item.id"></i>
                      <div v-else>x</div>
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <div class="input-group mb-3">
                        <input
                             min="1" type="number" class="form-control" v-model.number="item.qty" @blur="updateCart(item)">
                        <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                    <small class="text-success" v-if="cart.final_total !== cart.total" >折扣價：</small>
                    {{ item.final_total }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ cart.total  }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="my-5 row justify-content-center">
          <v-form @submit="createOrder" ref="form" class="col-md-6" v-slot="{ errors }" >
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <v-field id="email" name="email" type="email" class="form-control"
                       :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required" v-model="form.user.email"
                      ></v-field>
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                       placeholder="請輸入姓名" rules="required" v-model="form.user.name"></v-field>
              <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <v-field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                       placeholder="請輸入電話"  rules="required|min:8|max:10" v-model="form.user.tel"></v-field>
              <error-message name="電話" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                       placeholder="請輸入地址" rules="required"  v-model="form.user.address"></v-field>
              <error-message name="地址" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-danger" :disabled="cart.total === 0 || loadingItem === 'createOrder'"
                      >
              <i class="fas fa-spinner fa-pulse" v-if="loadingItem === 'createOrder'"></i>
                送出訂單
              </button>
            </div>
          </v-form>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      apiUrl: import.meta.env.VITE_API,
      apiPath: import.meta.env.VITE_PATH,
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
    this.getCart()
  },
  methods: {
    getCart () {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart`
      axios.get(url)
        .then(res => {
          console.log(res)
          this.cart = res.data.data
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    addToCart (id, qty = 1) {
      this.loadingItem = id
      const url = `${this.apiUrl}/api/${this.apiPath}/cart`
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
    },
    updateCart (data) {
      this.loadingItem = data.id
      const url = `${this.apiUrl}/api/${this.apiPath}/cart/${data.id}`
      axios.put(url, { data: { product_id: data.product_id, qty: data.qty } })
        .then(res => {
          this.loadingItem = ''
          alert(res.data.message)
          this.getCart()
        })
        .catch(err => {
          this.loadingItem = ''
          alert(err.response.data.message)
        })
    },
    removeCartItem (id) {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart/${id}`
      this.loadingItem = id
      axios.delete(url)
        .then(res => {
          this.loadingItem = ''
          alert(res.data.message)
          this.getCart()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    clearCart () {
      const url = `${this.apiUrl}/api/${this.apiPath}/carts`
      axios.delete(url)
        .then(res => {
          alert(res.data.message)
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

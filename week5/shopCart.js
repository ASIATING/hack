import userProductModal from './userProductModal.js';
// import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});


const app = Vue.createApp({
    components: {
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
      },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common.Authorization = token;
        this.checkLogin()
        this.getCart();
        
    },
    data() {
        return {
            isLoding:true,
            products: [],
            apiUrl:'https://vue3-course-api.hexschool.io/v2', // 請加入站點
            apiPath:'ting-hexschool', // 請加入個人 API Path
            cart:{
            },
            qty:1,
            tempProduct:{},
            productModal:null,
            loadingItem:'',
            form:{
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                  },
                message:'',

            }
         
        }
    },
    
    methods: {
        checkLogin(){
            axios.post(`${this.apiUrl}/api/user/check`)
                .then(res => {
                    this.getProducts();
                })
                .catch(err => {
                    window.location.assign("./login.html")
                })
        },
        getProducts(){
            const url = `${this.apiUrl}/api/${this.apiPath}/products`;
            axios.get(url)
                .then(res => {
                    this.products = res.data.products
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
        },
        getProduct(productId){
            this.loadingItem = productId;
            const url = `${this.apiUrl}/api/${this.apiPath}/product/${productId}`;
            axios.get(url)
                .then(res => {
                  this.loadingItem = '';
                  this.tempProduct = res.data.product
                  this.$refs.userProductModal.openModal();
                })
                .catch(err => {
                    alert(err.response.data.message);
                    this.loadingItem = '';
                })
        },
        createOrder(){
            this.loadingItem = 'createOrder'
            const order = this.form;
            const url = `${this.apiUrl}/api/${this.apiPath}/order`;
            axios.post(url,{data:order})
                .then(res => {
                  this.$refs.form.resetForm();
                  this.loadingItem = '';
                })
                .catch(err => {
                    alert(err.response.data.message);
                    this.loadingItem = '';
                })
        },
        getCart() {
            const url = `${this.apiUrl}/api/${this.apiPath}/cart`;
            axios.get(url)
                .then(res => {
                  this.cart = res.data.data
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
           
          },
          addToCart(id,qty=1){
            this.loadingItem = id;
            const url = `${this.apiUrl}/api/${this.apiPath}/cart`;
            axios.post(url,{data:{product_id: id ,qty} })
                .then(res => {
                  this.loadingItem = '';
                  alert(res.data.message);
                  this.$refs.userProductModal.hideModal();
                  this.getCart();
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
          },
          updateCart(data) {
            this.loadingItem = data.id;
            const url = `${this.apiUrl}/api/${this.apiPath}/cart/${data.id}`;
            axios.put(url,{data:{product_id: data.product_id ,qty:data.qty} })
            .then(res => {
              this.loadingItem = '';
              alert(res.data.message);
              this.getCart();
            })
            .catch(err => {
                this.loadingItem = '';
                alert(err.response.data.message);
            })
          },
          removeCartItem(id){
            const url = `${this.apiUrl}/api/${this.apiPath}/cart/${id}`;
            this.loadingItem = id;
            axios.delete(url)
                .then(res => {
                  this.loadingItem = '';
                  alert(res.data.message);
                  this.getCart();
                })
                .catch(err => {
                    alert(err.response.data.message);
                })

          },
          clearCart(){
            const url = `${this.apiUrl}/api/${this.apiPath}/carts`;
            axios.delete(url)
                .then(res => {
                  alert(res.data.message);
                  this.getCart();
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
          }

    },
    


});
app.component('userProductModal', userProductModal)
app.mount('#app')
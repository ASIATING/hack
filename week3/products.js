import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const app = createApp({
   mounted() {
    // 確認登入狀況如沒有登入跳回login.html
    console.log("mounted")
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
    axios.defaults.headers.common['Authorization'] = token;
    console.log(token)
    this.checkLogin();



   },
   data() {
    return {
        tempProduct:{}, 
        products:[],
        url:'https://vue3-course-api.hexschool.io/v2', // 請加入站點
        path:'ting-hexschool', // 請加入個人 API Path
    }
   },
   methods: {
    checkLogin(){
        axios.post(`${this.url}/api/user/check`)
            .then(res => {
                console.log(res.data)
                this.getProduct();

            })
            .catch(err => {
                console.dir(err)
            })
    },
    getProduct(){
        console.log(112)
        axios.get(`${this.url}/api/${this.path}/products/all`)
            .then(res => {
                console.log(res.data)
                this.products = res.data.products
            })
            .catch(err => {
                console.dir(err)
            })
    },
    show(item){
        this.tempProduct = item
        console.log(this.tempProduct)
    }

   },

})

app.mount('#app')
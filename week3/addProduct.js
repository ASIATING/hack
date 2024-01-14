import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


createApp({
  data() {
    return {
     isLoding:true,
     productModal:null,
     delProductModal:null,
     apiUrl: 'https://vue3-course-api.hexschool.io/v2',
     apiPath: 'ting-hexschool',
     products: [],
     isNew:true,
     tempProduct: {
       imagesUrl: [],
      },
    }
  },
  mounted() {
        this.productModal = new bootstrap.Modal(document.getElementById('productModal'), {
        keyboard: false
      })
       this.delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false
      })
    //取出token
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
    axios.defaults.headers.common['Authorization'] = token;
    console.log(token)
    this.checkLogin();

  },
  methods: {
    checkLogin(){
        axios.post(`${this.apiUrl}/api/user/check`)
            .then(res => {
                console.log(res.data)
                this.getProduct();
            })
            .catch(err => {
                console.dir(err)
            })
    },
    getProduct(){
        this.isLoding = true;
        const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
        axios.get(url)
            .then(res => {
                console.log(res.data)
                this.products = res.data.products
                this.isLoding = false;
            })
            .catch(err => {
                console.dir(err)
            })
    },

    openModal(isNew, item) {
        if(isNew === 'new'){
            this.isNew = true;
            this.tempProduct = {
                imagesUrl: [],
              };
            this.productModal.show()
        }else if(isNew === 'edit'){
            this.isNew = false;
            console.log(this.isNew)
            this.tempProduct = {...item}
            this.productModal.show()
            console.log(this.tempProduct)
        }else if(isNew === 'delete'){
            this.isNew = false;
            this.tempProduct = { ...item };
            this.delProductModal.show()
        }
    },
    submitBtn(){
        if(this.isNew){
            console.log("this.isNew",this.isNew)
            axios.post(`${this.apiUrl}/api/${this.apiPath}/admin/product/`,{ data: this.tempProduct })
            .then(res => {
                console.log(res.data)
                this.productModal.hide()
                this.getProduct();
            })
            .catch(err => {
                console.dir(err)
            })
        }else{
            axios.put(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`,{ data: this.tempProduct })
                .then(res => {
                    console.log(res.data)
                    this.productModal.hide()
                    this.getProduct();
                })
                .catch(err => {
                    console.dir(err)
                })

        }
    },
    deletBtn(){
        axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`,{ data: this.tempProduct })
        .then(res => {
            console.log(res.data)
            this.delProductModal.hide()
            alert('刪除成功')
            this.getProduct();
        })
        .catch(err => {
            console.dir(err)
        })
    },
    addImg(){
        this.tempProduct.imagesUrl = ['']
    }

   
  },
}).mount('#app');
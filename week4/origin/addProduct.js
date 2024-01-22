import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


const app =createApp({
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
      pagination:{},
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
      console.log(token)
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();

  },
  methods: {
    checkLogin(){
        axios.post(`${this.apiUrl}/api/user/check`)
            .then(res => {
                this.getProduct();
            })
            .catch(err => {
                console.dir(err)
                window.location.assign("./login.html")
            })
    },
    getProduct(page){
      // alert("getProduct")
        this.isLoding = true;
        const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page || 1}`;
        axios.get(url)
            .then(res => {
                this.products = res.data.products
                this.pagination = res.data.pagination
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
            this.tempProduct = {...item}
            this.productModal.show()
        }else if(isNew === 'delete'){
            this.isNew = false;
            this.tempProduct = { ...item };
            this.delProductModal.show()
        }
    },
    handleModalClosed() {
      this.productModal.hide();
      this.delProductModal.hide();
      // Additional logic after the product modal is closed
    },
   
  },
  
})




    
  // 分頁元件
  app.component('pagination', {
    template: '#pagination',
    props: ['pagination'],
    methods: {
      emitPage(emitEvent) {
        this.$emit('emit-page', emitEvent);
      }
    },
  });
 

  // 編輯元件
  app.component('productModal', {
      template: '#productModal',
      data(){
          return {
            productModal:null,
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'ting-hexschool',
          }
      },
      mounted(){
        this.productModal = new bootstrap.Modal(document.getElementById('productModal'), {
          keyboard: false
        })
      },
      props: ['tempProduct', 'isNew'],
      methods: {
        submitBtn(){
          if(this.isNew){
              axios.post(`${this.apiUrl}/api/${this.apiPath}/admin/product/`,{ data: this.tempProduct })
              .then(res => {
                  this.productModal.hide()
                  this.$emit('modal-closed');
                  this.$emit('update');
              })
              .catch(err => {
                  console.dir(err)
              })
          }else{
              axios.put(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`,{ data: this.tempProduct })
                  .then(res => {
                      this.productModal.hide()
                      this.$emit('modal-closed');
                      this.$emit('update');
                  })
                  .catch(err => {
                      console.dir(err)
                  })
  
          }
      },
      addImg(){
        this.tempProduct.imagesUrl = ['']
      },
      },
  });

  // 刪除元件
  app.component('delProductModal', {
    template: '#delProductModal',
    props: ['tempProduct'],
    data(){
        return {
          delProductModal:null,
          apiUrl: 'https://vue3-course-api.hexschool.io/v2',
          apiPath: 'ting-hexschool',
        }
    },
    mounted(){
      this.delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false
      })
    },
    methods: {
      deletBtn(){
        axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`,{ data: this.tempProduct })
        .then(res => {
            console.log(res.data)
            this.delProductModal.hide()
            alert('刪除成功')
            this.$emit('modal-closed');
            this.$emit('update');
        })
        .catch(err => {
            console.dir(err)
        })
    },
    }
  })

app.mount('#app')
export default {
    props:['tempProduct'],
    
    template: '#userProductModal',
    data() {
        return{
            oductModal:null,
            qty: 1,
        }
       
    },
    mounted() {
        this.productModal =  new bootstrap.Modal(this.$refs.modal, {
        keyboard: false,
        backdrop: 'static'
      });
        //   this.productModal.show()
    },

 
    methods: {
      openModal(){
        this.productModal.show()
      },
      hideModal(){
        this.productModal.hide()
      }
    },
}
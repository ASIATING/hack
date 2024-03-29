import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = createApp({
    mounted() {
         console.log('請登入')
    },
data() {
    return {
        user: {
        username: '',
        password: '',
        },
        url:'https://vue3-course-api.hexschool.io/v2', // 請加入站點
        path:'ting-hexschool', // 請加入個人 API Path,
        
    }

}, 
methods: {
    
login() {
    console.log(this.user)
    axios.post(`${this.url}/admin/signin`,this.user)
        .then(res => {
            console.log(res.data)
            const {token,expired} = res.data
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
            window.location.assign("./shopCart.html")
        })
        .catch(err => {
            console.dir(err)
        })

}


},
})

app.mount('#app')


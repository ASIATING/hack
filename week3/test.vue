 
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
<script>
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
</script>
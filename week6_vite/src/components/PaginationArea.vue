<template>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled':pagination.current_page===1}" >
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage(pagination.current_page-1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="(page,index) in pagination.total_pages" class="page-item" :class="{'active':page===pagination.current_page}" :key="index"><a class="page-link" href="#" @click.prevent="updatePage(page)">{{index+1}}</a></li>
          <li class="page-item" :class="{'disabled':pagination.current_page===pagination.total_pages}">
            <a class="page-link" href="#" aria-label="Next"  @click.prevent="updatePage(pagination.current_page+1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      {{pagination.current_page}}
      {{pagination.total_pages+"test"}}
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    updatePage (page) {
      console.log('props', page)
      this.$emit('emitPages', page)
    }
  }

}
</script>

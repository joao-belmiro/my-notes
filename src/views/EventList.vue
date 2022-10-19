
<template>
  <div class="event-list">
    <Card-note v-for="(c, index) in fetchedNotes" :key="index"
    :title="c.title"
    :date="c.creationDate"
    :description="c.description"
    :pinned="c.pinned"
    :id="c.id"
    @deleted="hasDeleted"/>
  </div>
</template>

<script>
import CardNote from '../components/CardNote.vue'
export default {
  components: {
    CardNote
  },
  data () {
    return {
      fetchedNotes: [],
      date: ''
    }
  },
  watch: {
    async '$route.params.id' (day, dayPast) {
      this.date = atob(day)
      console.log(this.date)
      this.fetchedNotes = await this.fetchNotesFomDay()
    }
  },
  async created () {
    this.fetchedNotes = await this.fetchNotesFomDay()
  },
  mounted () {
    if (this.$route.name === 'dayNotes') {
      this.date = atob(this.$route.params.id)
    }
  },
  methods: {
    hasDeleted (id) {
      this.fetchedNotes = this.fetchedNotes.filter(note => note.id !== id)
    },
    fetchNotesFomDay () {
      return new Promise((resolve, reject) => {
        const trans = this.$store.state.db.transaction(['notes'], 'readonly')
        trans.oncomplete = e => {
          resolve(notes)
        }

        const store = trans.objectStore('notes')
        const notes = []

        store.openCursor().onsuccess = e => {
          const cursor = e.target.result
          if (cursor) {
            if (cursor.value.creationDate.indexOf(this.date) !== -1) {
              notes.push(cursor.value)
            }
            cursor.continue()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .event-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>

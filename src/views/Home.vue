<template>
  <div>
    <Header />
    <div class="n-wrapper">
      <div class="c-wrapper">
        <div class="n-note-wrapper">
          <router-link :to="{ name: 'novaNota' }">
            <button>
              <img
                src="@/assets/add_circle.svg"
                width="30px"
                height="30px"
                alt="add_circle"
              />Nova Nota
            </button>
          </router-link>
        </div>
        <Calendar />
      </div>
      <div class="e-wrapper">
        <Header-Note :title="headerTitle" />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Calendar from '../components/Calendar.vue'
import HeaderNote from '../components/HeaderNote.vue'
export default {
  name: 'Home',
  components: {
    Header,
    Calendar,
    HeaderNote
  },
  data () {
    return {
      headerTitle: null
    }
  },
  async mounted () {
    this.$store.commit('setDb', await this.connectDB())
  },
  created () {
    this.headerTitle = this.changeTItleHeader(this.$route.name)
  },
  watch: {
    '$route.name' (routeName) {
      this.headerTitle = this.changeTItleHeader(routeName)
    }
  },
  methods: {
    changeTItleHeader (routeName) {
      const routesTitles = {
        Home: 'Minhas notas',
        novaNota: 'Nova nota',
        dayNotes: 'Notas do dia',
        editarNota: 'Editando nota'
      }

      return routesTitles[routeName]
    },
    logerr (err) {
      console.log(err)
    },
    connectDB () {
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('db-notes', 1)
        request.onerror = (e) => {
          console.log('Error opening db', e)
          reject(e)
        }

        request.onsuccess = (e) => {
          resolve(e.target.result)
        }

        request.onupgradeneeded = (e) => {
          console.log('onupgradeneeded')
          const db = e.target.result
          const objectStore = db.createObjectStore('notes', {
            autoIncrement: true,
            keyPath: 'id'
          })
          console.log(objectStore)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.n-wrapper {
  display: flex;
  flex-direction: row;
  height: 90vh;
  .c-wrapper {
    height: 100%;
    padding: 1rem;
    width: 25%;
    .n-note-wrapper {
      padding-bottom: 1rem;
      display: flex;
      flex-direction: row-reverse;
      a {
        text-decoration: none;
        button {
          background-color: $primary;
          color: $background;
          outline: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          height: 50px;
          width: 200px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: normal;
          letter-spacing: 2px;

          &:hover {
            opacity: 0.8;
          }

          img {
            margin-right: 12px;
          }
        }
      }
    }
  }

  .e-wrapper {
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-left: 1px solid $text-dark;
    padding: 1rem;
    width: 75%;
  }
}
</style>

<template>
  <div :class="['card-note-container', { 'pinned-note': pinned }]">
    <div class="header-card">
      <h3>{{ title }}</h3>
      <div class="c-btn">
        <button @click="editNote">
          <img width="25" height="25" src="@/assets/edit.svg" alt="" />
        </button>
        <button @click="deleteNote">
          <img
            width="25"
            height="25"
            src="@/assets/delete_forever.svg"
            alt=""
          />
        </button>
      </div>
    </div>
    <p class="date-content">{{ date | formatDate }}</p>
    <hr />
    <div class="card-note-desc" v-html="description"></div>
  </div>
</template>

<script>
export default {
  filters: {
    formatDate: function (data) {
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }).format(new Date(data))
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    pinned: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    editNote () {
      this.$router.push({ name: 'editarNota', params: { noteId: this.id } })
    },
    async deleteNote () {
      return new Promise((resolve, reject) => {
        const trans = this.$store.state.db.transaction(['notes'], 'readwrite')
        trans.oncomplete = (e) => {
          resolve()
        }

        const store = trans.objectStore('notes')
        store.delete(this.id)
        this.$emit('deleted', this.id)
      })
    }
  }
}
</script>

<style lang="scss">
.pinned-note {
  border-left: 8px solid $contrast !important;
}
.card-note-container {
  padding: 1rem;
  border-radius: 8px;
  background-color: $background;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-left: 8px solid $primary;
  .header-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    h3 {
      margin-bottom: 10px;
      letter-spacing: 2px;
    }
    .c-btn {
      display: flex;
      flex-direction: row;
      column-gap: 16px;

      button {
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 35px;
        width: 35px;
        cursor: pointer;
        outline: none;
        border: 0;
        border-radius: 50%;

        &:hover {
          background-color: rgba(208, 210, 220, 0.5);
        }
      }
    }
  }
  .date-content {
    margin-bottom: 10px;
    letter-spacing: 2px;
  }

  .card-note-desc {
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    ul {
      padding: 1.3rem;
    }
    p,
    h1,
    h3 {
      margin: 16px 0;
    }
    table {
      border-spacing: 0px !important;
      th {
        background-color: $text-dark;
        color: #fff;
        letter-spacing: 2px;
        font-weight: normal;
        text-align: left;
      }
      td,
      th {
        padding: 0.5rem;
        border: 1px solid rgb(208, 210, 220);
      }
    }
  }
}
</style>

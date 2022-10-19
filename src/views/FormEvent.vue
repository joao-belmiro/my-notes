<template>
<form @submit.prevent="saveData()">
  <div class="form-event">
    <div class="form-field">
      <label for="title">Titulo da nota</label>
      <input type="text" name="title" id="title" v-model="title" required/>
    </div>
    <div class="form-field">
      <label for="dateEvent">Data de Criação </label>
      <input
        v-model="creationDate"
        type="datetime-local"
        name="dateEvent"
        id="dateEvent"
        required
      />
    </div>
    <div class="form-field">
      <label for="editor">Descrição</label>
    <vue-editor
      id="editor"
      class="editor-content"
      v-model="description"
      ></vue-editor>
    </div>
    <div class="check-field">
      <input type="checkbox" required name="pinned" v-model="pinned" id="pinned" />
      <label for="pinned">Prioridade</label>
    </div>
    <div class="submit-form">
      <button type="submit" class="save">
        <img
          src="@/assets/save.svg"
          width="30px"
          height="30px"
          alt="add_circle"
        />
        Salvar
      </button>
      <button class="cancel">
        <img
          src="@/assets/cancel.svg"
          width="30px"
          height="30px"
          alt="add_circle"
        />
        cancelar
      </button>
    </div>
  </div>
  </form>
</template>

<script>

export default {
  data () {
    return {
      id: null,
      creationDate: null,
      title: null,
      pinned: false,
      description: 'ola'
    }
  },
  async created () {
    if (this.$route.name === 'editarNota') {
      const note = await this.getById(this.$route.params.noteId)
      this.id = note.id
      this.creationDate = note.creationDate
      this.pinned = note.pinned
      this.description = note.description
      this.title = note.title
    }
  },
  methods: {
    logerr (err) {
      console.log(err)
    },
    saveData () {
      const editing = this.$route.name === 'editarNota'
      const obj = {
        creationDate: this.creationDate,
        title: this.title,
        pinned: this.pinned,
        description: this.description
      }
      if (editing) obj.id = this.id
      var transaction = this.$store.state.db.transaction('notes', 'readwrite')
      var objectStore = transaction.objectStore('notes')
      var objectStoreRequest = editing ? objectStore.put(obj) : objectStore.add(obj)
      objectStoreRequest.onerror = this.logerr
      objectStoreRequest.onsuccess = function () {
        alert(editing ? 'nota alterada com sucesso !! :)' : 'nota adicionada com sucesso !! :)')
      }
    },
    getById (id) {
      return new Promise((resolve, reject) => {
        const trans = this.$store.state.db.transaction(['notes'], 'readonly')
        trans.oncomplete = e => {
          resolve(note.result)
        }
        const note = trans.objectStore('notes').get(id)
      })
    }
  }
}
</script>

<style lang="scss">
.form-event {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;

  .check-field {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    height: 50px;

    input[type="checkbox"] {
      height: 18px;
      width: 18px;
      padding: 5px;
      accent-color: $primary;
      &:checked ~ label {
        color: $primary;
      }
    }
    label {
      font-size: 1rem;
      letter-spacing: 2px;
      font-weight: 600;
      color: $text-dark;
    }
  }
  .form-field {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.5rem;

    label {
      font-size: 1rem;
      letter-spacing: 2px;
      font-weight: 600;
      color: $text-dark;
    }

    input {
      height: 50px;
      padding: 1rem;
      font-size: 1rem;
      border-radius: 6px;
      border: 3px solid $text-dark;

      &:focus-within {
        outline: none;
        border: 3px solid $primary;
      }
    }
  }
  .editor-content {
    border: 3px solid $text-dark;
    border-radius: 6px;

    .ql-container {
      height: auto;
    }
    .ql-tooltip, .ql-editing {
      left: 0px !important;
    }
  }

  .submit-form {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    gap: 20px;

    button {
      color: $background;
      outline: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 50px;
      width: 150px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: normal;
      letter-spacing: 2px;
      gap: 15px;
      &:hover {
        opacity: 0.8;
      }
    }
    .save {
      background-color: $primary;
    }
    .cancel {
      background-color: rgb(201, 198, 198);
    }
  }
}
</style>

<template>
  <AddEditNote v-model="newNote" ref="addEditNoteRef">
    <template #button>
      <button
        :disabled="!newNote"
        class="button is-link is-danger"
        @click.prevent="addNote"
      >
        Add New Note
      </button>
    </template>
  </AddEditNote>
  <progress class="progress is-small is-primary" max="100" v-if="!notesStore.notesLoaded"/>
  <template v-else>
 <SingleNote v-for="note in notes" :key="note.id" :note="note" />
</template>

<div
    class="has-text-centered py-6 is-size-4 has-text-grey-light is-family-monospace"
    v-if="!notes.length && notesStore.notesLoaded"
  >
    No Notes Added here yet!!
  </div>
</template>

<script setup>
import SingleNote from "../components/Notes/SingleNote.vue";
import {  ref } from "vue";
import { useNotesStore } from "../stores/NotesStore";
import { storeToRefs } from "pinia";
import AddEditNote from "../components/Notes/AddEditNote.vue";
 import {useCharactersLimit} from "../components/composable/useCharactersLimit"

 const notesStore = useNotesStore();
const addEditNoteRef = ref(null);
const newNote = ref("");

const { notes } = storeToRefs(notesStore);


const addNote = () => {
  if (newNote.value.trim() === "") {
    return;
  }
  notesStore.addNote(newNote.value);
  newNote.value = "";
  if (addEditNoteRef.value) {
    addEditNoteRef.value.focusTextarea();
  }
};
useCharactersLimit(newNote)

</script>

<style scoped>
.label {
  color: darkcyan;
  display: block;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
}
</style>

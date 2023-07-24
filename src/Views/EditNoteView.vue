<template>
  <AddEditNote
    v-model="noteContent"
    ref="addEditNoteRef"
    bgColor="link"
    lable="Edit Note"
    placeholder="EditNote"
  >
    <template #button>
      <button class="button" @click.prevent="$router.back()">Cancel</button>
      <!-- <router-link class="button" :to="{ name: notes }">Cancel</router-link> -->
      <button
        :disabled="!noteContent"
        class="button is-link"
        @click.prevent="onNoteSave"
      >
        Save Note
      </button>
    </template>
  </AddEditNote>
</template>

<script setup>
import AddEditNote from "../components/Notes/AddEditNote.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useNotesStore } from "../stores/NotesStore";

const router = useRouter();
const route = useRoute();

const notesStore = useNotesStore();
const noteContent = ref("");
noteContent.value = notesStore.getNoteContentById(route.params.id);
const onNoteSave = () => {
  notesStore.updateNote(route.params.id, noteContent.value);
  router.push({name:'notes'});
};
</script>

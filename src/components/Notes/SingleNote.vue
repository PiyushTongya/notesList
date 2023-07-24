<template>
  <div class="card mb-5 mt-3">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light">
          <small class="column">{{ formattedDate }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <router-link
        :to="{ name: 'editNote', params: { id: note.id } }"
        class="card-footer-item"
        >Edit</router-link
      >
      <a href="#" class="card-footer-item" @click.prevent="handleDeleteClick"
        >Delete</a
      >
    </footer>
    <DeleteModal
      v-if="modals.deleteModal"
      v-model="modals.deleteModal"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
  import { useDateFormat } from '@vueuse/core';
import { defineProps, computed, reactive } from "vue";
import { useNotesStore } from "../../stores/NotesStore";
import DeleteModal from "./DeleteModal.vue";
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});
const notesStore = useNotesStore();
// const emit =defineEmits(['onDeleteClicked'])
const formattedDate = computed(() => {
    console.log(props.note.date);
    const date = new Date(+props.note.date);
    const formatDate = useDateFormat(date, 'MM-DD-YYYY @ HH:mm');
    return formatDate.value;
  });

const characterLength = computed(() => {
  const noteLength = props.note.content.length;
  const description = noteLength > 1 ? "characters" : "character";
  return `${noteLength} ${description}`;
});
const handleDeleteClick = () => {
  modals.deleteModal = true;
  // notesStore.deleteNote(props.note.id)
  // emit('onDeleteClicked',props.note.id)
};

const modals = reactive({
  deleteModal: false,
});
</script>

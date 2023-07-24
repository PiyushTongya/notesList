<template>
  <div class="my-4 py-4" :class="`has-background-${bgColor}-dark`">
    <div class="field">
      <label class="label has-text-white" v-if="label">{{ label }}</label>
      <div class="control">
        <textarea
          class="textarea"
          ref="textareaRef"
          :placeholder="placeholder"
          :value="modelValue"
          v-autofocus
          @input="$emit('update:modelValue', $event.target.value)"
          maxlength="100"
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right mr-3">
      <div class="control">
        <!-- <button :disabled="!newNote" class="button is-link" @click.prevent="addNote">Add Note</button> -->
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, defineExpose, ref } from "vue";
import { vAutofocus } from "../directives/vAutoFocus";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "light",
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "Add Note...  ",
  },
});
const emit = defineEmits(["update:modelValue"]);
const textareaRef = ref(null);
const focusTextarea = () => {
  textareaRef.value.focus();
};
defineExpose({
  focusTextarea,
});
</script>

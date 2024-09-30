<template>
  <VForm ref="form" class="tce-root" @submit.prevent="submit">
    <div class="px-2 my-4">{{ data.question }}</div>
    <VTextarea
      v-model="response"
      :readonly="submitted"
      :rules="[requiredRule]"
      class="my-3"
      label="Answer"
      rows="3"
      auto-grow
    />
    <VAlert
      v-if="submitted"
      :text="userState.correct"
      class="mb-3"
      rounded="lg"
      type="info"
      variant="tonal"
    />
    <div class="d-flex justify-end">
      <VBtn v-if="!submitted" type="submit" variant="tonal">Submit</VBtn>
      <VBtn v-else variant="tonal" @click="submitted = false">Try Again</VBtn>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElementData } from '@tailor-cms/ce-text-response-manifest';

const props = defineProps<{ id: number; data: ElementData; userState: any }>();
const emit = defineEmits(['interaction']);

const form = ref<HTMLFormElement>();
const submitted = ref('isSubmitted' in (props.userState ?? {}));
const response = ref<string[]>(props.userState?.response);

const submit = async () => {
  const { valid } = await form.value?.validate();
  if (valid) emit('interaction', { response: response.value });
};

const requiredRule = (val: string | boolean | number) => {
  return !!val || 'You have to enter your answer.';
};

watch(
  () => props.userState,
  (state = {}) => {
    response.value = state.response;
    submitted.value = 'isSubmitted' in state;
  },
  { deep: true },
);
</script>

<style scoped>
.tce-root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>

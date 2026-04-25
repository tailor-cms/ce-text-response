<template>
  <div class="tce-text-response">
    <div class="text-title-small mb-2">Enter your answer:</div>
    <VTextarea
      v-model="answer"
      :readonly="isSubmitted"
      :rules="[(val: string) => !!val || 'You have to enter your answer.']"
      class="my-3"
      label="Answer"
      rows="3"
      variant="outlined"
      auto-grow
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Element } from '@tailor-cms/ce-text-response-manifest';

const props = defineProps<{ element: Element; userState: any }>();
const emit = defineEmits<{
  'user-input': [data: { response: string }];
}>();

const isSubmitted = ref(!!props.userState?.isSubmitted);
const answer = ref<string>(props.userState?.response ?? '');

watch(answer, (val) => emit('user-input', { response: val }));

watch(
  () => props.userState,
  (state = {}) => {
    answer.value = state.response ?? '';
    isSubmitted.value = !!state.isSubmitted;
  },
  { deep: true },
);
</script>

<style lang="scss" scoped>
.tce-text-response {
  text-align: left;
}
</style>

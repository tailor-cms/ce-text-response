<template>
  <QuestionContainer
    :data="element.data"
    :is-correct="userState.isCorrect"
    :is-graded="isGraded"
    :is-submitted="isSubmitted"
    allowed-retake
    @retry="isSubmitted = false"
    @submit="submit"
  >
    <div class="text-subtitle-2 mb-2">Enter your answer:</div>
    <VTextField
      v-model="answer"
      :readonly="isSubmitted"
      :rules="[(val: string) => !!val || 'You have to enter your answer.']"
      bg-color="white"
      class="my-3"
      label="Answer"
      rows="3"
      variant="outlined"
      auto-grow
    />
  </QuestionContainer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Element } from '@tailor-cms/ce-text-response-manifest';
import { QuestionContainer } from '@tailor-cms/lx-components';

const props = defineProps<{ element: Element; userState: any }>();
const emit = defineEmits(['interaction']);

const isSubmitted = ref(!!props.userState.isSubmitted);
const answer = ref<string>(props.userState?.response);

const isGraded = computed(() => 'isCorrect' in props.userState);

const submit = () => emit('interaction', { response: answer.value });

watch(
  () => props.userState,
  (state = {}) => {
    answer.value = state.response;
    isSubmitted.value = !!state.isSubmitted;
  },
  { deep: true },
);
</script>

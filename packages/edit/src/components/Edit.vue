<template>
  <QuestionContainer
    v-bind="{
      elementData,
      embedElementConfig,
      isDisabled,
    }"
    :show-feedback="false"
    @update="emit('update', $event)"
  >
    <template v-if="elementData.isGradable">
      <div class="text-subtitle-2 mb-2">Answer</div>
      <VTextarea
        :clearable="!isDisabled"
        :model-value="elementData.correct"
        :readonly="isDisabled"
        :rules="[(val: string) => !!val || 'Answer is required']"
        class="my-3"
        rows="3"
        variant="outlined"
        auto-grow
        @update:model-value="emit('update', { correct: $event })"
      />
    </template>
  </QuestionContainer>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue';
import { Element } from '@tailor-cms/ce-text-response-manifest';
import { QuestionContainer } from '@tailor-cms/core-components';

const props = defineProps<{
  element: Element;
  embedElementConfig: any[];
  isFocused: boolean;
  isDisabled: boolean;
}>();
const emit = defineEmits(['save', 'update']);

const elementData = computed(() => props.element.data);
</script>

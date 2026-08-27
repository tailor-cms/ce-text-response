<template>
  <div class="tce-text-response">
    <template v-if="elementData.isGradable">
      <div class="mb-3">
        <VTextarea
          :clearable="!isReadonly"
          :model-value="elementData.correct"
          :readonly="isReadonly"
          :rules="[(val: string) => !!val || 'Answer is required']"
          density="comfortable"
          label="Correct answer"
          placeholder="Answer..."
          rows="3"
          variant="outlined"
          auto-grow
          @update:model-value="emit('update', { correct: $event })"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type {
  Element,
  ElementData,
} from '@tailor-cms/ce-text-response-manifest';
import { computed } from 'vue';

const props = defineProps<{
  element: Element;
  embedElementConfig: any[];
  isDragged: boolean;
  isFocused: boolean;
  isReadonly: boolean;
}>();

const emit = defineEmits<{
  update: [data: Partial<ElementData>];
}>();

const elementData = computed(() => props.element.data);
</script>

<style lang="scss" scoped>
.tce-text-response {
  text-align: left;
}
</style>

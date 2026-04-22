<template>
  <div class="tce-text-response">
    <template v-if="elementData.isGradable">
      <div class="text-title-small mb-2">Answer</div>
      <VTextarea
        :clearable="!isReadonly"
        :model-value="elementData.correct"
        :readonly="isReadonly"
        :rules="[(val: string) => !!val || 'Answer is required']"
        class="my-3"
        rows="3"
        variant="outlined"
        auto-grow
        @update:model-value="emit('update', { correct: $event })"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type {
  Element,
  ElementData,
} from '@tailor-cms/ce-text-response-manifest';

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

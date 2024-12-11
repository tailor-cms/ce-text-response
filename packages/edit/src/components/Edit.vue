<template>
  <QuestionContainer
    v-bind="{
      allowedEmbedTypes,
      elementData,
      isDirty,
      isDisabled,
      isGradeable,
    }"
    :show-feedback="false"
    @cancel="updateData(element.data)"
    @save="save"
    @update="updateData($event)"
  >
    <template v-if="isGradeable">
      <div class="text-subtitle-2 mb-2">Answer</div>
      <VTextarea
        v-model="elementData.correct"
        :clearable="!isDisabled"
        :readonly="isDisabled"
        :rules="[(val: string) => !!val || 'Answer is required']"
        class="my-3"
        rows="3"
        variant="outlined"
        auto-grow
      />
    </template>
  </QuestionContainer>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, reactive, watch } from 'vue';
import { Element, ElementData } from '@tailor-cms/ce-text-response-manifest';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { QuestionContainer } from '@tailor-cms/core-components';

const emit = defineEmits(['save']);
const props = defineProps<{
  allowedEmbedTypes: string[];
  element: Element;
  isFocused: boolean;
  isDisabled: boolean;
  isGradeable: boolean;
}>();

const elementData = reactive<ElementData>(cloneDeep(props.element.data));

const isDirty = computed(() => !isEqual(elementData, props.element.data));

const save = () => emit('save', elementData);

const updateData = (data: ElementData) => {
  Object.assign(elementData, cloneDeep(data));
};

watch(() => props.element.data, updateData);
</script>

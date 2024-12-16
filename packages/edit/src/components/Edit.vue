<template>
  <QuestionContainer
    v-bind="{
      type: manifest.name,
      icon: manifest.ui.icon,
      embedTypes,
      elementData,
      isDirty,
      isDisabled,
    }"
    :show-feedback="false"
    @cancel="updateData(element.data)"
    @save="save"
    @update="updateData($event)"
  >
    <template v-if="isGradable">
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
import manifest, {
  Element,
  ElementData,
} from '@tailor-cms/ce-text-response-manifest';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { QuestionContainer } from '@tailor-cms/core-components';

const emit = defineEmits(['save']);
const props = defineProps<{
  embedTypes: any[];
  element: Element;
  isFocused: boolean;
  isDisabled: boolean;
}>();

const isGradable = computed(() => props.element.data.isGradable);
const elementData = reactive<ElementData>(cloneDeep(props.element.data));

const isDirty = computed(() => !isEqual(elementData, props.element.data));

const save = () => emit('save', elementData);

const updateData = (data: ElementData) => {
  Object.assign(elementData, cloneDeep(data));
};

watch(() => props.element.data, updateData);
</script>

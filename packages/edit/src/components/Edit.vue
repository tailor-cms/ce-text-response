<template>
  <VForm
    ref="form"
    class="tce-text-response my-4"
    validate-on="submit"
    @submit.prevent="save"
  >
    <div class="text-subtitle-2 mb-2">Question</div>
    <RichTextEditor
      v-model="elementData.question"
      :readonly="isDisabled"
      :rules="[requiredRule]"
      class="my-3"
      variant="outlined"
    />
    <div class="text-subtitle-2 mb-2">Answer</div>
    <VTextarea
      v-model="elementData.correct"
      :clearable="!isDisabled"
      :disabled="!isGraded"
      :readonly="isDisabled"
      :rules="[requiredRule]"
      class="my-3"
      rows="3"
      variant="outlined"
      auto-grow
    />
    <div class="text-subtitle-2 mb-2">Hint</div>
    <VTextField
      v-model="elementData.hint"
      :clearable="!isDisabled"
      :readonly="isDisabled"
      placeholder="Optional hint..."
      variant="outlined"
    />
    <div v-if="!isDisabled" class="d-flex justify-end">
      <VBtn
        :disabled="isDirty"
        color="primary-darken-4"
        variant="text"
        @click="cancel"
      >
        Cancel
      </VBtn>
      <VBtn
        :disabled="isDirty"
        class="ml-2"
        color="primary-darken-3"
        type="submit"
        variant="tonal"
      >
        Save
      </VBtn>
    </div>
  </VForm>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, reactive, ref, watch } from 'vue';
import { Element, ElementData } from '@tailor-cms/ce-text-response-manifest';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { RichTextEditor } from '@tailor-cms/core-components';

const emit = defineEmits(['save']);
const props = defineProps<{
  element: Element;
  isGraded: boolean;
  isFocused: boolean;
  isDisabled: boolean;
}>();

const form = ref<HTMLFormElement>();
const elementData = reactive<ElementData>(cloneDeep(props.element.data));

const isDirty = computed(() => isEqual(elementData, props.element.data));

const save = async () => {
  const { valid } = await form.value?.validate();
  if (valid) emit('save', elementData);
};

const cancel = () => {
  Object.assign(elementData, cloneDeep(props.element.data));
  form.value?.resetValidation();
};

const requiredRule = (val: string | boolean | number) => {
  return !!val || 'The field is required';
};

watch(
  () => props.element.data,
  (data) => Object.assign(elementData, cloneDeep(data)),
);

watch(
  () => props.isGraded,
  (val) => {
    if (!val) delete elementData.correct;
    else elementData.correct = '';
    emit('save', elementData);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.tce-container {
  text-align: left;
}
</style>

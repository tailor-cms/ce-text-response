<template>
  <VForm ref="form" class="tce-root" @submit.prevent="submit">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="rich-text px-2 my-4" v-html="data.question"></div>
    <div v-if="data.hint" class="d-flex justify-end mb-4">
      <VTooltip
        v-model="showHint"
        :open-on-hover="false"
        location="bottom"
        max-width="350"
        close-on-back
        open-on-click
      >
        <template #activator="{ isActive, props: tooltipProps }">
          <VBtn
            v-click-outside="() => (showHint = false)"
            v-bind="tooltipProps"
            :active="isActive"
            :prepend-icon="`mdi-lightbulb-${isActive ? 'on' : 'outline'}`"
            size="small"
            text="Hint"
            variant="text"
            rounded
          />
        </template>
        {{ data.hint }}
      </VTooltip>
    </div>
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
      :text="isGraded ? userState.correct : 'Submitted'"
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
import { computed, ref, watch } from 'vue';
import { ElementData } from '@tailor-cms/ce-text-response-manifest';

const props = defineProps<{ id: number; data: ElementData; userState: any }>();
const emit = defineEmits(['interaction']);

const form = ref<HTMLFormElement>();
const showHint = ref(false);
const submitted = ref(false);
const response = ref<string[]>(props.userState?.response);

const isGraded = computed(() => 'correct' in props.userState);

const submit = async () => {
  const { valid } = await form.value?.validate();
  if (valid) {
    submitted.value = true;
    emit('interaction', { response: response.value });
  }
};

const requiredRule = (val: string | boolean | number) => {
  return !!val || 'You have to enter your answer.';
};

watch(
  () => props.userState,
  (state = {}) => {
    response.value = state.response;
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

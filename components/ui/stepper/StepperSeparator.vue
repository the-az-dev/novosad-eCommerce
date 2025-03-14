<script lang="ts" setup>
import type { StepperSeparatorProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { StepperSeparator, useForwardProps } from 'reka-ui'

import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<StepperSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperSeparator
    v-bind="forwarded"
    :class="cn(
      'bg-accent-foreground',
      // Disabled
      'group-data-[state=disabled]:bg-accent-foreground',
      // Completed
      'group-data-[state=completed]:bg-accent-foreground',
      props.class,
    )"
  />
</template>

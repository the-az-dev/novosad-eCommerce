<script lang="ts" setup>
import type { StepperIndicatorProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { StepperIndicator, useForwardProps } from 'reka-ui'

import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<StepperIndicatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperIndicator
    v-bind="forwarded"
    :class="cn(
      'inline-flex items-center justify-center rounded-full text-accent-foreground w-8 h-8',
      // Disabled
      'group-data-[disabled]:text-accent-foreground',
      // Active
      'group-data-[state=active]:bg-transparent group-data-[state=active]:text-accent-foreground',
      // Completed
      'group-data-[state=completed]:bg-accent group-data-[state=completed]:text-accent-foreground',
      props.class,
    )"
  >
    <slot />
  </StepperIndicator>
</template>

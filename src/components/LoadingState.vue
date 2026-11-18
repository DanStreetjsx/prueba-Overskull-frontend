<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = withDefaults(defineProps<{ loading: boolean; label?: string }>(), {
  label: 'Cargando',
})

const STROKE_LEN = 310 // longitud del borde (se usa como pathLength del rect)
type Status = 'idle' | 'running' | 'done'

const status = ref<Status>('idle')
const progress = ref(0) // 0..1
let timer: ReturnType<typeof setInterval> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined

function stop() {
  clearInterval(timer)
  clearTimeout(hideTimer)
}

function start() {
  stop()
  progress.value = 0
  status.value = 'running'
  // No conocemos el progreso real de la petición: avanza hacia el 90 % y espera.
  timer = setInterval(() => {
    progress.value += (0.9 - progress.value) * 0.03
  }, 17)
}

function finish() {
  stop()
  progress.value = 1
  status.value = 'done'
  hideTimer = setTimeout(() => (status.value = 'idle'), 800)
}

watch(
  () => props.loading,
  (value) => {
    if (value) start()
    else if (status.value === 'running') finish()
  },
  { immediate: true },
)

onBeforeUnmount(stop)

const percent = computed(() => Math.round(progress.value * 100))
const dash = computed(() => {
  const filled = progress.value * STROKE_LEN
  return `${filled} ${STROKE_LEN - filled}`
})
</script>

<template>
  <div v-if="status !== 'idle'" class="loading" :class="`loading-${status}`" role="status">
    <svg class="loading-border" viewBox="0 0 110 65" aria-hidden="true">
      <rect
        x="2.5"
        y="2.5"
        width="105"
        height="60"
        rx="14"
        fill="none"
        :pathLength="STROKE_LEN"
        :stroke-dasharray="dash"
      />
    </svg>
    <span class="loading-text">
      <template v-if="status === 'done'">&#10003;</template>
      <template v-else>{{ percent }}%</template>
    </span>
    <span class="loading-label">{{ status === 'done' ? 'Listo' : label }}</span>
  </div>
</template>

<style scoped>
.loading {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 110px;
  height: 65px;
  margin-inline: auto;
  color: #1e88e5;
}
.loading-done {
  color: #2e7d32;
}
.loading-border {
  position: absolute;
  inset: 0;
}
.loading-border rect {
  stroke: currentColor;
  stroke-width: 5;
  stroke-linecap: round;
  /* el progreso empieza arriba a la izquierda y recorre el borde */
  transition: stroke 0.3s;
}
.loading-text {
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1;
}
.loading-label {
  position: absolute;
  bottom: 12px;
  font-size: 0.6rem;
  opacity: 0.7;
}
.loading-text {
  margin-bottom: 8px;
}
</style>

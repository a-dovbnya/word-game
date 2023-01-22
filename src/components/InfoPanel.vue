<template>
  <div :class="classes">
    <div class="info-panel__msg">
      {{ message }}

      <div
        v-if="props.type === INFO_MESSAGE.GAME_OVER_LOST"
        class="info-panel__word"
      >{{ props.word }}</div>
    </div>
    <GameButton
      class="info-panel__btn"
      @click="emits(isGameOver ? 'restart-game' : 'cancel-game')"
    >{{ isGameOver ? t.button.restart : t.button.cancel }}</GameButton>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
import { INFO_MESSAGE } from '../enums'
import t from '@/i18n'
import GameButton from '@/components/GameButton.vue'

const props = defineProps({
  type: {
    type: String,
    reqiured: true
  },

  word: {
    type: String,
    default: null
  }
})

const emits = defineEmits(['restart-game', 'cancel-game'])

const classes = computed((): string[] => {
  const classes: string[] = ['info-panel']

  if (props.type === INFO_MESSAGE.GAME_OVER_LOST) {
    classes.push('info-panel_lost')
  } else if (props.type === INFO_MESSAGE.GAME_OVER_SUCCESS) {
    classes.push('info-panel_success')
  }

  return classes
})

const message = computed(() => {
  return t.message[props.type as `${INFO_MESSAGE}`]
})

const isGameOver = computed((): boolean => {
  return props.type === INFO_MESSAGE.GAME_OVER_LOST || props.type === INFO_MESSAGE.GAME_OVER_SUCCESS
})
</script>

<style lang="less">
@import '@/assets/styles/settings.less';

.info-panel {
  font-size: 24px;
  line-height: 1;
  text-align: center;
  color: white;

  &__msg {
    margin-top: 0;
    margin-bottom: 50px;
    font-weight: 200;
  }

  &__word {
    margin-top: 30px;
    margin-bottom: -10px;
    color: var(--accent-color);
    text-transform: uppercase;
    font-weight: 500;
  }

  &__btn {
    display: inline-flex;
    padding: 0 30px;
  }

  &_lost {
    color: var(--light-primary-color);
  }

  &_success {
    color: var(--accent-color);
  }
}
</style>
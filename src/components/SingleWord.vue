<template>
  <div class="word">
    <div
      v-for="(l, index) in letters"
      :key="`letter-${index}`"
      :class="getClass(l, index)"
      @click="onClick(index)"
    >
      {{ l }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue'

const props = defineProps({
  word: {
    type: String,
    default: ''
  },

  currentWord: {
    type: String,
    default: ''
  },

  isOpen: {
    type: Boolean,
    default: false
  },

  /**
   * Определяет режим подсказки
   * Выбор буквы
   */
  openLetterMode: {
    type: Boolean,
    default: false
  },

  openLetterIndex: {
    type: Number,
    default: -1
  },

  isInput: {
    type: Boolean,
    default: false
  },

  active: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['open-letter'])

const letters = computed(() => {
  const letters = props.word ? props.word.split('') : Array(5).fill('')

  if (letters.length < 5) {
    letters.length = 5
  }

  if (props.openLetterIndex > -1 && props.active) {
    letters[props.openLetterIndex] = props.currentWord[props.openLetterIndex]
  }

  return letters.map(l => !l ? '' : l)
})

const getClass = (letter, position) => {
  const classes = ['letter']

  // Режим подсказки "Открыть любую букву"
  if (props.openLetterMode && props.active) {
    classes.push('letter_open-mode')
    return classes
  }

  if (props.active) {
    classes.push('letter_active')
  }

  if (position === props.openLetterIndex && props.active) {
    classes.push('letter_on-position')
  }

  if (props.isInput || !props.word) {
    return classes
  }

  if (props.currentWord === props.word) {
    classes.push('letter_success')
  }

  if (props.currentWord && props.currentWord[position] === letter) {
    classes.push('letter_on-position')
  } else if (props.currentWord.includes(letter)) {
    classes.push('letter_in-word')
  }

  if (props.isOpen) {
    classes.push('letter_default')
  }

  return classes
}

const onClick = (index) => {
  if (props.openLetterMode) {
    emits('open-letter', index)
  }
}
</script>

<style lang="less" scoped>
.word {
  display: flex;
  gap: 1px;
  margin-bottom: 2px;
}

.letter {
  margin-top: -1px;
  width: 50px;
  height: 50px;
  outline: 1px solid white;
  color: var(--text-icons);
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;

  &_default {
    background: var(--light-secondary-color);
  }

  &_success {
    background: var(--accent-color);
  }

  &_in-word {
    background: var(--primary-color);
  }

  &_on-position {
    background: var(--accent-color);
  }

  &_active {
    outline-color: var(--primary-color);
  }

  &_open-mode {
    outline-color: var(--accent-color);
  }
}
</style>

<template>
  <div class="keyboard">
    <div
      v-for="(alphabetRow, i) in alphabetRows"
      :key="`keyboard-row-${i}`"
      class="keyboard__row"
    >
      <GameButton
        v-for="(symbol, j) in alphabetRow"
        :key="`keyboard-${symbol}-${j}`"
        :disabled="isDisabled(symbol)"
        class="keyboard__btn"
        @click="onKeyClick(symbol)"
      >
        <img
          v-if="symbol === applySymbol"
          v-svg-inline
          src="../assets/icons/done.svg"
          class="keyboard__icon"
        />
        <img
          v-else-if="symbol === removeSymbol"
          v-svg-inline
          src="../assets/icons/arrow_back.svg"
          class="keyboard__icon"
        />
        <span v-else>{{ symbol }}</span>
      </GameButton>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, onBeforeUnmount } from 'vue'
import GameButton from './GameButton.vue'

const applySymbol = 'Add'
const removeSymbol = '<-'

const alphabetRows = [
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
  ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
  [applySymbol, 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', removeSymbol]
]

const isDisabled = symbol => {
  if (props.disabledSymbols.includes(symbol)) {
    return true
  }

  return (symbol === applySymbol && props.word.length < 5) || (symbol === removeSymbol && !props.word.length)
}

const props = defineProps({
  word: {
    type: String,
    default: ''
  },

  disabledSymbols: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['set-letter', 'apply-word', 'remove-last-symbol'])

const onKeyClick = symbol => {
  let event = 'set-letter'

  if (symbol === removeSymbol) {
    event = 'remove-last-symbol'
  } else if (symbol === applySymbol) {
    event = 'apply-word'
  }

  emits(event, symbol)
}

/**
 * Управление с клавиатуры
 */
const onKeydown = (e) => {
  for (let i = 0; i < alphabetRows.length; i++) {
    if (alphabetRows[i].includes(e.key)) {
      onKeyClick(e.key)
      return
    }
  }

  if (e.keyCode === 8) {
    onKeyClick(removeSymbol)
  } else if (e.keyCode === 13) {
    onKeyClick(applySymbol)
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})

</script>

<style lang="less" scoped>
.keyboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;

  &__row {
    display: flex;
    gap: 8px;
  }

  &__btn {
    padding: 2px;
    flex-shrink: 0;
  }

  &__icon {
    fill: white;
    width: var(--primary-button-icon-size);
    height: var(--primary-button-icon-size);

    &:focus {
      outline: none;
    }
  }

  @media screen and (max-width: 590px) {
    gap: 5px;

    &__row {
      gap: 5px;
    }

    &__btn {
      height: var(--keyboard-button-mobile-height);
    }
  }
}
</style>

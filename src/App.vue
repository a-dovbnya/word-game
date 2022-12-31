<template>
  <header class="app-panel">
    <div class="app-panel__content">
      <img
        v-svg-inline
        class="app-panel__logo"
        src="./assets/logo.svg"
      />

      <div class="app-panel__tools">
        <GameButton
          :disabled="openLetterIndex > -1"
          button-type="secondary"
          @click="isOpenLetter = true"
        >
          <img
              v-svg-inline
              src="./assets/icons/spellcheck.svg"
              class="tool-btn__icon"
          />
        </GameButton>

        <GameButton button-type="secondary" @click="init">
          <img
              v-svg-inline
              src="./assets/icons/refresh.svg"
              class="tool-btn__icon"
          />
        </GameButton>

        <!-- <GameButton button-type="secondary" @click="init">
          <img
              v-svg-inline
              src="./assets/icons/settings.svg"
              class="tool-btn__icon"
          />
        </GameButton> -->

        <InstallPanel />
      </div>
    </div>
  </header>

  <div class="app">
    <div class="app__content">

      <div class="app__game">
          <SingleWord
            v-for="i in 5"
            :key="i"
            :is-open="i <= words.length"
            :word="currentWords[i-1]"
            :current-word="_currentWord"
            :is-input="words.length === i - 1"
            :active="words.length === i - 1 && !isSuccess"
            :open-letter-mode="isOpenLetter"
            :open-letter-index="openLetterIndex"
            :class="{
              'word-row': true,
              'word-row_active': words.length === i - 1 && !isSuccess && !isOpenLetter,
              'word-row_open-mode': words.length === i - 1 && !isSuccess && isOpenLetter
            }"
            @open-letter="onOpenLetter"
          />
      </div>
    </div>

    <InfoPanel
      v-if="infoPanel"
      :type="infoPanel"
      :word="_currentWord"
      @restart-game="init"
      @cancel-game="isOpenLetter = false"
    />

    <GameKeyboard
      v-else
      :word="newWord"
      :disabled-symbols="disabledSymbols"
      @set-letter="onSetLetter"
      @remove-last-symbol="onRemoveLastSymbol"
      @apply-word="addWord"
    />

    <!-- <p>NewWord = {{ newWord }}</p>
    <p>currentWord = {{ _currentWord }}</p>
    <p>{{ disabledSymbols }}</p> -->
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import SingleWord from './components/SingleWord.vue'
import GameKeyboard from './components/GameKeyboard.vue'
import GameButton from './components/GameButton.vue'
import InstallPanel from  './components/InstallPanel.vue'
import InfoPanel from  './components/InfoPanel.vue'
import dictionary from './dictionary'
import { INFO_MESSAGE } from './enums'

const WORD_QUANTITY = 5
const LETTERS_QUANTITY = 5

// todo - вынести в enums
// Скорректировать название с error на lost
const GAME_OVER = {
  SUCCESS: 'success',
  ERROR: 'error'
}


const words = ref([])
const newWord = ref('')
const error = ref()
const gameOver = ref(null)
const _currentWord = ref('')

// Подсказка
const isOpenLetter = ref(false)
// Индекс открытой буквы
const openLetterIndex = ref(-1)

const currentWords = computed(() => {
  if (words.value.length < WORD_QUANTITY && newWord.value) {
    return [...words.value, newWord.value]
  }

  return words.value
})

/**
 * Слово отгадано
 */
const isSuccess = computed(() => {
  return gameOver.value === GAME_OVER.SUCCESS
})

/**
 * Заблокированные кнопки на клавиатуре
 */
const disabledSymbols = computed(() => {
    return words.value
        .reduce((res, currentWord) => res + currentWord, '')
        .split('')
        .filter((symbol, i, arr) => !_currentWord.value.includes(symbol) && arr.indexOf(symbol) === i)
})

/**
 * Показать информационное сообщение вместо клавиатуры
 */
const infoPanel = computed(() => {
  if (gameOver.value ===GAME_OVER.SUCCESS) {
    return INFO_MESSAGE.GAME_OVER_SUCCESS
  }

  if (gameOver.value === GAME_OVER.ERROR) {
    return INFO_MESSAGE.GAME_OVER_LOST
  }

  if (isOpenLetter.value) {
    return INFO_MESSAGE.SELECT_LETTER
  }

  return undefined
})

/**
 * Загадать слово из словаря
 */
const setWord = () => {
  _currentWord.value = dictionary[Math.floor(Math.random() * dictionary.length)].toLowerCase()
}

/**
 * Добавить слово в массив ответов
 */
const addWord = () => {
  if (newWord.value.length < 5) {
    return
  }

  words.value.push(newWord.value)
  newWord.value = ''

  if (words.value[words.value.length - 1] === _currentWord.value) {
    gameOver.value = GAME_OVER.SUCCESS
    return
  }

  if (words.value.length === 5) {
    gameOver.value = GAME_OVER.ERROR
  }
}

/**
 * Добавляет символ к активному слову
 * @param {string} symbol 
 */
const onSetLetter = (symbol) => {
  if (isOpenLetter.value) {
    return
  }

  if (newWord.value.length === openLetterIndex.value && symbol !== _currentWord.value[openLetterIndex.value]) {
    newWord.value = newWord.value + _currentWord.value[openLetterIndex.value]
  }

  if (newWord.value.length < LETTERS_QUANTITY) {
    newWord.value = newWord.value + symbol
  } 
}

/**
 * Стираем последний символ
 */
const onRemoveLastSymbol = () => {
  newWord.value = newWord.value.slice(0, -1)
}

/**
 * Подсказка "Открыть любую букву"
 */
const onOpenLetter = (index) => {
  openLetterIndex.value = index
  isOpenLetter.value = false
}

const init = () => {
  words.value = []
  newWord.value = ''
  error.value = null
  gameOver.value = null
  isOpenLetter.value = false
  openLetterIndex.value = -1

  setWord()
}

onBeforeMount(() => {
  init()
})
</script>

<style lang="less">
@import '@/assets/styles/settings.less';

body {
  background: var(--dark-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 0;
  padding: 0;
  min-width: 320px;
}

* {
  box-sizing: border-box;
}
</style>

<style lang="less" scoped>
@app: .app;

.app-panel {
  width: 100%;
  margin: 0 0 50px;
  padding: 10px;
  background: var(--dark-primary-color);

  &__logo {
    width: var(--logo-size);
    height: var(--logo-size);

    &, &:focus {
      outline: none;
    }
  }

  &__tools {
    display: flex;
    gap: 8px;
  }

  &__content {
    max-width: 1024px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }
}

@{app} {
  margin: 0 auto;
  width: 100%;
  max-width: var(--app-width);
  margin-top: 30px;
  font-family: sans-serif;

  &__content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 calc((var(--app-width) - var(--game-width)) / 2);
    position: relative;
  }

  &__panel {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    width: var(--game-width);
    margin: 0 auto 35px;
  }

  &__game {
    width: var(--game-width);
    margin: 0 auto 50px;
  }

  @media screen and (max-width: 730px) {
    &__content {
      display: block;
      padding: 0 30px;
    }
  }
}

.word-row {
  position: relative;

  &_active {
    box-shadow: 0px 0px 5px 2px var(--primary-color);
    z-index: 10;
  }

  &_open-mode {
    box-shadow: 0px 0px 5px 2px var(--accent-color);
    z-index: 10;
  }
}
</style>

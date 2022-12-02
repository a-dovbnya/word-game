<template>
  <div class="app">
    <div class="app__content">

      <div class="app__panel">
        <GameButton button-type="tool" @click="init">
          <img
              v-svg-inline
              src="./assets/icons/refresh.svg"
              class="tool-btn__icon"
          />
        </GameButton>

        <!-- <GameButton button-type="tool" @click="init">
          <img
              v-svg-inline
              src="./assets/icons/settings.svg"
              class="tool-btn__icon"
          />
        </GameButton> -->
      </div>

      <div class="app__game">
          <SingleWord
            v-for="i in 5"
            :key="i"
            :word="currentWords[i-1]"
            :current-word="_currentWord"
            :is-input="words.length === i - 1"
            :active="words.length === i - 1 && !isSuccess"
            :class="{'active-row': words.length === i - 1 && !isSuccess}"
          />
      </div>
    </div>

    <div v-if="gameOver" class="app__game-over">
      <p v-if="gameOver === GAME_OVER.SUCCESS" class="app__game-over-msg app__game-over-msg_success">Вы отгадали слово</p>
      <p v-else-if="gameOver === GAME_OVER.ERROR" class="app__game-over-msg app__game-over-msg_error">Вы не отгадали слово</p>
      <GameButton class="app__game-over-btn" @click="init">Еще раз</GameButton>
    </div>

    <GameKeyboard
      v-else
      :word="newWord"
      @set-letter="onSetLetter"
      @remove-last-symbol="onRemoveLastSymbol"
      @apply-word="addWord"
    />

    <!-- <p>NewWord = {{ newWord }}</p>
    <p>currentWord = {{ _currentWord }}</p> -->
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import SingleWord from './components/SingleWord.vue'
import GameKeyboard from './components/GameKeyboard.vue'
import GameButton from './components/GameButton.vue'
import dictionary from './dictionary'

const WORD_QUANTITY = 5
const LETTERS_QUANTITY = 5
const GAME_OVER = {
  SUCCESS: 'success',
  ERROR: 'error'
}


const words = ref([])
const newWord = ref('')
const error = ref()
const gameOver = ref(null)
const _currentWord = ref('')

const currentWords = computed(() => {
  if (words.value.length < WORD_QUANTITY && newWord.value) {
    return [...words.value, newWord.value]
  }

  return words.value
})

const isSuccess = computed(() => {
  return gameOver.value === GAME_OVER.SUCCESS
})

const setWord = () => {
  _currentWord.value = dictionary[Math.floor(Math.random() * dictionary.length)]
}

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

const onSetLetter = (symbol) => {
  if (newWord.value.length < LETTERS_QUANTITY) {
    newWord.value = newWord.value + symbol
  }
}

const onRemoveLastSymbol = () => {
  newWord.value = newWord.value.slice(0, -1)
}

const init = () => {
  words.value = []
  newWord.value = ''
  error.value = null
  gameOver.value = null
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
}
</style>

<style lang="less" scoped>
@app: .app;

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
    position: absolute;
    top: 0;
    right: 0;
    width: calc((var(--app-width) - var(--game-width)) / 2 - 30px);
    height: 50px;
    display: flex;
    gap: 8px;
  }

  &__game-over {
    font-size: 24px;
    line-height: 1;
    text-align: center;
    color: white;
  }

  &__game-over-msg {
    margin-top: 0;
    margin-bottom: 50px;
    font-weight: 200;

    &_success {
      color: var(--accent-color);
    }
    &_error {
      color: var(--light-primary-color);
    }
  }

  &__game-over-btn {
    display: inline-flex;
    padding: 0 30px;
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

    &__panel {
      position: static;
      width: var(--game-width);
      margin: 0 auto 15px;
    }
  }
}

.active-row {
  box-shadow: 0px 0px 5px 2px var(--primary-color);
  position: relative;
  z-index: 10;
}
</style>

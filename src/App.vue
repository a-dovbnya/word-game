<template>
  <div class="app">
    <div class="app__content">

      <div class="app__panel">
        <button class="tool-btn" @click="init" @keydown.prevent>
          <img
              v-svg-inline
              src="./assets/icons/refresh.svg"
              class="tool-btn__icon"
          />
        </button>

        <!-- <button class="tool-btn" @click="init" @keydown.prevent>
          <img
              v-svg-inline
              src="./assets/icons/settings.svg"
              class="tool-btn__icon"
          />
        </button> -->
      </div>

      <div class="app__game">
          <SingleWord
            v-for="i in 5"
            :key="i"
            :word="currentWords[i-1]"
            :current-word="_currentWord"
            :is-input="words.length === i - 1"
            :active="words.length === i - 1 && !success"
            :class="{'active-row': words.length === i - 1 && !success}"
          />
      </div>
    </div>

    <GameKeyboard
      :word="newWord"
      @set-letter="onSetLetter"
      @remove-last-symbol="onRemoveLastSymbol"
      @apply-word="addWord"
    />

    <!-- <p>NewWord = {{ newWord }}</p>
    <p>currentWord = {{ _currentWord }}</p> -->

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Победа!!!</p>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import SingleWord from './components/SingleWord.vue'
import GameKeyboard from './components/GameKeyboard.vue'
// import ToolPanel from './components/ToolPanel.vue'
import dictionary from './dictionary'

const WORD_QUANTITY = 5
const LETTERS_QUANTITY = 5


const words = ref([])
const newWord = ref('')
const error = ref()
const success = ref(false)
const _currentWord = ref('')

const currentWords = computed(() => {
  if (words.value.length < WORD_QUANTITY && newWord.value) {
    return [...words.value, newWord.value]
  }

  return words.value
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
    success.value = true
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
  success.value = false
  error.value = null
  setWord()
}

onBeforeMount(() => {
  init()
})
</script>

<style>
:root {
  --dark-primary-color: #0097A7;
  --light-primary-color: #B2EBF2;
  --primary-color: #00BCD4;
  --dark-color: #212121;

  --text-icons: #FFF;
  --accent-color: #FFC107;
  /* --primary-text: #212121; */
  --secondary-text: #757575;
  --devider-color: #BDBDBD;


  --app-width: 700px;
  --game-width: 254px;
}

body {
  background: var(--dark-color);
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

  &__game {
    width: var(--game-width);
    margin: 0 auto;
  }

  @media screen and (max-width: 730px) {
    &__content {
      display: block;
      padding: 0 30px;
    }

    &__panel {
      position: static;
      width: var(--game-width);
      margin: 0 auto;
    }
  }
}

.tool-btn {
  width: 35px;
  height: 35px;
  border-radius: 4px;
  border: 1px solid white;
  background: none;
  appearance: none;
  padding: 4px;

  &__icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
    fill: white;
    transition: .25s linear;

    &:hover {
      opacity: .7;
    }

    &:focus {
      outline: none;
    }
  }
}

.active-row {
  box-shadow: 0px 0px 5px 2px var(--primary-color);
  position: relative;
  z-index: 10;
}

.error {
  color: red;
}

.success {
  font-size: 24px;
  font-weight: bold;
  color: green;
  text-align: center;
}
</style>

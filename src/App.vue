<template>
  <div class="wrap">
    <div class="game">
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
    <!-- <p>Words length = {{ words.length }}</p>
    <p>Current words = {{ currentWords }}</p> -->

    <GameKeyboard
      :word="newWord"
      @set-letter="onSetLetter"
      @remove-last-symbol="onRemoveLastSymbol"
      @apply-word="addWord"
    />

    <div class="controls">
      <button
        :disabled="newWord.length !== 5"
        class="control"
        @click="addWord"
      >Принять</button>
      <button class="control" @click="init">Новая игра</button>
    </div>

    <p>NewWord = {{ newWord }}</p>
    <p>currentWord = {{ _currentWord }}</p>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Победа!!!</p>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import SingleWord from './components/SingleWord.vue'
import GameKeyboard from './components/GameKeyboard.vue'
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
}
body {
  background: var(--dark-color);
}
</style>
<style lang="less" scoped>
.wrap {
  margin: 0 auto;
  width: 100%;
  max-width: 700px;
  margin-top: 30px;
  font-family: sans-serif;
}

.game {
  width: 254px;
  margin: 0 auto;
}

.controls {
  margin-top: 25px;
  display: flex;
  justify-content: center;
}

.control {
  height: 40px;
  min-width: 100px;
  margin-right: 8px;
  cursor: pointer;
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

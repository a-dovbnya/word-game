<template>
    <div v-if="isShown" class="install-panel">
        <GameButton class="install-btn" @click="install">Установить</GameButton>
        <GameButton class="install-btn" @click="isShown = false">Не сейчас</GameButton>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import GameButton from './GameButton.vue'

const isShown = ref(false)
let installEvent = null

const install = () => {
  if (!install.event) {
    return
  }

  installEvent.prompt()
  installEvent.userChoice.then((choice) => {
    isShown.value = false

    if (choice.outcome !== 'accepted') {
      alert('Что-то пошло не так')
    }
  })
}

const onBeforeInstall = e => {
  e.preventDefault()
  installEvent = e
  isShown.value = true
}

onBeforeMount(() => {
  window.addEventListener('beforeinstallprompt', onBeforeInstall)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', onBeforeInstall)
})

</script>

<style lang="less" scoped>
.install-panel {
  width: 100%;
  text-align: right;
  margin: 0 0 25px;
  padding: 15px 30px;
  background: var(--dark-primary-color);
}

.install-btn {
  display: inline-flex;
  padding: 0 20px;

  & + & {
    margin-left: 8px;
  }
}
</style>

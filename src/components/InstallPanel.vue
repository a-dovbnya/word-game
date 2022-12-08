<template>
    <div v-if="isShown" class="install-panel">
        <GameButton class="install-btn" button-type="tool" @click="install">Установить</GameButton>
        <GameButton class="install-btn" button-type="tool" @click="isShown = false">Не сейчас</GameButton>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import GameButton from './GameButton.vue'

const isShown = ref(false)
let installEvent = null

const install = () => {
  if (!installEvent) {
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
  margin-left: 20px;
}

.install-btn {
  display: inline-flex;
  padding: 0 20px;

  & + & {
    margin-left: 8px;
  }
}
</style>

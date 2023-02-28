<template>
  <div class="app-social">
    <a
      :href="`https://www.facebook.com/sharer/sharer.php?u=${APP_URL}`"
      target="_blank"
      class="app-social__item"
    >
      <img
        v-svg-inline
        src="@/assets/icons/social/facebook.svg"
        class="app-social__icon"
      />
    </a>
    <a
      :href="`https://twitter.com/intent/tweet?url=${APP_URL}/&text=`"
      target="_blank"
      class="app-social__item"
    >
      <img
        v-svg-inline
        src="@/assets/icons/social/twitter.svg"
        class="app-social__icon"
      />
    </a>
    <a
      href="https://github.com/a-dovbnya/word-game"
      target="_blank"
      class="app-social__item"
    >
      <img
        v-svg-inline
        src="@/assets/icons/social/github.svg"
        class="app-social__icon"
      />
    </a>
  </div>
</template>

<script lang="ts" setup>
const APP_URL = `https://a-dovbnya.github.io/word-game/dist`
</script>

<style lang="less">
@import '@/assets/styles/settings.less';

.app-social {
  display: inline-flex;
  margin: 20px auto;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    margin: 0 5px;
    width: 40px;
    height: 40px;
    border: 1px solid white;
    border-radius: 50%;
    transition: .2s linear;

    &:hover {
      border-color: var(--primary-color);

      .app-social__icon {
        fill: var(--primary-color);
      }
    }
  }

  &__icon {
    fill: white;
    width: 20px;
    height: 20px;
    transition: .2s linear;
    outline: none !important;
  }
}
</style>
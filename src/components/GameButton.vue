<template>
    <button
        :class="['button', `button_${props.buttonType}`]"
        @keydown.prevent
    >
        <slot />
    </button>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    // types: default, tool
    buttonType: {
        type: String,
        default: 'default'
    }
})
</script>

<style lang="less" scoped>
    .button {
        line-height: 1;
        cursor: pointer;
        appearance: none;
        background: none;
        border-radius: 4px;
        padding: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        touch-action: manipulation;
        outline: none;
        transition: .2s linear;

        &:focus {
            outline: none;
        }

        &:disabled {
            cursor: default;
            opacity: .5;
        }

        /deep/ svg {
            fill: currentColor;

            &:focus {
                outline: none;
            }
        }

        &_default {
            min-width: var(--default-button-width);
            height: var(--default-button-height);
            font-size: var(--default-button-font-size);
            border: 1px solid var(--default-button-border-color);
            color: white;

            // &:not(:disabled):hover {
            //     background: var(--dark-primary-color);
            // }


            /deep/ svg {
                width: var(--default-button-icon-size);
                height: var(--default-button-icon-size);
            }

            &:not(:disabled):active {
                background: var(--primary-color);
            }

            // @media (hover: none) {
            //     &:not(:disabled):hover {
            //         background: var(--dark-primary-color);
            //     }
            // }

        }

        &_tool {
            min-width: var(--tool-button-width);
            height: var(--tool-button-height);
            border: 1px solid var(--tool-button-border-color);
            color: white;

            &:not(:disabled):hover {
                opacity: .5;
            }

            &:not(:disabled):active {
                opacity: .7;
            }

            /deep/ svg {
                width: var(--tool-button-icon-size);
                height: var(--tool-button-icon-size);
            }
        }
    }
</style>

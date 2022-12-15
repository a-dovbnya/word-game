<template>
    <button
        :class="[
            'button',
            `button_${props.buttonType}`,
            `button_${props.buttonType}-${isIcon ? 'icon' : 'text'}`
        ]"
        @keydown.prevent
    >
        <slot />
    </button>
</template>

<script setup>
import { defineProps, useSlots } from 'vue'

const props = defineProps({
    // types: primary, secondary
    buttonType: {
        type: String,
        default: 'primary'
    }
})

const slots = useSlots()
const isIcon = ['img', 'svg'].includes(slots.default()[0]?.type)

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
        transition: .15s linear;

        &:focus {
            outline: none;
        }

        &:disabled {
            cursor: default;
            background-color: var(--secondary-color);
            border-color: var(--secondary-color);
        }

        /deep/ svg {
            fill: currentColor;

            &:focus {
                outline: none;
            }
        }

        &_primary {
            min-width: var(--primary-button-width);
            height: var(--primary-button-height);
            font-size: var(--primary-button-font-size);
            border: 1px solid var(--primary-button-border-color);
            color: white;

            

            /deep/ svg {
                width: var(--primary-button-icon-size);
                height: var(--primary-button-icon-size);
            }

            &:not(:disabled):active,
            &:not(:disabled):active:hover {
                background: var(--primary-color);
            }

            /* mouse, touch pad */
            @media (hover: hover) and (pointer: fine) {
                &:not(:disabled):hover {
                    background: var(--dark-primary-color);
                }
            }

        }

        &_primary-text {
            display: inline-flex;
            padding: 0 20px;
        }

        &_primary-icon {
            width: var(--primary-button-width);
        }

        &_secondary {
            height: var(--secondary-button-height);
            border: 1px solid var(--secondary-button-border-color);
            color: white;

            &:not(:disabled):active,
            &:not(:disabled):active:hover {
                opacity: .7;
            }

            /deep/ svg {
                width: var(--secondary-button-icon-size);
                height: var(--secondary-button-icon-size);
            }

            /* mouse, touch pad */
            @media (hover: hover) and (pointer: fine) {
                &:not(:disabled):hover {
                    opacity: .5;
                }
            }
        }

        &_secondary-text {
            display: inline-flex;
            padding: 0 20px;
        }

        &_secondary-icon {
            width: var(--secondary-button-width);
        }
    }
</style>

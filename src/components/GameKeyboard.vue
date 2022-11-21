<template>
    <div class="keyboard">
        <div
            v-for="(alphabetRow, i) in alphabetRows"
            :key="`keyboard-row-${i}`"
            class="keyboard__row"
        >
            <button
                v-for="(symbol, j) in alphabetRow"
                :key="`keyboard-${symbol}-${j}`"
                :disabled="isDisabled(symbol)"
                class="keyboard__symbol"
                @click="onKeyClick(symbol)"
                @keydown.prevent
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
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, onBeforeUnmount } from 'vue'

const applySymbol = 'Add'
const removeSymbol = '<-'

const alphabetRows = [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    [applySymbol, 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', removeSymbol]
]

const isDisabled = symbol => {
    return (symbol === applySymbol && props.word.length < 5) || (symbol === removeSymbol && !props.word.length)
}

const props = defineProps({
    word: {
        type: String,
        default: ''
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

<style lang="less">
:root {
    --keyboard-symbol-size: 50px;
    --keyboard-symbol-font-size: 16px;
    --icon-button-size: 25px;
}

@media screen and (max-width: 740px) {
    :root {
        --keyboard-symbol-size: 40px;
        --icon-button-size: 20px;
    }
}

@media screen and (max-width: 590px) {
    :root {
        --keyboard-symbol-size: 25px;
        --keyboard-symbol-font-size: 13px;
        --icon-button-size: 15px;
    }
}
</style>

<style lang="less" scoped>
    .keyboard {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        margin-top: 50px;

        &__row {
            display: flex;
            gap: 8px;
        }

        &__icon {
            fill: white;
            width: var(--icon-button-size);
            height: var(--icon-button-size);

            &:focus {
                outline: none;
            }
        }

        &__symbol {
            width: var(--keyboard-symbol-size);
            height: var(--keyboard-symbol-size);
            font-size: var(--keyboard-symbol-font-size);
            line-height: 1;
            cursor: pointer;
            appearance: none;
            border: 1px solid var(--primary-color);
            border-radius: 4px;
            padding: 2px;
            color: white;
            background: none;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .2s linear;

            &:not(:disabled):hover {
                background: var(--dark-primary-color);
            }

            &:not(:disabled):active {
                background: var(--primary-color);
            }

            &:focus {
                outline: none;
            }

            &:disabled {
                opacity: .5;
            }
        }
    }
</style>

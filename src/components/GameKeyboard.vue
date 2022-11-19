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
            >{{ symbol }}</button>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, onBeforeUnmount } from 'vue'

const applySymbol = 'Add'
const removeSymbol = '<--'

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

        &__symbol {
            width: 50px;
            height: 50px;
            font-size: 16px;
            cursor: pointer;
            appearance: none;
            border: 1px solid var(--primary-color);
            border-radius: 4px;
            color: white;
            background: none;
            transition: .2s linear;

            &:hover {
                background: var(--dark-primary-color);
            }

            &:active {
                background: var(--primary-color);
            }
        }
    }
</style>

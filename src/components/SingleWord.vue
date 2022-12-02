<template>
    <div class="word">
        <div
            v-for="(l, index) in letters"
            :key="`letter-${index}`"
            :class="getClass(l, index)"
        >{{ l }}</div>
    </div>
</template>

<script setup>
    import { defineProps, computed } from 'vue'

    const props = defineProps({
        word: {
            type: String,
            default: ''
        },

        currentWord: {
            type: String,
            default: ''
        },

        isInput: {
            type: Boolean,
            default: false
        },

        active: {
            type: Boolean,
            default: false
        }
    })

    const letters = computed(() => {
        if (props.word) {
            const letters = props.word.split('')

            if (letters.length < 5) {
                letters.length = 5
            }

            return letters.map(l => !l ? '' : l)
        }

        const emptyLetters = []
        emptyLetters.length = 5
        return emptyLetters.fill('')
    })

    const getClass = (letter, position) => {
        const classes = ['letter']

        if (props.active) {
            classes.push('letter_active')
        }

        if (props.isInput || !props.word) {
            return classes
        }

        if (props.currentWord === props.word) {
            classes.push('letter_success')
        }

        if (props.currentWord && props.currentWord[position] === letter) {
            classes.push('letter_on-position')
        }

        if (props.currentWord.includes(letter)) {
            classes.push('letter_in-word')
        }

        return classes
    }
</script>

<style lang="less" scoped>
    .word {
        display: flex;
        gap: 1px;
        margin-bottom: 2px;
    }

    .letter {
        margin-top: -1px;
        width: 50px;
        height: 50px;
        outline: 1px solid white;
        color: var(--text-icons);
        cursor: pointer;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;

        &_default {
            background: var(--light-secondary-color);
        }

        &_success {
            background: var(--accent-color);
        }

        &_in-word {
            background: var(--primary-color);
        }

        &_on-position {
            background: var(--accent-color);
        }

        &_active {
            outline-color: var(--primary-color);
        }
    }
</style>

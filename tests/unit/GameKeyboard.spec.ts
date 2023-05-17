import { mount, VueWrapper } from '@vue/test-utils'
import GameKeyboard from '@/components/GameKeyboard.vue'
import GameButton from '@/components/GameButton.vue'
import { applySymbol, removeSymbol } from '@/consts'

describe('GameKeyboard', () => {
  let wrapper: any

  const createByMount = (props = {}) => {
    wrapper = mount(GameKeyboard, {
      propsData: props,
      global: {
        directives: {
          svgInline() { /* stub */ }
        }
      }
    })
  }

  afterEach(() => {
    if (wrapper && wrapper.destroy) {
      wrapper.destroy()
    }
  })

  it('Клавиатура содержит 34 кнопки', () => {
    createByMount()

    const buttons = wrapper.findAllComponents(GameButton)

    expect(buttons.length).toBe(34)
  })

  it('При нажатии на кнопку с буквой происходит эммит события с этой буквой', () => {
    createByMount({})

    const LETTER = 'а'
    const button = wrapper.findAllComponents(GameButton).filter((btn: VueWrapper) => btn.text() === LETTER)[0]

    expect(button.exists()).toBe(true)

    button.trigger('click')

    expect(wrapper.emitted('set-letter')).toBeTruthy()
    expect(wrapper.emitted('set-letter')[0][0]).toBe(LETTER)
  })

  it('Кнопка стирания заблокирована. если пропс word пуст', () => {
    createByMount({word: ''})

    const button = wrapper.find(`[data-test-symbol="${removeSymbol}"]`)

    expect(button.attributes('disabled')).toBeDefined()
  })

  it('Кнопка стирания доступна. если пропс word не пуст', () => {
    createByMount({word: 'а'})

    const button = wrapper.find(`[data-test-symbol="${removeSymbol}"]`)

    expect(button.attributes('disabled')).not.toBeDefined()
  })

  it('При нажатии на кнопку стирания происходит эммит события remove-last-symbol', () => {
    createByMount({word: 'а'})

    const button = wrapper.find(`[data-test-symbol="${removeSymbol}"]`)

    button.trigger('click')

    expect(wrapper.emitted('remove-last-symbol')).toBeTruthy()
  })

  it('Кнопка применить недоступна, если пропс word.length < 5 символов и доступна, если word.length = 5', async () => {
    createByMount({word: ''})

    const button = wrapper.find(`[data-test-symbol="${applySymbol}"]`)

    expect(button.attributes('disabled')).toBeDefined()

    await wrapper.setProps({ word: 'а' })
    expect(button.attributes('disabled')).toBeDefined()

    await wrapper.setProps({ word: 'аа' })
    expect(button.attributes('disabled')).toBeDefined()

    await wrapper.setProps({ word: 'ааа' })
    expect(button.attributes('disabled')).toBeDefined()

    await wrapper.setProps({ word: 'аааа' })
    expect(button.attributes('disabled')).toBeDefined()

    await wrapper.setProps({ word: 'ааааа' })
    expect(button.attributes('disabled')).not.toBeDefined()
  })

  it('При нажатии на кнопку применить происходит эммит события apply-word', async () => {
    createByMount({word: 'ааааа'})

    const button = wrapper.find(`[data-test-symbol="${applySymbol}"]`)

    button.trigger('click')

    expect(wrapper.emitted('apply-word')).toBeTruthy()
  })


  // После эммита события слово передается без последнего символа
  // Кнопка применить..
  // Если передано слово более 5 букв, то при клике на любую букву ничего не происходит
})
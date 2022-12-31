import { INFO_MESSAGE } from './enums'

export default {
  message: {
    [INFO_MESSAGE.GAME_OVER_LOST]: 'Вы не отгадали слово',
    [INFO_MESSAGE.GAME_OVER_SUCCESS]: 'Вы отгадали слово',
    [INFO_MESSAGE.SELECT_LETTER]: 'Выберете букву'
  },

  button: {
    restart: 'Ещё раз',
    cancel: 'Отмена'
  }
}
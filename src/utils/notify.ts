import { Notify } from 'quasar'

export function notify (msg: string = '', positive: boolean = false) {
  return Notify.create({
    timeout: 1500,
    color: positive ? 'positive' : 'negative',
    message: msg,
    actions: [
      { label: 'Ok', color: 'yellow', handler: () => {} }
    ]
  })
}
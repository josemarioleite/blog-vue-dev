import { Dialog } from 'quasar'

export function alert (msg: string = '', positive: boolean = false, showCancel: boolean = false) {
  return Dialog.create({
    persistent: true,
    cancel: showCancel,
    title: 'Atenção',
    message: msg,
    color: positive ? 'positive' : 'negative'
  })
}
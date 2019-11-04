interface IOrders {
  [keys: string]: Function
}
/**
 * 
 * @param orders 所有命令
 * @param timeout 按键超时重置时间，默认 1500ms
 * @param command 触发事件时，都会触发该函数，参数为当前积累的按键
 */
export default function (orders: IOrders, timeout?: number, generallHandler?: (cmd: string) => void) : void {}



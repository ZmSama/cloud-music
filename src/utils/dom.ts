/*
 * @Description:操作dom的工具类
 * @Autor: ZmSama
 * @Date: 2021-05-19 11:43:22
 */

/**
 * @msg: 动态添加样式
 * @param {HTMLElement} el
 * @param {string} name
 * @return {*}
 */
export function addClass(el: HTMLElement, name: string) {
  if (!el) return
  //   先保留已经有的类
  let curClass = el.className
  // 处理传入的类名,如果传入多个那就按空格进行分割
  const classes = (name || "").split(" ")
  // 循环处理
  for (let index = 0; index < classes.length; index++) {
    const clsName = classes[index]
    // 如果是空那就跳过，否则给这个节点写入这个类
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
      //   对于没有重复的那就直接追加
    } else if (!hasClass(el, clsName)) {
      curClass += " " + clsName
    }
  }
  //   如果节点上没有类，那么直接赋值
  if (!el.classList) el.className = curClass
}

/**
 * @msg: 移除样式
 * @param {HTMLElement} el
 * @param {string} name
 * @return {*}
 */
export function removeClass(el: HTMLElement, name: string) {
  if (!el || !name) return
  const classes = name.split(" ")
  let curClass = " " + el.className + " "

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" " + clsName + " ", " ")
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

/**
 * @msg:去空格
 * @param {string} str
 * @return {*}
 */
export function trim(str: string): string {
  return (str || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "")
}
/**
 * @msg: 判断类名是否重复了
 * @param {HTMLElement} el
 * @param {string} name
 * @return {*}
 */
export function hasClass(el: HTMLElement, name: string): boolean {
  if (!el || !name) return false
  if (name.indexOf(" ") !== -1) throw new Error("类名之间要用空格隔开")
  if (el.classList) {
    return el.classList.contains(name)
  } else {
    return (" " + el.className + " ").indexOf(" " + name + " ") > -1
  }
}

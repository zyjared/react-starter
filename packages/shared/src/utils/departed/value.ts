/**
 * 判断值是否为可访问属性的类型（对象/函数/字符串，排除 null/其他基础类型）
 */
type Keyable = Record<PropertyKey, unknown> | string

/**
 * 校验值是否为 Keyable 类型
 */
function isKeyable(value: unknown): value is Keyable {
  return (typeof value === 'object' && value !== null)
    || typeof value === 'function'
    || typeof value === 'string'
}

/**
 * 拆分路径为键数组（如 'info.name' → ['info', 'name']）
 */
type SplitPath<P extends string>
  = P extends `${infer First}.${infer Rest}`
    ? [First, ...SplitPath<Rest>]
    : [P]

/**
 * 递归判断路径是否为源数据的有效嵌套路径
 * @example IsValidNestedPath<string, 'length'> → true
 * @example IsValidNestedPath<{ info: { name: string } }, 'info.name'> → true
 */
type IsValidNestedPath<T, P extends string>
  = T extends null | undefined
    ? false
    : T extends string
      ? SplitPath<P>['length'] extends 1 // 字符串只能是单层路径
        ? P extends keyof string // 路径需是 string 的内置属性（如 length）
          ? true
          : false
        : false // 字符串嵌套路径（如 'length.xxx'）无效
      : T extends number | boolean | symbol
        ? false
        : SplitPath<P> extends [infer First, ...infer Rest]
          ? First extends keyof T
            ? Rest extends [string]
              ? IsValidNestedPath<T[First], Rest[0]>
              : true
            : false
          : true

/**
 * 精准推导嵌套路径的返回类型
 * @example PathToType<string, 'length'> → number
 * @example PathToType<{ info: { name: string } }, 'info.name'> → string
 */
type PathToType<T, P extends string>
  = T extends null | undefined
    ? undefined
    : T extends string
      ? IsValidNestedPath<T, P> extends true
        ? T[Extract<P, keyof string>]
        : undefined
      : IsValidNestedPath<T, P> extends true
        ? (SplitPath<P> extends [infer First, ...infer Rest]
            ? First extends keyof T
              ? Rest extends [string]
                ? PathToType<T[First], Rest[0]>
                : T[First]
              : undefined
            : T)
        : undefined

/**
 * 获取源数据的属性值（支持字符串内置属性/对象嵌套路径，类型精准推导）
 * @overload
 * @overload
 * @param source 源数据（任意类型）
 * @param path 属性路径：空 | 单层键 | 嵌套路径
 * @returns 有效路径→具体类型，无效路径→undefined
 */
export function getValueByPath<T>(source: T): T
export function getValueByPath<T, P extends string>(source: T, path: P): PathToType<T, P>
export function getValueByPath<T>(source: T, path?: string) {
  if (path === undefined) {
    return source
  }

  if (!isKeyable(source)) {
    return undefined
  }

  const keys = path.split('.')
  let currentValue: unknown = source

  for (const key of keys) {
    if (!isKeyable(currentValue)) {
      return undefined
    }
    currentValue = currentValue[key as any]
  }

  return currentValue as PathToType<T, typeof path>
}

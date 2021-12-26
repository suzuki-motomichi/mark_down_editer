import { useState } from 'react'
// init: string は初期値で、useStateの引数と同じ、key: string は localStorageに保存するキー、[string, (s: string) => void] はカスタムフックの戻り値
export const useStateWithStorage = (init: string, key: string): [string, (s: string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue)
    localStorage.setItem(key, nextValue)
  }

  return [value, setValueWithStorage]
}
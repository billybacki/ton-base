import { ZERO_ADDRESS } from '@/constants/token/currency'

export function getCurrentTimeStamp(date?: Date | string | number) {
  return Number(((date ? new Date(date) : new Date()).getTime() / 1000).toFixed())
}

export function isZeroAddress(address: string) {
  return address === ZERO_ADDRESS
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function shortenHash(hash: string, suffixLength = 6): string {
  if (typeof hash !== 'string' || hash.length <= 4 + suffixLength) {
    return hash // Return original hash if it's not a string or shorter than prefix + suffix length
  }

  const prefix = hash.slice(0, 4)
  const suffix = hash.slice(-suffixLength)
  return `${prefix}...${suffix}`
}

export function isURL(url: string) {
  const strRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
  const re = new RegExp(strRegex)
  return re.test(url)
}

export function isEmail(value: any): boolean {
  return /^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{1,8}(,[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{1,8})*$/.test(
    value
  )
}

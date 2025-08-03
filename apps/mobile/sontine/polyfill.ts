import { getRandomValues as expoCryptoGetRandomValues } from 'expo-crypto'
import { Buffer } from 'buffer'

global.Buffer = Buffer

// Buffer.prototype.subarray polyfill specific to expo
// See: https://github.com/solana-foundation/anchor/issues/3041
Buffer.prototype.subarray = function subarray(begin?: number, end?: number): Buffer {
  const result = Uint8Array.prototype.subarray.apply(this, [begin, end])
  Object.setPrototypeOf(result, Buffer.prototype) // Ensures Buffer methods are available
  return result as unknown as Buffer
}

// Polyfill for TextEncoder in React Native
global.TextEncoder = require('text-encoding').TextEncoder

// getRandomValues polyfill
class Crypto {
  getRandomValues = expoCryptoGetRandomValues
}

const webCrypto = typeof crypto !== 'undefined' ? crypto : new Crypto()

;(() => {
  if (typeof crypto === 'undefined') {
    Object.defineProperty(window, 'crypto', {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    })
  }
})()

/**
 * Polyfill structuredClone for React Native
 * Added this to fix error:
 * ReferenceError: Property 'structuredClone' does not exist
 */
if (typeof global.structuredClone !== 'function') {
  global.structuredClone = function structuredClone(obj: any) {
    return JSON.parse(JSON.stringify(obj))
  }
}

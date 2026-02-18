export const state = {
  account: null,
  chainId: null
}

export function hasProvider() {
  return typeof window !== 'undefined' && !!window.ethereum
}

export async function connectWallet() {
  if (!hasProvider()) throw new Error('No injected Ethereum provider found')
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  state.account = accounts && accounts.length ? accounts[0] : null
  const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' })
  state.chainId = chainIdHex ? parseInt(chainIdHex, 16) : null
  return state.account
}

export function getAccount() {
  return state.account
}

export function onAccountsChanged(cb) {
  if (!hasProvider()) return
  window.ethereum.on('accountsChanged', (accounts) => {
    state.account = accounts.length ? accounts[0] : null
    cb && cb(state.account)
  })
}

export function onChainChanged(cb) {
  if (!hasProvider()) return
  window.ethereum.on('chainChanged', (chainIdHex) => {
    state.chainId = parseInt(chainIdHex, 16)
    cb && cb(state.chainId)
  })
}

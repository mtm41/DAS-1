import * as nacl from 'tweetnacl'

export function convertKeyPair(kp: nacl.SignKeyPair): nacl.BoxKeyPair
export function convertPublicKey(publicKey: Uint8Array): Uint8Array
export function convertSecretKey(sk: Uint8Array): Uint8Array
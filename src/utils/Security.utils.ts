import rsa from 'node-rsa';
import cry from 'crypto';
import bcrypt from 'bcryptjs';
import db from "../config/db/models";
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
interface TokenPayload {
  exp: number;
  accessTypes: string[];
  typeuser: number;
}
class SecurityUtils {
  constructor() {}

  /**
   *
   * @description Generate public and private keys
   */
  static generateKeys() {
    /**
     *
     * @returns
     */
    const key = new rsa({ b: 1024 });

    const pbkey = key.exportKey('public'); // llave 4
    const pvkey = key.exportKey('private'); // llave 1

    return { pbkey, pvkey };
  }

  /**
   * @description Encrypt apikey
   * @param {*} sc object with key
   * @returns
   */
  static async encrypt(sc:any) {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(sc, salt);

    return { key: hash };
  }

  /**
   * @description validate apikey
   * @param {*} key
   * @param {*} hash
   * @returns
   */
  static async validate(key:string, hash:string) {
    let value = await bcrypt.compare(key, hash);
    return value;
  }

  static setEncryptData(pvkey:string, target:Buffer ) {
    let key = new rsa(pvkey);
    return key.encryptPrivate(target, 'base64', 'utf8');
  }

  static setDecryptData( pbkey:string, encrypt:string ) {
    let key = new rsa(pbkey);
    try {
      let d = key.decryptPublic(encrypt, 'utf8')
      return d;
    } catch (e) {
      console.log(e);
    }
    return null

  }

  /**
   * @description decript rsa
   */
  static decrypt(pbkey:string, target:string, pvkey:string) {
    try {
      const encrypt = cry.privateEncrypt(
        Buffer.from(pvkey),
        Buffer.from(target)
      );
      const dcry = cry.publicDecrypt(Buffer.from(pbkey), encrypt);
      console.log(dcry);
    } catch (e) {
      throw e;
    }
  }

  static generateSession (data:any, pvkey: any) {
    const payload = data
    const signInOptions: SignOptions = {
      algorithm: 'RS256',
      expiresIn: '24h'
    };
    return sign(payload, pvkey, signInOptions);
  }

   static async validateToken(token: string, pbkey: string): Promise<any> {
  
    const verifyOptions: VerifyOptions = {
      algorithms: ['RS256'],
    };
    
    return await verify(token, pbkey, verifyOptions)
  }
  static generateSessionToken () {

  }

}

export default SecurityUtils;

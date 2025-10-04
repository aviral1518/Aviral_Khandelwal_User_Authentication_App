import CryptoJS from 'crypto-js';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SecureStorageService {
  private static instance: SecureStorageService;
  private cipherKey: string | null = null;

  private constructor() {}

  static getInstance(): SecureStorageService {
    if (!SecureStorageService.instance) {
      SecureStorageService.instance = new SecureStorageService();
    }
    return SecureStorageService.instance;
  }

  private generateKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  private async getCipherKey(): Promise<string> {
    if (this.cipherKey) return this.cipherKey;

    try {
      // Try to get existing key from Keychain
      const credentials = await Keychain.getGenericPassword();
      
      if (credentials) {
        this.cipherKey = credentials.password;
        return this.cipherKey;
      }

      // Generate new key if none exists
      const newKey = this.generateKey();
      await Keychain.setGenericPassword('cipher_key', newKey);
      this.cipherKey = newKey;
      return newKey;
    } catch (error) {
      console.error('Error accessing keychain:', error);
      throw error;
    }
  }

  private async encrypt(data: any): Promise<string> {
    try {
      const key = await this.getCipherKey();
      
      const jsonString = JSON.stringify(data);
      
      const encrypted = CryptoJS.AES.encrypt(jsonString, key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      const result = encrypted.toString();
      return result;
    } catch (error) {
      throw error;
    }
  }

  private async decrypt(encryptedData: string): Promise<any> {
    try {
      const key = await this.getCipherKey();
      
      const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      
      const result = JSON.parse(decryptedString);
      return result;
    } catch (error) {
      return null;
    }
  }

  async setItem(key: string, value: any): Promise<void> {
    try {
      const encryptedValue = await this.encrypt(value);
      await AsyncStorage.setItem(key, encryptedValue);
    } catch (error) {
      throw error;
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const encryptedValue = await AsyncStorage.getItem(key);
      
      if (!encryptedValue) {
        return null;
      }
      
      const decryptedValue = await this.decrypt(encryptedValue);
      return decryptedValue;
    } catch (error) {
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  }
}

export const secureStorage = SecureStorageService.getInstance();
import { PersonalVoiceModel } from '../models';
import type { CreatePersonalVoiceDto, UpdatePersonalVoiceDto } from '../types/personalVoice.types';

class ResourceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ResourceNotFoundError';
  }
}

class DuplicateKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateKeyError';
  }
}

export const PersonalVoiceService = {
  /**
   * Get all personal voices
   */
  getAllVoices: async () => {
    return PersonalVoiceModel.findAll();
  },

  /**
   * Get a personal voice by ID
   */
  getVoiceById: async (id: string) => {
    const voices = await PersonalVoiceModel.findById(id);
    if (voices.length === 0) {
      throw new ResourceNotFoundError('Personal voice not found');
    }
    return voices[0];
  },

  /**
   * Get a personal voice by key
   */
  getVoiceByKey: async (key: string) => {
    const voices = await PersonalVoiceModel.findByKey(key);
    if (voices.length === 0) {
      throw new ResourceNotFoundError('Personal voice not found');
    }
    return voices[0];
  },

  /**
   * Create a new personal voice
   */
  createVoice: async (voiceData: CreatePersonalVoiceDto) => {
    // Check if a voice with the same key already exists
    const keyExists = await PersonalVoiceModel.keyExists(voiceData.key);
    if (keyExists) {
      throw new DuplicateKeyError('A personal voice with this key already exists');
    }

    const newVoice = await PersonalVoiceModel.create(voiceData);
    return newVoice[0];
  },

  /**
   * Update a personal voice
   */
  updateVoice: async (id: string, updateData: UpdatePersonalVoiceDto) => {
    // Check if the personal voice exists
    const voices = await PersonalVoiceModel.findById(id);
    if (voices.length === 0) {
      throw new ResourceNotFoundError('Personal voice not found');
    }

    // If key is being updated, check for uniqueness
    if (updateData.key) {
      const existingVoices = await PersonalVoiceModel.findByKey(updateData.key);
      if (existingVoices.length > 0 && existingVoices[0].id !== id) {
        throw new DuplicateKeyError('A personal voice with this key already exists');
      }
    }

    const updatedVoice = await PersonalVoiceModel.update(id, updateData);
    return updatedVoice[0];
  },

  /**
   * Delete a personal voice
   */
  deleteVoice: async (id: string) => {
    // Check if the personal voice exists
    const voices = await PersonalVoiceModel.findById(id);
    if (voices.length === 0) {
      throw new ResourceNotFoundError('Personal voice not found');
    }

    await PersonalVoiceModel.delete(id);
    return true;
  }
};

export { ResourceNotFoundError, DuplicateKeyError }; 
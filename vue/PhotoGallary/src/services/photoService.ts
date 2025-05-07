// This file provides a service for handling photo data
// It loads photos from local db.json and checks if local images exist

import axios from 'axios';
import { Photo } from '../types';
import dbData from '../data/db.json';
import fs from 'fs';
import path from 'path';

// Service methods
export default {
  // Get all photos
  async getPhotos(): Promise<Photo[]> {
    try {
      // Get photos from local db.json
      const photos = dbData.photos as Photo[];

      // Process each photo to ensure local files exist
      for (const photo of photos) {
        await this.ensureLocalPhotoExists(photo);
      }

      return photos;
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
  },

  // Get a single photo by ID
  async getPhoto(id: string): Promise<Photo | null> {
    try {
      // Find photo in local db.json
      const photo = (dbData.photos as Photo[]).find(p => p.id.toString() === id.toString());

      if (!photo) {
        throw new Error(`Photo with ID ${id} not found`);
      }

      // Ensure local file exists
      await this.ensureLocalPhotoExists(photo);

      return photo;
    } catch (error) {
      console.error(`Error fetching photo ${id}:`, error);
      return null;
    }
  },

  // Create a new photo
  async createPhoto(photo: Omit<Photo, 'id'>): Promise<Photo | null> {
    try {
      // Generate a new ID (in a real app, this would be handled by the server)
      const newId = Date.now().toString();

      // Create a new photo object with the generated ID
      const newPhoto: Photo = {
        id: newId,
        ...photo
      };

      // In a real app, you would update the local db.json file
      // For now, we'll add the photo to the in-memory data
      (dbData.photos as Photo[]).push(newPhoto);

      console.log('Creating photo:', newPhoto);
      return newPhoto;
    } catch (error) {
      console.error('Error creating photo:', error);
      return null;
    }
  },

  // Update an existing photo
  async updatePhoto(id: string, photo: Photo): Promise<Photo | null> {
    try {
      // Find the photo in the in-memory data
      const photos = dbData.photos as Photo[];
      const index = photos.findIndex(p => p.id.toString() === id.toString());

      if (index === -1) {
        throw new Error(`Photo with ID ${id} not found`);
      }

      // Update the photo in the in-memory data
      photos[index] = { ...photo, id };

      console.log(`Updating photo ${id}:`, photos[index]);
      return photos[index];
    } catch (error) {
      console.error(`Error updating photo ${id}:`, error);
      return null;
    }
  },

  // Delete a photo
  async deletePhoto(id: string): Promise<boolean> {
    try {
      // Find the photo in the in-memory data
      const photos = dbData.photos as Photo[];
      const index = photos.findIndex(p => p.id.toString() === id.toString());

      if (index === -1) {
        throw new Error(`Photo with ID ${id} not found`);
      }

      // Delete the photo from the in-memory data
      photos.splice(index, 1);

      console.log(`Deleted photo ${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting photo ${id}:`, error);
      return false;
    }
  },

  // Search photos by name
  async searchPhotos(query: string): Promise<Photo[]> {
    try {
      // Search in local db.json
      const photos = (dbData.photos as Photo[]).filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

      // Ensure local files exist
      for (const photo of photos) {
        await this.ensureLocalPhotoExists(photo);
      }

      return photos;
    } catch (error) {
      console.error(`Error searching photos with query "${query}":`, error);
      return [];
    }
  },

  // Helper method to check if a local photo exists and download it if not
  async ensureLocalPhotoExists(photo: Photo): Promise<void> {
    // Skip if the photo is already a remote URL
    if (photo.photoFile.startsWith('http')) {
      return;
    }

    // Ensure the photoFile path includes the base path '/gallery'
    if (photo.photoFile.startsWith('/images/') && !photo.photoFile.startsWith('/gallery/')) {
      photo.photoFile = `/gallery${photo.photoFile}`;
    }

    // Create a mapping of photo filenames to fallback URLs
    // In a real implementation, this could be more sophisticated
    const photoUrlMapping: Record<string, string> = {
      'photo_1_春の桜が咲き誇る美しい.jpg': 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=600&fit=crop',
      'photo_2_朝日に染まる富士山の.jpg': 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=600&fit=crop',
      'photo_3_京都の美しい竹林の散.jpg': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'photo_4_秋の紅葉に彩られた日.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      'photo_5_山々に囲まれた静かな.jpg': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop',
      'photo_6_日本の美しい田園風景.jpg': 'https://images.unsplash.com/photo-1579008478087-1d3268523f13?w=800&h=600&fit=crop',
      'photo_7_東京タワーから見下ろ.jpg': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=600&fit=crop',
      'photo_8_奈良の歴史的な町家の.jpg': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'photo_9_波打ち際で輝く夕陽.jpg': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop',
      'photo_10_夏祭りの賑やかな雰囲.jpg': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=600&fit=crop',
      'photo_11_春の山々に広がる新緑.jpg': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop',
      'photo_12_沖縄の美しい海の風景.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      'photo_13_歴史を感じる城下町の.jpg': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop',
      'photo_14_高原に咲く可憐な花々.jpg': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop',
      'photo_15_清らかな渓流の風景.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      'photo_16_歴史を感じる古い町並.jpg': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'photo_17_朝日に輝く山の稜線.jpg': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop',
      'photo_18_静かに佇む湖の風景.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      'photo_19_夕暮れに染まる街の風.jpg': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=600&fit=crop'
    };

    // Extract the filename from the path
    const filename = photo.photoFile.split('/').pop() || '';

    // Check if we have a fallback URL for this filename
    const fallbackUrl = photoUrlMapping[filename] || 'https://images.unsplash.com/photo-1579008478087-1d3268523f13?w=800&h=600&fit=crop';

    // In a browser environment, we can't reliably check if a local file exists
    // So we'll use a more robust approach: create an Image object and set up event handlers
    const img = new Image();

    // Create a promise that resolves when the image loads or rejects when it fails
    const checkImageExists = new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Image ${photo.photoFile} not found`));

      // Add a timestamp to prevent caching
      img.src = `${photo.photoFile}?t=${new Date().getTime()}`;
    });

    try {
      // Wait for the image to load or fail
      await checkImageExists;
      // If we get here, the image loaded successfully
      console.log(`Local photo ${photo.photoFile} exists`);
    } catch (error) {
      // If we get here, the image failed to load
      console.log(`Local photo ${photo.photoFile} not found, using fallback URL: ${fallbackUrl}`);
      photo.photoFile = fallbackUrl;
    }
  }
};

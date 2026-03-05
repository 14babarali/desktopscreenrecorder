/**
 * Screen capture utilities for Electron
 */
import { desktopCapturer } from 'electron';

class ScreenCapture {
  async getSources() {
    try {
      const sources = await desktopCapturer.getSources({
        types: ['window', 'screen'],
        thumbnailSize: { width: 320, height: 180 }
      });
      
      return sources.map(source => ({
        id: source.id,
        name: source.name,
        thumbnail: source.thumbnail.toDataURL(),
        display_id: source.display_id,
        appIcon: source.appIcon ? source.appIcon.toDataURL() : null
      }));
    } catch (error) {
      console.error('Error getting sources:', error);
      throw error;
    }
  }

  async getScreenStream(sourceId, options = {}) {
    const constraints = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId,
          minWidth: options.minWidth || 1280,
          maxWidth: options.maxWidth || 3840,
          minHeight: options.minHeight || 720,
          maxHeight: options.maxHeight || 2160,
          minFrameRate: options.minFrameRate || 15,
          maxFrameRate: options.maxFrameRate || 60
        }
      }
    };

    return await navigator.mediaDevices.getUserMedia(constraints);
  }
}

export default new ScreenCapture();

/**
 * Electron preload script
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getSources: () => ipcRenderer.invoke('get-sources'),
  getAudioDevices: () => ipcRenderer.invoke('get-audio-devices'),
});

/**
 * Media devices utilities
 */

export const getScreenStream = async (sourceId, options = {}) => {
  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: sourceId,
        minWidth: 1280,
        maxWidth: 3840,
        minHeight: 720,
        maxHeight: 2160,
      },
    },
  };

  return await navigator.mediaDevices.getUserMedia(constraints);
};

export const getMicrophoneStream = async (deviceId = null) => {
  const constraints = {
    audio: {
      deviceId: deviceId ? { exact: deviceId } : undefined,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  };

  return await navigator.mediaDevices.getUserMedia(constraints);
};

export const getCameraStream = async (deviceId = null) => {
  const constraints = {
    video: {
      deviceId: deviceId ? { exact: deviceId } : undefined,
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
  };

  return await navigator.mediaDevices.getUserMedia(constraints);
};

export const getAudioDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === 'audioinput');
};

export const getVideoDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === 'videoinput');
};

export const mergeAudioStreams = (streams) => {
  const audioContext = new AudioContext();
  const destination = audioContext.createMediaStreamDestination();

  streams.forEach((stream) => {
    if (stream.getAudioTracks().length > 0) {
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(destination);
    }
  });

  return destination.stream;
};

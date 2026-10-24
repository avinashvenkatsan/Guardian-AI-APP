// Web Audio API emergency sound synthesizer
// Completely self-contained, offline-capable, and works without external media files

let audioCtx: AudioContext | null = null;
let sirenOscillator: OscillatorNode | null = null;
let sirenGain: GainNode | null = null;
let sirenInterval: any = null;
let isPlaying = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a loud, distinctive multi-tone emergency disaster alarm (air-raid / warning siren)
 */
export function playEmergencyAlarm(): void {
  try {
    if (isPlaying) return;
    const ctx = getAudioContext();
    isPlaying = true;

    sirenGain = ctx.createGain();
    sirenGain.gain.setValueAtTime(0.3, ctx.currentTime);
    sirenGain.connect(ctx.destination);

    sirenOscillator = ctx.createOscillator();
    sirenOscillator.type = 'sawtooth';
    sirenOscillator.frequency.setValueAtTime(650, ctx.currentTime);
    sirenOscillator.connect(sirenGain);
    sirenOscillator.start();

    // Modulate pitch between 500Hz and 950Hz to create a classic urgent emergency sweep
    let high = true;
    sirenInterval = setInterval(() => {
      if (!ctx || !sirenOscillator) return;
      const targetFreq = high ? 950 : 520;
      sirenOscillator.frequency.exponentialRampToValueAtTime(
        targetFreq,
        ctx.currentTime + 0.45
      );
      high = !high;
    }, 500);
  } catch (err) {
    console.warn('Audio alert could not play automatically:', err);
  }
}

/**
 * Stops the continuous emergency alarm
 */
export function stopEmergencyAlarm(): void {
  if (sirenInterval) {
    clearInterval(sirenInterval);
    sirenInterval = null;
  }
  if (sirenOscillator) {
    try {
      sirenOscillator.stop();
      sirenOscillator.disconnect();
    } catch {}
    sirenOscillator = null;
  }
  if (sirenGain) {
    try {
      sirenGain.disconnect();
    } catch {}
    sirenGain = null;
  }
  isPlaying = false;
}

export function isAlarmPlaying(): boolean {
  return isPlaying;
}

/**
 * Plays a short, pleasant high-urgency chime for incoming alert notifications
 */
export function playNotificationChime(): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.12); // D6
    osc.frequency.setValueAtTime(1760, ctx.currentTime + 0.25); // A6

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (err) {
    console.warn('Notification chime failed:', err);
  }
}

import { makeObservable, observable, action, runInAction } from 'mobx';
import { fetchAudio } from '@/services/api';

import authStore from './authStore';

export class PlayerStore {
  trackID: string = '';
  trackName: string = '';
  playState: 'play' | 'pause' = 'pause';
  preview: string | null = null;
  audio: HTMLAudioElement | undefined;

  constructor() {
    makeObservable(this, {
      playState: observable,
      trackName: observable,
      play: action,
      pause: action,
      initAudio: action,
      reInitAudio: action,
    });
  }

  play() {
    if (!this.audio) {
      return;
    }

    this.audio.play();
    this.playState = 'play';
  }

  pause() {
    if (!this.audio) {
      return;
    }

    this.audio.pause();
    this.playState = 'pause';
  }

  async initAudio(id: string, name: string) {
    if (this.trackID !== id) {
      this.pause();
      this.audio = undefined;

      this.trackID = id;
      this.trackName = name;

      await this.fetchAudio(id);
    }
  }

  async fetchAudio(id: string) {
    if (authStore.accessToken === undefined) {
      throw new ReferenceError('accessToken is not provided');
    }

    try {
      const preview = await fetchAudio(authStore.accessToken, id);

      runInAction(() => {
        if (preview) {
          this.audio = new Audio(preview);
          this.audio.crossOrigin = 'anonymous';
        }

      });
    } catch (err) {
      runInAction(() => {
        this.audio = undefined;
      });

      console.error(err);
    }
  }

  reInitAudio() {
    if (!this.audio) {
      return;
    }

    const preview = this.audio.src;
    this.audio = new Audio(preview);
    this.audio.crossOrigin = 'anonymous';
  }
}

export default new PlayerStore();

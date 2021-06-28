import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import playerStore from '@/stores/playerStore';

interface Props {
  className?: string;
}

function Visualizer({ className }: Props) {
  const canvasRef = React.createRef<HTMLCanvasElement>();
  const audio = playerStore.audio;
  const playState = playerStore.playState;

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = playerStore.audio;

    if (!canvas || !audio) {
      return;
    }

    const ctx = canvas.getContext('2d');
    const audioCtx = 'AudioContext' in window ? new window.AudioContext() : new window.webkitAudioContext();

    const analyzer = audioCtx.createAnalyser();
    analyzer.fftSize = 256;

    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyzer);
    source.connect(audioCtx.destination);

    const bufferLength = analyzer.frequencyBinCount;
    const data = new Uint8Array(bufferLength);

    const ratio = analyzer.fftSize / canvas.height;

    function visualize(data: Uint8Array) {
      if (!canvas || !ctx) {
        return;
      }

      analyzer.getByteFrequencyData(data);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for(var i = 0; i < bufferLength; i++) {
        barHeight = data[i] / ratio;

        ctx.fillStyle = `rgb(${data[i]},100,100)`;

        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    let animationID = requestAnimationFrame(animate);

    function animate() {
      animationID = requestAnimationFrame(animate);
      analyzer.getByteFrequencyData(data);
      visualize(data);
    }

    return () => {
      window.cancelAnimationFrame(animationID);
      analyzer.disconnect();
      source.disconnect(analyzer);
      source.disconnect(audioCtx.destination);
      audioCtx.close();

      // In order to avoid bug with reusing same audio element, I decided to reinit audio object here
      playerStore.reInitAudio();
    }
  }, [canvasRef, audio, playState]);

  return (
    <canvas className={className} width="100" height="30" ref={canvasRef} />
  );
}

export default observer(Visualizer);
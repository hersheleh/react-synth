'use client'
import type {ChangeEvent, MouseEvent } from 'react';
import { useState, useEffect } from 'react';


export default function Page() {
  // Display the

  const [audioContext, setAudioContext] = useState<AudioContext>();
  const [attackTime, setAttackTime] = useState(0.2);
  const [releaseTime, setReleaseTime] = useState(0.5);
  const [tempo, setTempo] = useState(60.0);
  // const [lookahead, setLookahead] = useState(25.0);
  // const [scheduleAheadTime, setScheduleAheadTime] = useState(0.1);
  const [currentNote, setCurrentNote] = useState(0);
  const [nextNoteTime, setNextNoteTime] = useState(0.0);
  const [notesInQueue, setNotesInQueue] = useState<number[]>([]);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const lookahead = 25.0;
  const scheduleAheadTime = 0.1;

  useEffect(() => {
    if (audioContext == null) {
      const audioCtx: AudioContext | undefined = new AudioContext();
      setAudioContext(audioCtx);

    }
  }, [audioContext]);

  function attackControl(event: ChangeEvent) {
    const target = event.target as HTMLButtonElement;
    setAttackTime(parseInt(target.value));
  }

  function releaseControl(event: ChangeEvent) {
    const target = event.target as HTMLButtonElement;
    setReleaseTime(parseInt(target.value));
  }

  function tempoControl(event: ChangeEvent) {
    const target = event.target as HTMLButtonElement;
    setTempo(parseInt(target.value));
  }

  function nextNote() {
    const secondsPerBeat = 60.0 / tempo;
    setNextNoteTime(nextNoteTime + secondsPerBeat);
    setCurrentNote((currentNote + 1) % 4);
  }

  function scheduleNote(beatNumber: number, time: number) {
    const newNotes = notesInQueue.concat(beatNumber, time)
    setNotesInQueue(newNotes);
    playSweep;
    // if (pads[0].querySelectorAll("input")[beatNumber].checked) {
    //   playSweep(time);
    // }
  }

  function playSeq(event: MouseEvent) {

    if (audioContext == undefined) {
      return;
    }

    setIsPlaying(!isPlaying);
    const target = event.target as HTMLButtonElement;

    if (isPlaying) {
      if (audioContext.state == "suspended") {
        audioContext?.resume();
      }

      setCurrentNote(0);
      setNextNoteTime(audioContext.currentTime);
      scheduler();
      target.dataset.playing = "true";

    } else {
      clearTimeout(timerId);
      target.dataset.playing = "fasle";
    }
  }

  function scheduler() {
    if (audioContext == null){
      return;
    }
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
      scheduleNote(currentNote, nextNoteTime);
      nextNote();
    }
    const timerID = setTimeout(scheduler, lookahead);
    setTimerId(timerID);
  }

  function  playSweep(time: number) {

    if (audioContext != null) {

      console.log(audioContext.state);
      if (audioContext.state == "suspended") {
        audioContext.resume();
        console.log("Resumed");
      }
      const osc = new OscillatorNode(audioContext, {
            frequency: 380,
            type: "sawtooth",
      });
      const sweepLength = 2;
      const sweepEnv = new GainNode(audioContext);
      sweepEnv.gain.cancelScheduledValues(time);
      sweepEnv.gain.setValueAtTime(0, time);
      sweepEnv.gain.linearRampToValueAtTime(1, time + attackTime);
      sweepEnv.gain.linearRampToValueAtTime(0, time + sweepLength - releaseTime);

      osc.connect(sweepEnv).connect(audioContext.destination);
      osc.start(time);
      osc.stop(time + 1);
    }
  }

  return (
    <div>
      <label htmlFor="attack">Attack {attackTime}</label>
      <input
        onChange={attackControl}
        name="attack"
        id="attack"
        type="range"
        min="0"
        max="1"
        value={attackTime}
        step="0.1"/>
      <label htmlFor="release">Release</label>
      <input
        onChange={releaseControl}
        name="release"
        id="release"
        type="range"
        min="0"
        max="1"
        value={releaseTime}
        step="0.1"/>
      <label htmlFor="tempo">Tempo</label>
      <input
        onChange={tempoControl}
        name="tempo"
        id="tempo"
        type="range"
        min="30"
        max="120"
        value={tempo}
        step="0.1"/>
      <button onClick={playSeq}>Play</button>

    </div>

  );
}


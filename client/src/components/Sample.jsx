import { onMount, createSignal, createEffect, Show } from "solid-js";

import styles from "../styles/Sample.module.css";

import sample from "../assets/sample.wav";

function Sample(props) {
  let sampleContainerElement;
  let waveformContainerElement;

  //Make this global
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [isHovering, setisHovering] = createSignal(false);
  const [icon, setIcon] = createSignal("soundwave");

  createEffect(() => {
    if (isHovering()) {
      setIcon("play-fill");
    } else {
      setIcon("soundwave");
    }
    if (isPlaying()) {
      setIcon("pause-fill");
    }
  });

  onMount(() => {
    var wavesurfer = WaveSurfer.create({
      container: waveformContainerElement,
      waveColor: "#4C90F0",
      progressColor: "#184A90",
      fillParent: true,
      cursorWidth: 2,
      height: 50,
    });

    wavesurfer.load(
      "http://localhost:1337/" + props.audiosrc.replace("#", "%23")
    );

    sampleContainerElement.addEventListener("click", (e) => {
      // Dont play sound when clicking buttons
      if(e.target.classList.contains("bi") == true && e.target.id != "playbtn") {
        return null;
      }
      // Dont play sound when clicking the waveform
      if(e.target.tagName == "WAVE") {
        return null;
      }

      // else, play the sound
      if (isPlaying()) {
        wavesurfer.pause();
        setIsPlaying(false);
      } else {
        wavesurfer.play();
        props.setPlayingData(props);
        setIsPlaying(true);
      }
    });

    sampleContainerElement.addEventListener("mouseenter", () => {
      setisHovering(true);
    });

    sampleContainerElement.addEventListener("mouseleave", () => {
      setisHovering(false);
    });

    wavesurfer.on("finish", function () {
      setIsPlaying(false);
    });
  });

  return (
    <div
      class={styles.Sample}
      ref={sampleContainerElement}
      onMouseEnter={() => setisHovering(true)}
      onMouseLeave={() => setisHovering(false)}
    >
      <input type="checkbox" />
      <img src={props.imgsrc} alt="" />
      <i
       id= "playbtn"
        style={{
          color: `${icon() == "soundwave" ? "white" : "var(--blue-4)"}`,
        }}
        class={`bi bi-${icon()}`}
      ></i>
      <div class={styles.tagNameContainer}>
        <b>{props.name}</b>
        <Show when={props.tags.length > 0}>
          <div>
            <For each={props.tags}>{(tag, i) => <p>{tag}</p>}</For>
          </div>
        </Show>
      </div>
      <div class={styles.waveFormMetadataContainer}>
        <div
          class={styles.waveform}
          id={props.identifier}
          ref={waveformContainerElement}
        ></div>
        <div class={styles.metaData}>
          <p class={styles.duration}>
            0:02
            <Show when={props.header}>
              <span class={styles.tableHeader}>Duration</span>
            </Show>
          </p>
          <p>
            C
            <Show when={props.header}>
              <span class={styles.tableHeader}>Key</span>
            </Show>
          </p>
          <p>
            --
            <Show when={props.header}>
              <span class={styles.tableHeader}>BPM</span>
            </Show>
          </p>
          <p>
            One-shot
            <Show when={props.header}>
              <span class={styles.tableHeader}>Type</span>
            </Show>
          </p>
        </div>
      </div>
      <div class={styles.actions}>
        <a href={"http://localhost:1337/" + props.audiosrc.replace("#", "%23")}>
          <i class="bi bi-file-arrow-down"></i>
        </a>
        <i class="bi bi-three-dots-vertical"></i>
      </div>
    </div>
  );
}

export default Sample;

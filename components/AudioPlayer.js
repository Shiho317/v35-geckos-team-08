import React, { useState, useRef, useEffect } from 'react'
import styles from "../components/AudioPlayer.module.css";
import utilsStyles from '../styles/utils.module.css';
import Image from 'next/image';
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import { FaPlay, FaPause } from "react-icons/fa"
//

const AudioPlayer = () => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    // changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    // changePlayerCurrentTime();
  }

  // const changePlayerCurrentTime = () => {
  //   progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
  //   setCurrentTime(progressBar.current.value);
  // }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  }

  return (
    <section
      className={`${utilsStyles.bg_white} ${styles.audio_player_section}`}
      id="episodes"
    >
      <div className={styles.audio_player_section_container}>
        <h2 className={utilsStyles.font_black}>
          <span className={utilsStyles.font_accent}>E</span>pisodes
        </h2>
        <div className={styles.image_wrapper}>
          <Image
            priority
            src="/assets/sample_profile_pic.jpeg"
            layout="fill"
            objectFit="cover"
            objectPosition="left top"
            alt="profile-dummy"
            style={{ boxShadow: "0 0 10 black" }}
          />
        </div>
        {/* episode_info_section */}
        <div className={styles.episode_info_section}>
          {/* <div className={styles.episode_title}> */}
          {/* <div> */}
            <h3>003 Occupy</h3>
            <h4>-Raid of Zuccati Park-</h4>
            <h5>Nov.15th, 12-2am On Air</h5>
          {/* </div> */}
          <div className={styles.episode_details}>
            <p>Velit tincidunt ultricies dictum at. Amet, lectus gravida in enim proin mauris elit eu leo. Suspendisse pharetra donec erat aliquet consectetur lectus vitae, fermentum. Tempus, vulputate etiam in tristique volutpat vestibulum. Odio penatibus at vitae consectetur sed.</p>
          </div>
        </div>

        <div className={styles.audioPlayer}>
          <audio ref={audioPlayer} src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3" preload="metadata"></audio>
          <div className={styles.audioPlayerPlaybutton}>
            <button className={styles.forwardBackward} onClick={backThirty}><BsArrowLeftShort /> 30</button>
            <button onClick={togglePlayPause} className={styles.playPause}>
              {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
            </button>
            <button className={styles.forwardBackward} onClick={forwardThirty}>30 <BsArrowRightShort /></button>
          </div>

          <div className={styles.audioPlayerBar}>
            {/* current time */}
            <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

            {/* progress bar */}
            <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />


            {/* duration */}
            <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>

          </div>
        </div>
      </div>
    </section>
  )
}

export { AudioPlayer }
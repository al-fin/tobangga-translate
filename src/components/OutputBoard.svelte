<script>
  import {input, lang, output} from '../stores.js';
  import Speech from 'speak-tts' // es6

  $: outputLang = $lang == 'id' ? 'to' : 'id';

  let is_speaking = false;

  const speech = new Speech() // will throw an exception if not browser supported
    if(speech.hasBrowserSupport()) { // returns a boolean
        console.log("speech synthesis supported")
    }

    speech.init({     
      'volume': 1,
      'lang': 'id-ID',
      'rate': 1,
      'pitch': 1,
      'splitSentences': true,
      'voice':'Google Bahasa Indonesia',
      'listeners': {
        'onvoiceschanged': (voices) => {
            console.log("Event voiceschanged", voices)  
        },
      }
    }).then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
      console.log("Speech is ready, voices are available", data)
    }).catch(e => {
        console.error("An error occured while initializing : ", e)
    })

  function handleSpeak() {
    console.log('clicked')
    if (outputLang === 'to') {
      speech.setRate(1.25)
      speech.setPitch(0.1)
    } else {
      speech.setRate(1);
      speech.setPitch(1)
    }
    speech.speak({
      text: $output,
      queue: false, // current speech will be interrupted,
      listeners: {
        onstart: () => {
            console.log("Start utterance")
            is_speaking = true;
        },
        onend: () => {
            console.log("End utterance")
            is_speaking = false;
        },
        onresume: () => {
            console.log("Resume utterance")
        },
      }
    }).then(() => {
        console.log("Success !")
    }).catch(e => {
        console.error("An error occurred :", e)
    })
  }

</script>

<div class="container">
  <p class="lang">{$lang === 'id' ? 'Tobangga' : 'Indonesia'} :</p>
  <textarea readonly bind:value={$output} class="textarea" rows="4" placeholder="Hasil terjemahan akan muncul disini!"></textarea>
  <button class="btn-audio" on:click={handleSpeak} class:is_speaking>
    <img src="../images/audio-lime.svg" class="icon" alt="icon" />
  </button>
</div>

<style>
  .container {
    width: 100%;
    min-height: 150px;
    background: #60B438;
    border-radius: 0px 0px 24px 24px;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
  }
  .textarea {
    color: #FFF;
    font-size: 12pt;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    width: 100%;
    font-family: Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",
    sans-serif;
  }
  .textarea::placeholder {
    color: #7AD94C;
  }
  .lang {
    color: gold;
    font-size: 12pt;
    margin: 0;
    padding: 0;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .btn-audio {
    border: none;
    background: none;
    position: absolute;
    border-radius: 50%;
    transition: 0.25s ease-out;
    bottom: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .is_speaking {
    background: rgba(217, 237, 162, 0.2);
  }
  .icon {
    width: 24px;
    height: 24px;
  }

</style>
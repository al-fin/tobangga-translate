<script>
  import {input, lang} from '../stores.js';
  import Speech from 'speak-tts' // es6

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
    if ($lang === 'to') {
      speech.setRate(1.25)
      speech.setPitch(0.1)
    } else {
      speech.setRate(1);
      speech.setPitch(1)
    }
    speech.speak({
      text: $input,
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
  <p class="lang">{$lang === 'id' ? 'Indonesia' : 'Tobangga'} :</p>
  <textarea autofocus bind:value={$input} class="textarea" rows="4" placeholder="Ketikkan sesuatu..."></textarea>
  <button class="btn-audio" on:click={handleSpeak} class:is_speaking>
    <img src="../images/audio-green.svg" class="icon" alt="icon" />
  </button>
</div>

<style>
  .container {
    transform: translateY(-25px);
    width: 100%;
    min-height: 150px;
    padding: 20px;
    padding-top:45px;
    box-sizing: border-box;
    position: relative;
    background: #D9EDA2;
    box-shadow: 0px 4px 24px rgba(96, 180, 56, 0.5);
    z-index: 1;
  }
  .lang {
    color: #4C9C26;
    font-size: 12pt;
    margin: 0;
    padding: 0;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .textarea {
    color: #60B438;
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
    color: rgba(96, 180, 56, 0.3);;
  }
  .btn-audio {
    border: none;
    background: none;
    position: absolute;
    border-radius: 50%;
    transition: 0.3s ease-out;
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
    background: rgba(96, 180, 56, 0.2);
  }
  .icon {
    width: 24px;
    height: 24px;
  }

</style>
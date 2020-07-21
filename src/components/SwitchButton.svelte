<script>
  import {input, output, lang} from '../stores.js';
  
  $: rotate = $lang === "id"

  function switchLanguage() {
    const newLang = $lang === 'id' ? 'to' : 'id';
    input.set($output)
    lang.set(newLang)
  }

</script>


  <div class="container">
    <div class="container-btn">
      <button class="btn-switch" on:click={switchLanguage}>
        <img src="../images/switch.svg" alt="switch button" class="switch" class:rotate>
      </button>
    </div>
  </div>

<style>
  .container {
    position: relative;
    z-index: 3;
    height: 0;
  }
  .container-btn {
    position: relative;
    display: flex;
    justify-content: center;
    transform: translateY(-30px);
  }
  .btn-switch {
    border: none;
    background: none;
    padding: 0;
  }
  .switch {
    width: 60px;
    height: 60px;
    transition: 0.5s ease-out;
  }
  .rotate {
    transform: rotate(180deg);
  }
</style>
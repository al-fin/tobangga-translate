<script>
	import Title from './components/Title.svelte';
	import OutputBoard from './components/OutputBoard.svelte';
  import InputBoard from './components/InputBoard.svelte';
  import SwitchButton from './components/SwitchButton.svelte';
	import {translate} from './core.js';	
</script>

<div class="screen">
	<Title />
  <OutputBoard />
  <SwitchButton />
	<InputBoard />
</div>

<style>
	.screen {
		width: 100vw;
		max-width: 480px;
		height: 100vh;
		margin: 0 auto;
    position: fixed;
    background-position:center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-image: url('../images/background.jpeg'); 
	}
</style>
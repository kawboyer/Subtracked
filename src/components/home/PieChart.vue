<template>
  <div id="canvas-holder" style="width:40%">
		<canvas id="chart-area"></canvas>
	
    <button id="randomizeData">Randomize Data</button>
    <button id="addDataset">Add Dataset</button>
    <button id="removeDataset">Remove Dataset</button>
  </div>
</template>

<script>
import PieExample from '@/components/PieChart.js'
import VueCharts from 'vue-chartjs'

export default {
  extends: Pie,
  name: 'app',
  components: {
    PieExample
  }
}
</script>

<style>

</style>
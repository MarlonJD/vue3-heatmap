<style scoped>
  .heatmapContainer {
    position: relative;
    width: 1280px;
    height: 720px;
    background-image: v-bind("backgroundImage");
  }

  .heatmapLegend {
    background: rgba(0, 0, 0, 0.05);
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
    border-radius: 12px;
    max-width: 200px;
  }

  .heatmapLegend>h3 {
    font-weight: 200;
  }

  .heatmapCase {
    position: absolute;
    z-index: 1;
  }

  .heatmapPin {
    left: v-bind("calculatePinX");
    top: v-bind("calculatePinY");
    position: absolute;
    z-index: 1;
    height: 20px;
    width: 20px;
  }
</style>

<template>
  <div class="heatmapContainer">
    <!--- Cases --->
    <template v-if="cases">
      <template v-for="heatmapCase in cases" v-bind:key="heatmapCase.id">
        <span class="heatmapCase"
          :style="createCase(heatmapCase.x, heatmapCase.y, heatmapCase.category, heatmapCase.value, heatmapCase.radius)"
          data-bs-toggle="tooltip" data-bs-placement="top"
          :title="'Value: ' +heatmapCase.value + ' Radius: ' + heatmapCase.radius"
          @click="functionName(heatmapCase.id)"></span>
      </template>
    </template>
    <!--- /Cases --->
    <!--- Legend --->
    <template v-if="cases">
        <div class="heatmapLegend">
          <h3>{{ legendTitle }}</h3>
          <div class="row">
            <template v-for="category in categories" v-bind:key="category.id">
            <div class="col-2 legend-color">
              <span class="heatmapCase" :style="createLegendCase(category.red, category.green, category.blue, 3, 2)"></span>
            </div>
            <div class="col-10 legend-value">
              {{ category.name }}
            </div>
            </template>
          </div>
        </div>
    </template>
    <!--- /Legend --->
    <!--- Pin --->
    <template v-if="pinActive">
        <div class="heatmapPin">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></svg>
        </div>
    </template>
    <!--- /Pin --->
  </div>
</template>

<script>
  export default {
    name: 'vue-heatmap',
    props: {
      backgroundImage: String,
      legendTitle: String,
      categories: Array,
      cases: Array,
      functionName: Function,
      pinX: Number,
      pinY: Number,
      pinActive: Boolean
    },
    computed: {
      calculatePinX: function() {
        return this.pinX - 10;
      },
      calculatePinY: function() {
        return this.pinY - 30;
      }
    },
    methods: {
      createLegendCase(r, g, b, value, radius) {
        return `${this.createSizeForCase(radius)}${this.createBackgroundForCase(value, r, g, b)}`;
      },
      createCase(x, y, categoryId, value, radius) {
        let rId = this.categories.findIndex(category => category.id === categoryId);
        if (rId === -1) {
          return console.log(`Error: Category ${categoryId} not found.`);
        }
        let r = this.categories[rId].red;
        let g = this.categories[rId].green;
        let b = this.categories[rId].blue;
        return `left: ${x}px;top:${y}px;${this.createSizeForCase(radius)}${this.createBackgroundForCase(value, r, g, b)}`;
      },
      createBackgroundForCase(value, r, g, b) {
        if (value == 5) {
          return `background: radial-gradient(circle, rgba(${r},${g},${b}, 1) 0%, rgba(${r},${g},${b}, 1) 20%, rgba(${r},${g},${b}, 0.7) 35%, rgba(${r},${g},${b},0) 70%)`;
        } else if (value == 4) {
          return `background: radial-gradient(circle, rgba(${r},${g},${b}, 0.9) 0%, rgba(${r},${g},${b}, 0.9) 20%, rgba(${r},${g},${b}, 0.5) 35%, rgba(${r},${g},${b},0) 70%)`;
        } else if (value == 3) {
          return `background: radial-gradient(circle, rgba(${r},${g},${b}, 0.7) 0%, rgba(${r},${g},${b}, 0.7) 20%, rgba(${r},${g},${b}, 0.3) 35%, rgba(${r},${g},${b},0) 70%)`;
        } else if (value == 2) {
          return `background: radial-gradient(circle, rgba(${r},${g},${b}, 0.5) 0%, rgba(${r},${g},${b}, 0.5) 20%, rgba(${r},${g},${b}, 0.2) 35%, rgba(${r},${g},${b},0) 70%)`;
        } else if (value == 1) {
          return `background: radial-gradient(circle, rgba(${r},${g},${b}, 0.3) 0%, rgba(${r},${g},${b}, 0.3) 20%, rgba(${r},${g},${b}, 0.1) 35%, rgba(${r},${g},${b},0) 70%)`;
        }
      },
      createSizeForCase(radius) {
        if (radius == 5) {
          return `width:${50}px; height:${50}px;`;
        } else if (radius == 4) {
          return `width:${40}px; height:${35}px;`;
        } else if (radius == 3) {
          return `width:${35}px; height:${35}px;`;
        } else if (radius == 2) {
          return `width:${27}px; height:${27}px;`;
        } else if (radius == 1) {
          return `width:${20}px; height:${20}px;`;
        }
      },
    }
  }
</script>
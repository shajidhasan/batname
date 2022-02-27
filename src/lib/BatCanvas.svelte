<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { saveAs } from "file-saver";

  import type { BatData } from "../App.svelte";

  import batmanBg from "../assets/batman_logo_bg_1200.jpg";
  import DownloadErrorModal from "./DownloadErrorModal.svelte";

  export let batData: BatData;

  const SCALE = 0.5;
  const ELONGATE = 1.2;
  const MAX_TEXT_SCALE = 8.0;

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  let downloadError: boolean = false;

  const backgroundImage = new Image();
  backgroundImage.src = batmanBg;

  const dispatch = createEventDispatcher();

  const resetCanvas = () => {
    resetScale();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "source-over";
  };

  const resetScale = () => {
    context.setTransform(1, 0, 0, 1, 0, 0);
  };

  const generate = () => {
    resetCanvas();

    context.scale(SCALE, SCALE);
    context.drawImage(
      backgroundImage,
      (canvas.width - backgroundImage.width * SCALE) / 2 / SCALE,
      (canvas.height - backgroundImage.height * SCALE) / 2 / SCALE
    );

    context.globalCompositeOperation = "destination-in";

    resetScale();

    context.font = batData.isBengali
      ? "800 25px 'Baloo Da 2'"
      : "25px 'Anton'";

    const measurement = context.measureText(batData.name);
    const textScale = Math.min(
      (SCALE * canvas.width) / measurement.width,
      MAX_TEXT_SCALE
    );
    console.log(textScale);
    context.scale(textScale, textScale * ELONGATE);
    context.fillStyle = "white";
    context.fillText(
      batData.name,
      (canvas.width - measurement.width * textScale) / 2 / textScale,
      (canvas.height +
        measurement.actualBoundingBoxAscent * textScale * ELONGATE +
        (batData.isBengali
          ? 0
          : measurement.actualBoundingBoxDescent * textScale * ELONGATE)) /
        2 /
        textScale /
        ELONGATE
    );
    resetScale();
    context.globalCompositeOperation = "destination-over";
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const editName = () => {
    dispatch("edit");
  };

  const download = () => {
    try {
      canvas.toBlob((blob) => {
        saveAs(blob, `${batData.name}.png`);
      });
    } catch (exception) {
      downloadError = true;
    }
  };

  onMount(() => {
    context = canvas.getContext("2d");
  });

  $: {
    if (context && batData.name) {
      generate();
    }
  }
</script>

<div class="relative">
  <div class="absolute right-0 top-0">
    <button class="canvas-button" on:click={editName}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
        />
      </svg>
    </button>
    <button class="canvas-button" on:click={download}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>

  <canvas bind:this={canvas} height="800" width="1200" class={$$props.class} />
</div>

{#if downloadError}
  <DownloadErrorModal
    on:close={() => {
      downloadError = false;
    }}
  />
{/if}

<style lang="postcss">
  .canvas-button {
    @apply p-2 text-sm font-semibold text-red-100 bg-red-700 hover:bg-red-600 rounded-lg;
  }
</style>

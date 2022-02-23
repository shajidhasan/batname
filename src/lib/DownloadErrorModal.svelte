<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { scale } from "svelte/transition";

  const dispatch = createEventDispatcher();
</script>

<div
  transition:scale={{ start: 1.5 }}
  class="bg-black fixed inset-0 flex flex-col items-center justify-center text-red-700 p-4"
>
  <div class="w-full sm:w-1/2 md:w-1/3">
    <h1 class="text-3xl mb-10 w-full">Error encountered!</h1>
    <p class="uppercase">
      Couldn't download your logo, sorry. Are you in a Facebook/Messenger
      embedded browser? Open this browser in the dedicated browser and try
      again!
    </p>
    <button
      class="float-right mt-10 px-8 py-2 bg-red-700 hover:bg-red-600 font-semibold text-red-100 rounded disabled:opacity-0 transition-opacity ease-in-out duration-300"
      on:click={() => dispatch("close")}
    >
      Okay
    </button>
  </div>
</div>

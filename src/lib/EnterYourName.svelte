<script lang="ts">
  import { scale } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let name: string;
  export let ref: any;

  const dispatch = createEventDispatcher();
</script>

<div
  transition:scale={{ start: 1.5 }}
  class="bg-black fixed inset-0 flex flex-col items-center justify-center text-red-700 p-4"
>
  <form
    class="w-full sm:w-1/2 md:w-1/3"
    on:submit|preventDefault={() => dispatch("submit", name)}
  >
    <h1 class="text-3xl mb-10 w-full uppercase">Enter your name</h1>
    <input
      type="text"
      class="bg-transparent border-0 border-b-2 uppercase border-b-red-600 focus:ring-0 focus:border-b-red-600 text-center text-4xl w-full font-bold"
      bind:value={name}
      bind:this={ref}
    />

    <button
      class="float-right mt-10 px-8 py-2 bg-red-700 uppercase hover:bg-red-600 font-semibold text-red-100 rounded disabled:opacity-0 transition-opacity ease-in-out duration-300"
      disabled={name ? false : true}
      type="submit"
    >
      GO
    </button>
  </form>
  <div class="font-bengali font-[800] opacity-0">স্বাগতম!</div>
</div>

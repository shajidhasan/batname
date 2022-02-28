<script lang="ts" context="module">
  export interface BatData {
    name: null | string;
    isBengali: boolean;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import EnterYourName from "./lib/EnterYourName.svelte";
  import BatCanvas from "./lib/BatCanvas.svelte";
  import Disclaimer from "./lib/Disclaimer.svelte";

  let nameRef: any;

  let batData: BatData = {
    name: null,
    isBengali: false,
  };

  let nameDialogOpen: boolean = true;

  onMount(() => {
    nameRef.focus();
  });

  const isBengali = (name: string) => {
    for (let c of name) {
      if (/^[\u0980-\u09ff]+$/.test(c)) {
        return true;
      }
    }
    return false;
  };

  const nameSubmit = (event: { detail: string }) => {
    batData = {
      name: event.detail.toUpperCase(),
      isBengali: isBengali(event.detail),
    };
    console.log(batData);
    nameDialogOpen = false;
  };
</script>

<main
  class="min-h-screen bg-black text-white/80 flex flex-col items-center justify-center p-4 space-y-4 selection:text-red-100 selection:bg-red-700"
>
  <BatCanvas
    {batData}
    on:edit={() => {
      nameDialogOpen = true;
    }}
    class="w-full md:max-w-lg lg:max-w-xl rounded-lg ring-2 ring-red-800/50"
  />
  <Disclaimer />

  {#if nameDialogOpen}
    <EnterYourName
      name={batData.name}
      on:submit={nameSubmit}
      bind:ref={nameRef}
    />
  {/if}
</main>

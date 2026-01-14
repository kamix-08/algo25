<script>
  import countries from "./countries.json"

  function getUrl(code) {
    return `https://flagicons.lipis.dev/flags/4x3/${code.toLowerCase()}.svg`
  }

  let value = "pl"
</script>

<div class="flex lex-row justify-center mt-20">
  <select bind:value={value}>
  {#each countries as {name, code}}
    <option value={code}>{name}</option>
  {/each}
  </select>
  
  <img src={getUrl(value)} alt="tmp" class="w-sm border-2 border-solid border-black">
</div>
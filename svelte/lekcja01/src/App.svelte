<script>
  import Header from "./components/Header.svelte";
  import countries from "./countries.json"

  function getUrl(code="") {
    return `https://flagicons.lipis.dev/flags/4x3/${code.toLowerCase()}.svg`
  }

  let value
</script>

<Header />

<select bind:value={value}>
{#each countries as {name, code}}
  <option value={code}>{name}</option>
{/each}
</select>

<img src={getUrl(value)} alt="tmp">
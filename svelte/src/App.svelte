<script>
  import Header from "./components/Header.svelte";

  import { Router, Route } from "svelte-routing";

  import Countires from "./components/lekcja01/Countires.svelte";
  import Colorpicker from "./components/lekcja02/Colorpicker.svelte";

  export let url = "";
</script>

<Header />

<Router url="{url}">
  <Route path="/countries"  ><Countires   /></Route>
  <Route path="/colorpicker"><Colorpicker /></Route>
  <Route path="/"></Route>
  <Route path="/*"><p class="font-bold text-5xl text-center">404 - Not found</p></Route>
</Router>
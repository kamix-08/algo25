<script>
  import Header from "./components/Header.svelte";

  import { Router, Route } from "svelte-routing";

  import Countires from "./components/lekcja01/Countires.svelte";
  import Colorpicker from "./components/lekcja02/Colorpicker.svelte";
  import Quiz from "./components/lekcja03/Quiz.svelte";
  import Jokes from "./components/lekcja04/Jokes.svelte";
  import Pokemon from "./components/lekcja05/Pokemon.svelte";
  import Pokedex from "./components/lekcja06/Pokedex.svelte";
  import PokeEntry from "./components/lekcja06/PokeEntry.svelte";

  export let url = "";
</script>

<Header />

<Router url="{url}">
  <Route path="/countries"  ><Countires   /></Route>
  <Route path="/colorpicker"><Colorpicker /></Route>
  <Route path="/quiz"       ><Quiz        /></Route>
  <Route path="/jokes"      ><Jokes       /></Route>
  <Route path="/pokemon"    ><Pokemon     /></Route>
  <Route path="/pokedex"    ><Pokedex     /></Route>

  <Route path="/pokedex/:id" let:params><PokeEntry id={params.id} /></Route>
  
  <Route path="/"></Route>
  <Route path="/*"><p class="font-bold text-5xl text-center">404 - Not found</p></Route>
</Router>
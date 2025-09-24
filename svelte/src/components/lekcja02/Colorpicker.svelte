<script>
    let r, g, b
</script>

<main class="flex flex-col items-center mt-20">
    <p class="mb-2 font-bold text-2xl">Color Picker</p>
    
    <div class="flex flex-row">
        <div id="color" style="background-color: rgb({r},{g},{b})" class="flex w-200 h-50">
            <span style="color: {Math.min(r,g,b)>=Math.floor(255/2) ? 'black' : 'white'}" class="m-auto">rgb({r},{g},{b})</span>
        </div>
    
        <div id="sliders" class="flex flex-col ml-4 justify-evenly">
            <div>
                <span>Red({r})</span>
                <input type="range" bind:value={r} min=0 max=255 class="ml-4 mt-1 float-right">
            </div>
    
            <div>
                <span>Green({g})</span>
                <input type="range" bind:value={g} min=0 max=255 class="ml-4 mt-1 float-right">
            </div>
    
            <div>
                <span>Blue({b})</span>
                <input type="range" bind:value={b} min=0 max=255 class="ml-4 mt-1 float-right">
            </div>
        </div>
    </div>
</main>
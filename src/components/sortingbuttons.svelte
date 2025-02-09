<script>

    export let month
    export let months
    export let years
    export let year

</script>

<div class="menu-container">
    <select name="month" id="month" bind:value={month}>
        <option value="All" >All</option>
        {#each months as m}
            <option value="{m}" >{m}</option>
        {/each}
    </select> 
    <select name="year" id="year" bind:value={year}>
        <option value="All" >All</option>
        {#each years as y}
            <option value="{y}" >{y}</option>
        {/each}
    </select> 
</div>
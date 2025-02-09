<script>
    export let data
    export let form

    console.log(form)
    // console.log(data)

    import { enhance } from '$app/forms';
    import Sortingbuttons from '$components/sortingbuttons.svelte';

    let refuels = data.fueling
    let months = []
    let years = []

    refuels.map(item => {
        item.date = (new Date(item.date))

        if (!months.includes(item.date.toLocaleString('en-GB', {month: 'long'}))) {
            months.push(item.date.toLocaleString('en-GB', {month: 'long'}))
        }

        if (!years.includes(item.date.toLocaleString('en-GB', {year: 'numeric'}))) {
            years.push(item.date.toLocaleString('en-GB', {year: 'numeric'}))
        }
        return item
    })

    console.log(refuels)

    let month = "All"
    let year = "All"

    $: if (month || year) {

        console.log(month, year)
        refuels = data.fueling?.filter(item => {
            return (year == "All" ? true : item.date.toLocaleString('en-GB', {year: 'numeric'}) == year) && (month == "All" ? true : item.date.toLocaleString('en-GB', {month: 'long'}) == month) 
        })

        console.log(refuels)
    }

</script>


{#if form?.error}
    <div class="error">Failed to save the data: {form?.errors}</div>
{/if}

<Sortingbuttons bind:month bind:months bind:years bind:year />

<form
method="POST" use:enhance
>
    <input  type="date" name="date" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" required><br/>
    <input type="number" step="0.01" name="liters" placeholder="liters" required/><br/>
    <input type="number" step="0.01" name="amount" placeholder="amount" required /><br/>
    <input type="number" name="total_kms" placeholder="total kilometers" required /><br/>
    <button type="submit">Save</button>

</form> 



<div class="container">
    {#each refuels as fuel}
    <div class="fuel-container">
        <div class="fuel">
            <div class="left">
            <div class="date">{fuel.date.toLocaleString('en-GB', {
                // weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}</div>
            <!-- <div class="kilos">Total kilometers: {fuel.kilometers}</div> -->
            <!-- <div class="amount">Amount spent: R{fuel.cost}</div> -->
            <div class="liters">Liters: {fuel.liters}l</div>
            <!-- <div class="price-per-liter">Price/liter: R{fuel.cost/fuel.liters}</div> -->
            </div>
            <div class="right">
                <div class="cost">
                    R{fuel.cost.toFixed(2)}
                </div>
            </div>
        </div>
        </div>
    {/each}
</div>

<style>
    .container {
        margin-left: auto;
        margin-right: auto;
        width: 50vw;
        border-radius: 5px;
        background-color: white;
    }

    .fuel-container {
        padding: 0px 5px;
        transition: box-shadow 0.2s;        
    }

    .date {
        color: var(--gray);
        font-size: 0.9rem;
    }

    .left {
        padding-left: 10px;
    }

    .fuel-container:hover {
        box-shadow: 0px 10px 10px -10px var(--gray);
    }

    .cost {
        color: var(--black);
        /* font-weight: 700; */
        font-size: 1.5rem;
        font-family: "Sanchez", serif;
        font-weight: 700;
        font-style: normal;
        background-color: var(--purple);
        border-radius: 5px;
        padding: 10px;
    }

    .fuel {
        /* margin: 5px; */
        border-bottom: 1px solid var(--black);

        padding: 10px 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: box-shadow 0.2s;
    }

    .cost {
        margin-left: auto;
        margin-right: auto;
        margin-top: auto;
        margin-bottom: auto;
    }

    .liters {
        font-size: 1.2rem;
        padding: 0px 10px;
    }
</style>
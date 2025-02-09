<slot></slot>
<style>
    :global(:root) {
        --white: #F2F1F0;
        --orange: #F2B366;
        --blue: #80BFB4;
        --black: #260124;
        --purple: #D9A3D0;
        --gray: #AA9DA7;
    }

    :global(body) {
        background-color: var(--white);
        font-family: "Cabin", serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        font-variation-settings:
            "wdth" 100
    }
</style>
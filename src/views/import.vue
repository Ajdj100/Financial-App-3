<script setup>
import {ref} from 'vue'
var step = ref(1);


</script>


<template>
    <div class="bg-base-200 rounded-box px-5 py-3 flex flex-col w-full">
        <div>
            <h1>Import</h1>
        </div>

        <ul class="steps mt-10">
            <li class="step" :style="{'step-primary': step >= 1}">Select File</li>
            <li class="step" :style="{'step-primary': step >= 2}">Preview</li>
            <!-- <li class="step">Do more stuff</li> -->
            <li class="step" :style="{'step-primary': step >= 3}">Done</li>
        </ul>

        <div class="mx-auto my-auto flex flex-col">
            <input type="file" class="file-input file-input-bordered w-full max-w-xs" accept=".csv"/>

            <div class="flex justify-between my-5">
                <button class="btn btn-neutral">Back</button>
                <button class="btn btn-primary">Next</button>
            </div>
        </div>

    </div>
</template>
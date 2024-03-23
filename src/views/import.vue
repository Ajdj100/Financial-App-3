<script setup>
import { ref } from 'vue'
import { db } from '@/main';
var step = ref(1);
var previewList = ref([]);

function nextStep() {
    step.value = step.value + 1;
}

function prevStep() {
    step.value = step.value - 1;
}

function readData() {
    const file = document.getElementById("fileInput").files[0];

    const reader = new FileReader();
    console.log('read');

    reader.addEventListener("load", () => {
        let lines = [reader.result.split('\n')];

        for (let i = 0; i < lines[0].length - 1; i++) {

            let data = lines[0][i].split(',');
            let dateStamp = Date.parse(data[0]);
            let title = data[1];
            let amount = data[2];

            //discard transactions with no deduction
            if (amount == '') {
                continue;
            }

            let obj = {
                name: title,
                value: amount,
                date: dateStamp,
            };
            previewList.value.push(obj);
        }
    });

    reader.readAsText(file);
}

async function saveToDB() {
    console.log(previewList.value);
    previewList.value.forEach(element => {
        db.execute("INSERT INTO transactions (name, amount, date) VALUES (?, ?, ?)", [element.name, element.value, element.date]);
    });
    console.log("done");
}


</script>


<template>
    <div class="bg-base-200 rounded-box px-5 py-3 flex flex-col w-full max-h-full">
        <div>
            <h1>Import</h1>
        </div>

        <ul class="steps mt-10">
            <li class="step" :class="{ 'step-primary': step >= 1 }">Select File</li>
            <li class="step" :class="{ 'step-primary': step >= 2 }">Preview</li>
            <!-- <li class="step">Do more stuff</li> -->
            <li class="step" :class="{ 'step-primary': step >= 3 }">Done</li>
        </ul>

        <!-- add file section -->
        <div class="mx-auto my-auto flex flex-col" v-show="step == 1">
            <input id="fileInput" type="file" class="file-input file-input-bordered w-full max-w-xs" accept=".csv" />

            <div class="flex justify-end my-5 w-full">
                <!-- <button class="btn btn-neutral">Back</button> -->
                <button class="btn btn-primary" @click="readData(); nextStep();">Next</button>
            </div>
        </div>

        <!-- preview section -->
        <div class="mx-auto my-auto flex flex-col" v-show="step == 2">
            <div class="overflow-auto max-h-full">
                <table class="table h-full">
                    <thead>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Value</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in previewList">
                            <td>
                                {{ new Date(item.date).toDateString() }}
                            </td>
                            <td>
                                {{ item.name }}
                            </td>
                            <td>
                                ${{ item.value }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="flex justify-between my-5">
                <button class="btn btn-neutral" @click="prevStep()">Back</button>
                <button class="btn btn-primary" @click="saveToDB(); nextStep()">Next</button>
            </div>
        </div>
        <!-- done section -->
        <div v-show="step === 3">
            <h1>Make a nice insertion message</h1>
        </div>
    </div>
</template>
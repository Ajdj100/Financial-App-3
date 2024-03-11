<script setup>
import { ref } from 'vue'
const props = defineProps(['text', 'tags', 'colors']);

var currentOption = ref('');
var currentColor = ref('#FF5050')
var createMode = ref(false);
const exitBtn = ref(null);


function setCurrentOption(option) {
    currentOption.value = option;
    document.getElementById('dumbButton').focus();
    createMode.value = false;
}

function setCurrentColor(color) {
    currentColor.value = color;
    document.getElementById('dumbButton').focus();
}

function activateCreateMode() {
    createMode.value = true;
    currentOption.value = {
        name: 'Create New',
    }
    // document.getElementById('dropdownButton').innerHTML = "Create New";
    document.getElementById('dumbButton').focus();
    // document.getElementById('GroupNameInput').focus(); // commenting this out because it doesnt work for some reason (probably isnt loaded in DOM before it tries to focus)
}

function reset() {
    currentOption.value = '';
    createMode.value = false;
}

</script>

<template>
    <!-- You can open the modal using ID.showModal() method -->
    <!-- <button class="btn" onclick="GroupsModal.showModal()">open modal</button> -->
    <dialog id="GroupsModal" class="modal">
        <div class="modal-box w-11/12 overflow-visible">

            <!-- stupid button to get around the daisyUI focus issue -->
            <button id="dumbButton"></button>

            <!-- div for dropdowns -->
            <div class="flex -mt-8 w-full justify-between items-center">
                <!-- title -->
                <h3 class="font-bold text-lg">Add to Group</h3>
                <!-- dropdown for the filter group -->
                <div id="selectFilter" class="dropdown w-64">
                    <div class="border rounded-btn m-1" :style="{ borderColor: currentOption.color }">
                        <div id="dropdownButton" tabindex="0" role="button"
                            class="btn w-full border-5 border-solid justify-start">
                            {{ currentOption.name }}
                            <p v-show="currentOption == ''">Select a Group</p>
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-52 flex-nowrap overflow-scroll overflow-x-hidden">
                        <li><a @click="activateCreateMode">Create New</a></li>
                        <!-- TODO: add behaviour for creating text box in selection area when create new is selected
                                if focus is lost and text box is empty, return to 'select a thing'
                                if focus is lost and text box is not empty, lock in name and allow for settings changes
                    -->
                        <li v-for="tag in tags"><a @click="setCurrentOption(tag)" class="border my-1"
                                :style="{ borderColor: tag.color }">{{ tag.name }}</a></li>
                    </ul>
                </div>
            </div>

            <!-- group creation option -->
            <div v-show="createMode">
                <h4>New Group</h4>
                <!-- dropdown for the color picker -->
                <div id="colorFilter" class="dropdown">
                    <div tabindex="0" role="button" class="btn m-1 pl-4">
                        <div class="size-4 rounded-full" :style="{ backgroundColor: currentColor }"></div>
                    </div>
                    <ul tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit max-h-52 flex-nowrap overflow-scroll overflow-x-hidden">
                        <li v-for="color in colors">
                            <div @click="setCurrentColor(color)">
                                <a class="size-5 rounded-full m-2 p-1" :style="{ backgroundColor: color }"></a>
                            </div>
                        </li>
                    </ul>
                </div>

                <input id="GroupNameInput" type="text" placeholder="Group Name"
                    class="input w-full max-w-xs bg-base-200 m-1 relative bottom-1/2">

            </div>

            <p>Filter Keyword</p>
            <input id="FilterNameInput" type="text" placeholder="Group Name"
                class="input w-full max-w-xs bg-base-200 m-1 relative bottom-1/2" :value="text">


            <!-- completion buttons -->
            <div class="flex justify-between">
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button, it will close the modal -->
                        <button class="btn" ref="exitBtn" @click="reset()">Cancel</button>
                    </form>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button, it will close the modal -->
                        <button class="btn btn-primary btn-outline" @click="reset()">Confirm</button>
                    </form>
                </div>
            </div>


        </div>
        <form method="dialog" class="modal-backdrop">
            <button @click="reset()">close</button>
        </form>
    </dialog>
</template>
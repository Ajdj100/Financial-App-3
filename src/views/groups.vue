<script setup>
import { ref } from 'vue'

// var tags = {
//     "Food": {
//         name: "Food",
//         color: "red",
//         keywords: [
//             'McDonalds',
//             'Harveys',
//             'Tim Hortons',
//             'Swiss Chalet',
//             'Pennys',
//             'Johnny Frescoes'
//         ]
//     },
//     "Junk": {
//         name: "Junk",
//         color: "orange"
//     },
//     "Transportation": {
//         name: "Transportation",
//         color: "blue"
//     },
//     "Entertainment": {
//         name: "Entertainment",
//         color: "yellow"
//     }
// };
const colors = {
    red: {
        name: 'red',
        hexCode: '#FF5050'
    },
    orange: {
        name: 'orange',
        hexCode: '#FF9442'
    },
    yellow: {
        name: 'yellow',
        hexCode: '#FFE642'
    },
    green: {
        name: 'green',
        hexCode: '#8EFF42'
    },
    teal: {
        name: 'teal',
        hexCode: '#42FFA4'
    },
    blue: {
        name: 'blue',
        hexCode: '#32DDFF'
    },
    purple: {
        name: 'purple',
        hexCode: '#7B4BFF'
    },
    purple2: {
        name: 'purple2',
        hexCode: '#C64BFF'
    },
    pink: {
        name: 'pink',
        hexCode: '#FF6BBA'
    }
};

//tag manipulation stuff
var currentTag = ref(tags['Food']);
var currentColor = ref(colors[currentTag.value.color])

function viewTag(tag) {
    currentTag.value = tags[tag];
    // setCurrentColor(currentTag.value.color)
}

function setCurrentColor(color) {
    currentColor.value = color;
    document.getElementById('dumbButton').focus();
}

function updateGroup() {
    console.log(tags)
    console.log(currentTag.value);
    let oldName = currentTag.value.name;
    currentTag.value.name = document.getElementById("updateNameBox").value;
    currentTag.value.color = currentColor.value.name;
    tags[oldName] = currentTag.value;
}

function addFilter(group, filterText) {
    //TODO: Implement adding filter to database
}

</script>

<template>
    <!-- Edit Group Modal -->
    <dialog id="editGroup" class="modal">
        <div class="modal-box flex flex-col overflow-visible">
            <!-- stupid focus workaround -->
            <button id="dumbButton"></button>
            <h3 class="font-bold text-lg pb-5">Edit Group</h3>
            <div class="flex justify-between">
                <div class="flex flex-col grow">
                    <label class="py-1">Name</label>
                    <input type="text" class="input bg-base-200 mb-5" id="updateNameBox" :value="currentTag.name">
                </div>
                <div class="flex flex-col ml-10">
                    <label class="py-1">Color</label>
                    <!-- dropdown for the color picker -->
                    <div id="colorFilter" class="dropdown">
                        <div tabindex="0" role="button" class="btn pl-4">
                            <div class="size-4 rounded-full" :style="{ backgroundColor: currentColor.hexCode }"></div>
                        </div>
                        <ul tabindex="0"
                            class="dropdown-content z-[5] menu p-2 shadow bg-base-100 rounded-box w-fit max-h-52 flex-nowrap overflow-scroll overflow-x-hidden">
                            <li v-for="color in colors">
                                <div @click="setCurrentColor(color)">
                                    <a class="size-5 rounded-full m-2 p-1" :style="{ backgroundColor: color.hexCode }"></a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>


            <div class="modal-action flex justify-between">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Cancel</button>
                </form>
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary btn-outline" @click="updateGroup()">Confirm</button>
                </form>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>

    <!-- delete group modal -->
    <dialog id="deleteGroup" class="modal">
        <div class="modal-box flex flex-col">
            <h3 class="font-bold text-lg pb-5">Delete Group</h3>
            <p>Are you sure you want to delete this group?</p>
            <p class="text-gray-500">(This action cannot be undone)</p>
            <div class="modal-action flex justify-between">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Cancel</button>
                </form>
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-error btn-outline">Delete</button>
                </form>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>

    <div class="bg-base-200 rounded-box px-5 py-3 flex flex-col w-full">
        <div>
            <h1>Groups</h1>
        </div>
        <div class="flex flex-row h-full">
            <!-- list of guys -->
            <div class="flex flex-col">
                <table class="table w-60">
                    <thead class="border-b-2 border-current">
                        <th class="text-lg pl-3">Group Name</th>
                    </thead>
                    <tbody>
                        <tr v-for="tag in tags" class="border-b-2 border-b-base-300">
                            <div class="hover:bg-base-100 cursor-pointer" @click="viewTag(tag.name)">
                                <td class="flex flex-row items-center">
                                    <div class="size-5 rounded-full mr-3 -ml-2"
                                        :style="{ backgroundColor: colors[tag.color].hexCode }">
                                    </div>
                                    {{ tag.name }}
                                </td>
                            </div>

                        </tr>

                    </tbody>
                </table>
            </div>
            <div class="divider divider-horizontal"></div>

            <!-- group manager area -->
            <div class="w-full rounded-box px-4 py-1">

                <!-- group header -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="size-5 rounded-full mr-3" :style="{ backgroundColor: colors[currentTag.color].hexCode }">
                        </div>
                        <h1>{{ currentTag.name }}</h1>
                    </div>
                    <div>
                        <button class="btn btn-error btn-outline mx-4" onclick="deleteGroup.showModal()">Delete
                            Group</button>
                        <button class="btn btn-primary" onclick="editGroup.showModal()">Edit Group</button>
                    </div>
                </div>

                <!-- filter Words -->
                <div>
                    <div class="flex items-center justify-between my-1">
                        <h2 class=" py-1 text-xl">Filter Names</h2>
                    </div>

                    <div class="bg-base-100 rounded-box p-3 flex flex-wrap">
                        <div v-for="keyword in currentTag.keywords"
                            class="hover:bg-[#4d5261] py-2 px-4 w-52 rounded-lg flex items-center justify-between hover:group-last:*:invisible">
                            <p>{{ keyword }}</p>
                            <!-- options -->
                            <div class="flex">
                                <!-- edit button -->
                                <div class="hover:text-slate-100 cursor-pointer px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36">
                                        <path fill="currentColor"
                                            d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2.14 2.14 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z"
                                            class="clr-i-outline clr-i-outline-path-1" />
                                        <path fill="none" d="M0 0h36v36H0z" />
                                    </svg>
                                </div>
                                <!-- delete button -->
                                <div class="hover:text-red-400 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.5"
                                            d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import listTransaction from '../components/listTransaction.vue'
import createFilter from '../components/createFilter.vue'
import multiSelect from '../components/multiSelect.vue'

import { db } from '@/main';

var transactions = ref(await getTransactions());
var tags = ref(await getTags());

const colors = {
    red: '#FF5050',
    orange: '#FF9442',
    yellow: '#FFE642',
    green: '#8EFF42',
    teal: '#42FFA4',
    blue: '#32DDFF',
    purple: '#7B4BFF',
    purple2: '#C64BFF',
    pink: '#FF6BBA',
}

//groups modal information
var currentName = ref('');

async function getTransactions() {
    // const res = await db.select('SELECT * FROM transactions');
    const res2 = await db.select(`SELECT transactions.ID, transactions.name, transactions.amount, transactions.date, GROUP_CONCAT(groups.ID) as groups
                                    FROM transactions
                                    LEFT JOIN filters ON transactions.name LIKE '%' || filters.keyword || '%'
                                    LEFT JOIN groups ON filters.groupID = groups.ID
                                    GROUP BY transactions.ID;
                            `);
    //preprocess transactions
    res2.forEach(item => {
        if(item.groups == null) {
            item.groups = [];
            return;
        }
        let groupList = item.groups.split(',');
        item.groups = groupList;


    });
    console.log(res2);
    return res2;
}

async function getTags() {
    const res = await db.select('SELECT * FROM groups');
    console.log(res);
    return res;
}

function test(name) {
    this.currentName = name;
    GroupsModal.showModal()
}

function findTagByID(id) {
    return tags.value.find(item => item.ID === Number(id));
}

// console.log(findTagByID(1).color);

// function deleteTransaction(transaction) {
//     transactions
// }

</script>

<template>
    <createFilter :text="currentName" :tags="tags" :colors="colors"></createFilter>
    <div class="bg-base-200 rounded-box px-5 py-3 w-full h-full">
        <h1>Transactions</h1>
        <div class="flex 2xl:flex-row 2xl:justify-start sm:flex-col-reverse sm:justify-end">
            <!-- table -->
            <div class="flex flex-col grow">
                <table class="table h-fit">
                    <thead class="border-b-2 border-current">
                        <th>Name</th>
                        <th>Date</th>
                        <th>Value</th>
                        <th>Groups</th>
                        <th></th> <!-- delete header -->
                    </thead>
                    <tbody>
                        <tr v-for="item in transactions" class="border-b-2 border-b-base-300">
                            <!-- name -->
                            <td class="w-64">{{ item.name }}</td>
                            <!-- date -->
                            <td class="w-44">{{ new Date(item.date).toDateString() }}</td>
                            <!-- price -->
                            <td class="w-24"> ${{ item.amount.toFixed(2) }}</td>
                            <!-- tags -->
                            <td class="w-96">
                                <ul class="flex items-center">
                                    <template v-for="group in item.groups">
                                        <span
                                            class="badge badge-outline badge-secondary rounded-full flex items-center ml-1 mr-1 first:ml-0"
                                            :style="{ borderColor: findTagByID(group).color, color: findTagByID(group).color }">
                                            <div class="size-4 rounded-full mr-1 -ml-2"
                                                :style="{ backgroundColor: findTagByID(group).color }">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="bg-base-200"
                                                    class="bi bi-x fill-none hover:fill-base-200 hover:cursor-pointer"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                                </svg>
                                            </div>
                                            {{ findTagByID(group).name }}
                                        </span>
                                    </template>
                                    <!-- Add tag button -->
                                    <div @click="test(item.name)"
                                        class="size-4 rounded-full mr-1 ml-1 outline outline-1 outline-current hover:cursor-pointer dropdown">
                                        <svg tabindex="0" role="button" xmlns="http://www.w3.org/2000/svg" width="16"
                                            height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                            <path
                                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                        </svg>
                                        <!-- <createFilter :text="item.name"></createFilter> -->
                                    </div>
                                </ul>
                            </td>
                            <td>
                                <div class="hover:text-red-400 hover:cursor-pointer transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                                        viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.5"
                                            d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75" />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="divider 2xl:divider-horizontal sm:divider-vertical sm:m-0"></div>
            <div class="flex shrink 2xl:flex-col sm:items-start sm:flex-col min-w-80 sm:px-5">
                <div class="flex flex-row justify-between w-full items-center">
                    <h1>Filters</h1>
                    <p class="underline text-[#3595ff] cursor-pointer">clear</p>
                </div>
                <div class="flex sm:flex-row xl:flex-col items-center">
                    <div class="flex">
                        <input type="date" class="bg-base-100 mr-2">
                        to
                        <input type="date" class="bg-base-100 ml-2">
                    </div>
                    <multiSelect class="w-full"></multiSelect>
                    <p>hello</p>
                    <p>hola</p>
                    <p>gutentag</p>
                </div>
            </div>
        </div>

    </div>
</template>

<!-- 
    Features
    - View list of transactions
        - Filter by date range
        - Filter by tags
        - Search??? (ew)
    - Manage Tags
    - Add tags to transaction names
    - Delete Transactions
 -->


<!-- 
    I need to rework the add button for the groups on  a column to bring up a modal with the ability to add a string to a category, or to modify a category, or even create a new category.

    This dialog will also allow you to tune the name string to add to the group in case you want to make it more generic (ex. "Tim Hortons #1234" -> "Tim Hortons")

    oh my god I also have to figure out the color picker... pls no. We will start with like, 8 colors or something
  -->

<!-- on clicking the X button on a group, a dialog should appear about removing that name from the filter group. -->

<!-- Do I really want groups to be in the transactions page? -->
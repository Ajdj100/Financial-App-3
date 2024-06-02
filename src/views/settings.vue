<script setup>
import { db } from '@/main';

async function deleteDatabase() {
    
}

</script>


<template>
    <div class="bg-base-200 rounded-box px-5 py-3 w-full h-full">
        <h1>Settings</h1>
        <div class="py-5">
            <!-- theme -->
            <div class="flex items-center justify-between max-w-xl">
                <h3>Theme</h3>
                <label class="flex cursor-pointer items-center gap-2">
                    <span class="label-text">Dark</span>
                    <input type="checkbox" value="corporate" class="toggle theme-controller" />
                    <span class="label-text">Light</span>
                </label>
            </div>
            <div class="divider"></div>
            <!-- database stuff -->
            <div class="flex items-center justify-between max-w-xl">
                <h3>Delete Database (lol I'll implement this later)</h3>
                <button class="btn btn-outline btn-error">Delete</button>
            </div>
        </div>
    </div>
</template>
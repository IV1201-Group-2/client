<script setup lang="ts">
import { ref } from 'vue';

const firstNameInput = "Sven";
const lastNameInput = "Svensson";
const personNumberInput = "930101-xxxx"
const emailInput = "test@exempel.com"

const areasOfExpertise = ["Ticket Sales", "Lotteries", "Roller Coaster Operations"]
const yearsOfExperience = ref(0)

const startDate = new Date();
const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
</script>

<template>
    <main>
        <v-sheet width="500" class="mx-auto">
            <h1>Application Form</h1>
            <v-sheet>
                <v-sheet>
                    <h2>Personal Information</h2>
                    <v-text-field label="First Name" :value="firstNameInput" disabled />
                    <v-text-field label="Last Name" :value="lastNameInput" disabled />
                    <v-text-field label="Person Number" :value="personNumberInput" disabled />
                    <v-text-field label="Email" :value="emailInput" disabled />
                </v-sheet>
                <v-sheet>
                    <h2>Competence Profile</h2>
                </v-sheet>
                <v-sheet>
                    <h2>Available Through</h2>
                </v-sheet>
            </v-sheet>
        </v-sheet>
    </main>
</template>
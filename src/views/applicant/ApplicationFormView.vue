<script setup lang="ts">
import { ref, computed, watch, type Ref, type ComputedRef } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useApplicationStore } from "@/stores/applicationForm";
import { ApplicationTestId } from "@/util/enums";
import ItemList from "@/components/generic/ItemList.vue";
import PersonalInformation from "@/components/generic/PersonalInformation.vue";
const applicationStore = useApplicationStore();
const { competenceList, availabilityList } = storeToRefs(applicationStore);
const i18n = useI18n();
const { t } = i18n;

const { basePath, messagesPath, competencePath, availabilityPath, expertiseOptionsPath, buttonsPath, itemListPath } =
  initPaths();

const { areasOfExpertise, areasOfExpertiseReverseMap, selectedExpertise, yearsOfExperience } = initCompetence();

const {
  startDate,
  endDate,
  startDateStr,
  startDateIsInPast,
  endDateStr,
  endDateIsPastStartDate,
  conflictingDateIndices,
  conflictsWithOtherAvailability
} = initAvailability();

const {
  competenceListEmpty,
  availabilityListEmpty,
  expertiseMsg,
  availabilityMsg,
  reverseDatesErrMsg,
  conflictingPeriodsErrMsg
} = initMessages();

watch(startDateStr, () => {
  startDate.value = parseDate(startDateStr.value);
});

watch(endDateStr, () => {
  endDate.value = parseDate(endDateStr.value);
});

watch(i18n.locale, () => {
  areasOfExpertise.value = areasOfExpertise.value.map((expertise) =>
    t(expertiseOptionsPath + areasOfExpertiseReverseMap.value[expertise])
  );
  const expertiseKey = areasOfExpertiseReverseMap.value?.[selectedExpertise.value];
  areasOfExpertiseReverseMap.value = getExpertiseReverseMap();
  if (expertiseKey) selectedExpertise.value = t(expertiseOptionsPath + expertiseKey);
});

function addCompetence() {
  competenceList.value.data.push({
    areaOfExpertise: areasOfExpertiseReverseMap.value[selectedExpertise.value],
    yearsOfExperience: Number(yearsOfExperience.value)
  });
  areasOfExpertise.value = areasOfExpertise.value.filter(
    (areaOfExpertise) => areaOfExpertise !== selectedExpertise.value
  );
  selectedExpertise.value = "";
}

function addAvailability() {
  availabilityList.value.data.push({ start: startDateStr.value, end: endDateStr.value });
}

function initPaths() {
  const basePath = applicationStore.basePath;
  const competencePath = applicationStore.competencePath;

  return {
    basePath,
    messagesPath: basePath + "messages.",
    competencePath,
    expertiseOptionsPath: competencePath + "options.",
    availabilityPath: applicationStore.availabilityPath,
    buttonsPath: basePath + "buttons.",
    itemListPath: applicationStore.itemListPath
  };
}

function initCompetence(): {
  areasOfExpertise: Ref<string[]>;
  areasOfExpertiseReverseMap: Ref<any>;
  selectedExpertise: Ref<string>;
  yearsOfExperience: Ref<number>;
} {
  const expertiseReverseMap = getExpertiseReverseMap();
  const expertiseTranslations = Object.keys(expertiseReverseMap);
  const expertises =
    competenceList.value.data.length > 0
      ? expertiseTranslations.filter(
          (expertise) =>
            !competenceList.value.data.some(
              (competence) => t(expertiseOptionsPath + competence.areaOfExpertise) === expertise
            )
        )
      : expertiseTranslations;

  return {
    areasOfExpertise: ref(expertises),
    areasOfExpertiseReverseMap: ref(expertiseReverseMap),
    selectedExpertise: ref(""),
    yearsOfExperience: ref(0)
  };
}

function initAvailability(): {
  startDate: Ref<Date>;
  endDate: Ref<Date>;
  startDateStr: Ref<string>;
  startDateIsInPast: ComputedRef<boolean>;
  endDateStr: Ref<string>;
  endDateIsPastStartDate: ComputedRef<boolean>;
  conflictingDateIndices: ComputedRef<Array<number>>;
  conflictsWithOtherAvailability: ComputedRef<boolean>;
} {
  return {
    startDate: ref(parseDate(new Date().toISOString().substring(0, 10))),
    endDate: ref(parseDate(new Date().toISOString().substring(0, 10))),
    startDateStr: ref(new Date().toISOString().substring(0, 10)),
    startDateIsInPast: computed(
      () => startDate.value.getTime() < parseDate(new Date().toISOString().substring(0, 10)).getTime()
    ),
    endDateStr: ref(new Date().toISOString().substring(0, 10)),
    endDateIsPastStartDate: computed(() => startDate.value.getTime() > endDate.value.getTime()),
    conflictingDateIndices: computed(() => {
      let computedConflicts: number[] = [];

      if (endDateIsPastStartDate.value) {
        return [];
      }

      interface AvailabilityPeriod {
        start: Date;
        end: Date;
      }

      function contains(period: AvailabilityPeriod) {
        return startsBeforeStart(period) && endsAfterEnd(period);

        function startsBeforeStart(period: AvailabilityPeriod) {
          return startDate.value.getTime() < period.start.getTime();
        }

        function endsAfterEnd(period: AvailabilityPeriod) {
          return endDate.value.getTime() > period.end.getTime();
        }
      }

      function startConflicts(period: AvailabilityPeriod) {
        return startsAfterStart(period) && startsBeforeEnd(period);

        function startsAfterStart(period: AvailabilityPeriod) {
          return startDate.value.getTime() >= period.start.getTime();
        }

        function startsBeforeEnd(period: AvailabilityPeriod) {
          return startDate.value.getTime() <= period.end.getTime();
        }
      }

      function endConflicts(period: AvailabilityPeriod) {
        return endsAfterStart(period) && endsBeforeEnd(period);

        function endsAfterStart(period: AvailabilityPeriod) {
          return endDate.value.getTime() >= period.start.getTime();
        }

        function endsBeforeEnd(period: AvailabilityPeriod) {
          return endDate.value.getTime() <= period.end.getTime();
        }
      }

      function isConflicting(period: AvailabilityPeriod) {
        return contains(period) || startConflicts(period) || endConflicts(period);
      }

      const availabilityPeriods: AvailabilityPeriod[] = availabilityList.value.data.map((period) => ({
        start: parseDate(period.start),
        end: parseDate(period.end)
      }));

      availabilityPeriods.forEach((period, index) => {
        if (isConflicting(period)) computedConflicts.push(index);
      });

      return computedConflicts;
    }),
    conflictsWithOtherAvailability: computed(() => conflictingDateIndices.value.length !== 0)
  };
}

function initMessages(): {
  competenceListEmpty: ComputedRef<boolean>;
  availabilityListEmpty: ComputedRef<boolean>;
  expertiseMsg: ComputedRef<string>;
  availabilityMsg: ComputedRef<string>;
  reverseDatesErrMsg: ComputedRef<string>;
  conflictingPeriodsErrMsg: ComputedRef<string>;
} {
  return {
    competenceListEmpty: computed(() => competenceList.value.data.length === 0),
    availabilityListEmpty: computed(() => availabilityList.value.data.length === 0),
    expertiseMsg: computed(() =>
      competenceListEmpty.value ? t(messagesPath + "add-expertise") : t(messagesPath + "expertise-added")
    ),
    availabilityMsg: computed(() =>
      availabilityListEmpty.value ? t(messagesPath + "add-availability") : t(messagesPath + "availability-added")
    ),
    reverseDatesErrMsg: computed(() => t(messagesPath + "start-date-after-end-date")),
    conflictingPeriodsErrMsg: computed(() => t(messagesPath + "conflicting-periods"))
  };
}

function getExpertiseReverseMap() {
  enum ExpertiseKeys {
    Lotteries = "lotteries",
    RollerCoasterOperations = "roller-coaster-operations",
    TicketSales = "ticket-sales"
  }

  const ticketSales = t(expertiseOptionsPath + ExpertiseKeys.TicketSales);
  const lotteries = t(expertiseOptionsPath + ExpertiseKeys.Lotteries);
  const rollerCoasterOperations = t(expertiseOptionsPath + ExpertiseKeys.RollerCoasterOperations);

  return {
    [ticketSales]: ExpertiseKeys.TicketSales,
    [lotteries]: ExpertiseKeys.Lotteries,
    [rollerCoasterOperations]: ExpertiseKeys.RollerCoasterOperations
  };
}

function parseDate(dateStr: string) {
  return new Date(Date.parse(dateStr));
}
</script>

<template>
  <main style="height: 30rem">
    <div class="text-h3 text-center mb-10">{{ $t(basePath + "header") }}</div>
    <v-sheet class="d-flex w-100 h-100">
      <v-sheet>
        <PersonalInformation :base-path="basePath" />
        <v-sheet width="600">
          <div class="text-h5">{{ $t(competencePath + "header") }}</div>
          <v-container>
            <v-row class="d-flex justify-space-between">
              <v-col cols="5">
                <v-select
                  :data-test="ApplicationTestId.AreaOfExpertise"
                  :label="$t(competencePath + 'area-of-expertise')"
                  :items="areasOfExpertise"
                  v-model="selectedExpertise"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  :data-test="ApplicationTestId.YearsOfExperience"
                  :label="$t(competencePath + 'years-of-experience')"
                  type="number"
                  min="0"
                  v-model="yearsOfExperience"
                />
              </v-col>
              <v-col cols="3" class="d-flex align-center">
                <v-btn
                  :data-test="ApplicationTestId.AddCompetence"
                  :disabled="!selectedExpertise || yearsOfExperience < 0"
                  @click="addCompetence"
                  >{{ $t(buttonsPath + "add") }}</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>

        <v-sheet width="600">
          <div class="text-h5">{{ $t(availabilityPath + "header") }}</div>
          <v-container>
            <v-row class="d-flex justify-space-between">
              <v-col cols="4">
                <v-text-field
                  :data-test="ApplicationTestId.StartDate"
                  :label="$t(availabilityPath + 'start-date')"
                  type="date"
                  :min="new Date()"
                  v-model="startDateStr"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  :data-test="ApplicationTestId.EndDate"
                  :label="$t(availabilityPath + 'end-date')"
                  type="date"
                  :min="startDateStr"
                  v-model="endDateStr"
                />
              </v-col>
              <v-col cols="3" class="d-flex align-center">
                <v-btn
                  :data-test="ApplicationTestId.AddAvailability"
                  @click="addAvailability"
                  :disabled="startDateIsInPast || endDateIsPastStartDate || conflictsWithOtherAvailability"
                  >{{ $t(buttonsPath + "add") }}</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-sheet>
      <v-sheet class="d-flex flex-column justify-space-between">
        <v-sheet class="d-flex">
          <ItemList
            :header-i18n-key="itemListPath + 'competence-header'"
            :first-column-i18n-key="competencePath + 'area-of-expertise'"
            :second-column-i18n-key="competencePath + 'years-of-experience'"
            v-model:areasOfExpertise="areasOfExpertise"
            v-model:list="competenceList"
          />
          <ItemList
            :header-i18n-key="itemListPath + 'availability-header'"
            :first-column-i18n-key="availabilityPath + 'start-date'"
            :second-column-i18n-key="availabilityPath + 'end-date'"
            v-model:conflictingDateIndices="conflictingDateIndices"
            v-model:list="availabilityList"
          />
        </v-sheet>
        <v-sheet class="d-flex justify-space-between" elevation="2" style="min-height: 13rem">
          <v-sheet class="pa-4">
            <div class="text-h5 font-weight-bold">{{ $t(messagesPath + "header") }}</div>
            <ul class="pl-10 pt-1">
              <li :style="{ color: !competenceListEmpty ? 'green' : '' }">{{ expertiseMsg }}</li>
              <li :style="{ color: !availabilityListEmpty ? 'green' : '' }">
                {{ availabilityMsg }}
              </li>
              <li v-if="endDateIsPastStartDate" style="color: red">{{ reverseDatesErrMsg }}</li>
              <li v-if="conflictsWithOtherAvailability" style="color: red">
                {{ conflictingPeriodsErrMsg }}
              </li>
            </ul>
          </v-sheet>
          <v-sheet class="pa-4" style="height: 100%; display: flex; align-items: end">
            <v-btn
              :data-test="ApplicationTestId.Submit"
              :disabled="competenceList.data.length === 0 || availabilityList.data.length === 0"
              @click="$router.push($route.path + '/confirmation')"
            >
              {{ $t(buttonsPath + "review") }}
            </v-btn>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </main>
</template>

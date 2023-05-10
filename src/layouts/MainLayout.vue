<template>
  <div>
    <VAppBar color="primary" :elevation="2">
      <template v-if="canClickBack" #prepend>
        <VAppBarNavIcon
          color="white"
          icon="mdi-arrow-left"
          @click="routeBack"
        />
      </template>
      <VContainer>
        <VAppBarTitle>
          {{ routeName }}
        </VAppBarTitle>
      </VContainer>
    </VAppBar>

    <VContainer>
      <RouterView />
    </VContainer>

    <VDialog v-model="dialogIsOpen" width="auto">
      <VCard>
        <VCardText>
          {{ __('wowYouHaveTasksTodoTackleThemASPA') }}
        </VCardText>

        <VList lines="one">
          <VListItem
            v-for="task in upComingTasks"
            :key="task.id"
            :subtitle="task.dueDate"
            :title="task.title"
          />
        </VList>

        <VCardActions>
          <VBtn block color="primary" @click="dialogIsOpen = false">
            {{ __('gotIt') }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useUpComingTasks from '@/composables/useUpComingTasks'
import { __ } from '@/helpers'

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name)
const canClickBack = computed(() => route.name !== 'Home')

const routeBack = () => router.back()

const { upComingTasks, dialogIsOpen } = useUpComingTasks()
</script>

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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name)
const canClickBack = computed(() => route.name !== 'Home')

const routeBack = () => router.back()
</script>

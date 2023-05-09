<template>
  <div>
    <VAppBar color="primary" :elevation="2">
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
import { useRoute } from 'vue-router'

const route = useRoute()

const routeName = computed(() => route.name)
</script>

<script setup lang="ts">
  /*import  button example*/
  import { Button } from "@/components/ui/button";
  import { Switch } from "@/components/ui/switch";
  function toggleDarkMode() {
    document.body.classList.toggle("dark");
  }
</script>

<template>
  <div class="container py-8">
    <h1 class="text-2xl font-bold mb-4">Survey App</h1>
    <Button variant="destructive">Click me</Button>
    <Button variant="outline">Click me</Button>
    <Button class="text">Click me</Button>
    <Button @click="toggleDarkMode">IamDarkMode</Button>
  </div>
</template>
<style scoped></style>

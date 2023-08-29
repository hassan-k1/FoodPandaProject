<template>
  <div class="loading-container">
    <div class="loading-spinner"></div>
  </div>
</template>

<style>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #d70f64;
  border-left: 4px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="layout-default-container">
    <div class="layout-default-content">
      <FarmHeader />
      <BreadCrum />
      <slot></slot>
    </div>
  </div>
</template>

<style>
  .layout-default-container {
    display: flex;
    justify-content: center;
  }
  .layout-default-content {
    width: 480px;
  }
</style>

<template>
  <router-view />

  <div id="left"></div>
  <div id="right"></div>
</template>

<style>
:root {
  --accent: #c2fdd3;
  --bg: #f7f7f7;
}

body {
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<style scoped>
h1, p {
  text-align: center;
}

#left, #right {
  position: fixed;
  top: 0;
  width: 10%;
  height: 100%;
  z-index: -1;
}

#left {
  background: linear-gradient(to right, var(--accent), transparent);
  left: 0;
}

#right {
  background: linear-gradient(to left, var(--accent), transparent);
  right: 0;
}
</style>
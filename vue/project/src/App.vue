<template>
  <h1>Crypto Dashboard</h1>
  <p>Projekt wykonany przez Kamila Pawłowskiego w ramach przedmiotu Aplikacje Kliencie i Serwerowe.</p>

  <router-view />

  <div id="left"></div>
  <div id="right"></div>
</template>

<style>
:root {
  --green: #d5fbe0;
  --yellow: rgb(248, 248, 233);
}

body {
  background-color: var(--yellow);
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
  background: linear-gradient(to right, var(--green), transparent);
  left: 0;
}

#right {
  background: linear-gradient(to left, var(--green), transparent);
  right: 0;
}
</style>
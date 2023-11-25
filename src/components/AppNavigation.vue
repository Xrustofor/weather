<template>
  <nav>
    <ul>
      <router-link to="/" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" role="link" :class="[isActive && 'active']">
          Головна
        </li>
      </router-link>
      <router-link to="/chosen" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" role="link" :class="[isActive && 'active']">
          Обране
        </li>
      </router-link>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  padding: 0 8px;
  overflow: hidden;
}
ul {
  display: flex;
  margin-left: -16px;
  margin-right: -16px;

  li {
    padding: 15px;
    margin: 0 8px;
    min-width: 110px;
    text-align: center;
    cursor: pointer;
  }

  li {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #388bb1;
    transition: linear 0.2s;
    color: #fff;
    text-transform: uppercase;
  }

  li.active {
    background: #fff;
    color: #000;
  }

  li:hover {
    background: #47b2e3;
    transition: linear 0.3s;
  }
}
a {
  text-decoration: none;
}
</style>

<template>
    <div class="auth">
        <h1>Auth</h1>
        <router-view></router-view>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .auth {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Login
            </div>
            <div class="card-body">
                <div v-if="loading" class="loading">
                    loading
                </div>
                <form class="row g-3 needs-validation" novalidate @submit.prevent="handleSubmit()">
                    <div class="col-md-4 position-relative">
                        <label for="userEmail" class="form-label">User/Email</label>
                        <input :class="{
                            'is-valid': errors,
                            'isinvalid': errors
                        }" type="text" class="form-control is-invalid" id="userEmail" v-model="form.userEmail"
                            required>
                        <div class="valid-feedback">
                            {{ errors }}
                        </div>
                        <div class="invalid-feedback">
                            {{ errors }}
                        </div>
                    </div>
                    <div class="col-md-4 position-relative">
                        <label for="password" class="form-label ">Password</label>
                        <input type="password" class="form-control is-valid" id="password" v-model="form.password"
                            required>
                        <div class="valid-feedback">
                            {{ errors }}
                        </div>
                        <div class="invalid-feedback">
                            {{ errors }}
                        </div>
                    </div>

                    <div class="col-12">
                        <button @click="handleSubmit()" class="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAxios } from '@/composables/useAxios';
import axiosConfig from '@/plugins/axiosConfig';
import { useAuthStore } from '@/stores/auth';
import { computed, ref } from 'vue';
import router from "@/router/index"

interface loginFormInterface {
    userEmail: string | null;
    password: string | null;
    valid: boolean;
}


const form = ref<loginFormInterface>({
    password: "",
    userEmail: "",
    valid: false,
});


const useAuth = useAuthStore();

const errors = computed(() => useAuth?.errors ?? null)
const loading = computed(() => useAuth?.loading ?? false)



function handleSubmit() {
    const auth = useAuth.login(form.value.userEmail, form.value.password);
    if (auth) {
        console.log(auth);

        router.push({
            name: 'game',
        })

        return true
    }

    return false
}

</script>

<style lang="scss"></style>
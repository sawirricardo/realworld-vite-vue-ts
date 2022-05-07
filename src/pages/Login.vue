<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useField, useForm } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import * as zod from "zod";
import { useRealworldFetch } from "../composables/useRealworldFetch";
const router = useRouter();
const { check } = useAuth();
if (check.value) router.replace({ name: "home" });

const { handleSubmit, isSubmitting, setFieldError } = useForm();

const {
  value: email,
  errorMessage: emailError,
  meta: emailMeta,
  setErrors: setEmailErrors,
} = useField<string>("user.email", toFieldValidator(zod.string().email()));
const {
  value: password,
  errorMessage: passwordError,
  meta: passwordMeta,
} = useField<string>("user.password", toFieldValidator(zod.string()));

const onSubmit = handleSubmit((values) => {
  useRealworldFetch("/users/login", {
    onFetchError: ({ response, error, data }) => {
      if (response?.status === 422 || response?.status === 403) {
        for (const property in data.errors) {
          setEmailErrors(data.errors[property]);
        }
      }
      return { response, error, data };
    },
  })
    .post(values)
    .json();
});
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'users.create' }"
              >Don't have an account?</router-link
            >
          </p>

          <form v-on:submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
              <div
                class="error-messages"
                v-if="emailError && emailMeta.touched"
                v-text="emailError"
              ></div>
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
              <div
                class="error-messages"
                v-if="passwordError && passwordMeta.touched"
                v-text="passwordError"
              ></div>
            </fieldset>
            <button
              v-bind:disabled="isSubmitting"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

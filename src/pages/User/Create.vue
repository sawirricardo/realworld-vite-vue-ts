<script setup lang="ts">
import { toFieldValidator } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import * as zod from "zod";
import { useRouter } from "vue-router";
import { useAuth } from "../../composables/useAuth";
import { useRealworldFetch } from "../../composables/useRealworldFetch";

const { check } = useAuth();
const router = useRouter();
if (check.value) router.replace({ name: "home" });

const { handleSubmit } = useForm();
const {
  value: username,
  errorMessage: usernameErrors,
  meta: usernameMeta,
} = useField("user.username", toFieldValidator(zod.string()));
const {
  value: email,
  errorMessage: emailErrors,
  meta: emailMeta,
} = useField("user.email", toFieldValidator(zod.string().email()));
const {
  value: password,
  errorMessage: passwordErrors,
  meta: passwordMeta,
} = useField("user.password", toFieldValidator(zod.string()));

const onSubmit = handleSubmit(async (values, action) => {
  useRealworldFetch("/users", {
    onFetchError: ({ response, error, data }) => {
      if (response?.status === 422 || response?.status === 403) {
        for (const property in data.errors) {
          action.setFieldError(`user.${property}`, data.errors[property]);
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
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">Have an account?</router-link>
          </p>

          <form v-on:submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="username"
              />
              <div
                class="error-messages"
                v-if="usernameErrors && usernameMeta.touched"
                v-text="usernameErrors"
              ></div>
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
              <div
                class="error-messages"
                v-if="emailErrors && emailMeta.touched"
                v-text="emailErrors"
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
                v-if="passwordErrors && passwordMeta.touched"
                v-text="passwordErrors"
              ></div>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <h1>Login</h1>
  <div>
    <button @click="signIn">Sign In with Google</button>
  </div>
</template>

<script setup lang="ts">
  import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

  console.log("login setup");

  definePageMeta({
    layout: "noheader",
  });

  const auth = useFirebaseAuth();

  const router = useRouter();
  const route = useRoute();

  const signIn = () => {
    if (auth) {
      signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
        console.log({ route, router });
        router.push(route.query.redirect ?? "/");
      });
    }
  };
</script>

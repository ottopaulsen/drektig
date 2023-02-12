<template>
  <h1>Login</h1>
  <div>
    <button @click="signIn">Sign In with Google</button>
  </div>
</template>

<script setup lang="ts">
  import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

  const router = useRouter();
  const route = useRoute();

  const auth = useFirebaseAuth();
  const signIn = () => signInWithPopup(auth, new GoogleAuthProvider());

  onMounted(async () => {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      const to =
        route.query.redirectTo && typeof route.query.redirectTo === "string"
          ? route.query.redirectTo
          : "/";

      router.push(to);
    }
  });
</script>

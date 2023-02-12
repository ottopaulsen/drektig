<template>
  <div>
    <h1>Edit individ</h1>
    <section>
      <EditInputNumber label="Nummer" id="number" v-model="individual.number" />
      <EditInputNumber label="Navn" id="name" v-model="individual.name" />
      <div class="row">
        <button @click="save">Save</button>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { collection, setDoc, doc } from "firebase/firestore";

  definePageMeta({
    middleware: ["auth"],
  });

  const route = useRoute();
  const router = useRouter();
  const db = useFirestore();

  const id = computed(() => route.params.id);
  const docRef = computed(() => "/individuals/" + id.value);

  const individualSource = computed(() => doc(collection(db, "individuals"), id.value));
  const individual = useDocument(individualSource);

  const title = computed(() => individual.value?.number + " " + individual.value?.name);

  async function save() {
    setDoc(doc(db, "individuals", id.value), individual.value);
    router.push(docRef.value);
  }
</script>

<style scoped>
  section {
    display: table;
    width: 100%;
  }
</style>

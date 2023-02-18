<template>
  <div>
    <h1>Edit individ</h1>
    <section>
      <EditInputNumber label="Nummer" id="number" v-model="indNumber" />
      <EditInputNumber label="Navn" id="name" v-model="indName" />
      <div class="row">
        <button @click="save">Save</button>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { collection, addDoc } from "firebase/firestore";

  definePageMeta({
    middleware: ["auth"],
  });

  const db = useFirestore();

  const indNumber = ref(null);
  const indName = ref(null);

  async function save() {
    console.log(`Saving ${indNumber.value} ${indName.value}`);
    const individual = {
      name: indName.value,
      number: indNumber.value,
    };
    addDoc(collection(db, "individuals"), individual).then(() => {
      indNumber.value = null;
      indName.value = null;
    });
  }
</script>

<style scoped>
  section {
    display: table;
    width: 100%;
  }
</style>

<template>
  <div>
    <h1>Edit individ</h1>
    <section>
      <EditInputNumber label="Nummer" id="number" v-model="doc.number" />
      <EditInputNumber label="Navn" id="name" v-model="doc.name" />
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

  const id = computed(() => route.params.id);

  const doc = useDocument("/individuals/" + id.value);

  const db = useFirestore();

  async function save() {
    console.log(`Saving ${indNumber.value} ${indName.value}`);
    const individual = {
      name: doc.value.name,
      number: doc.value.number,
    };
    // addDoc(collection(db, "individuals"), individual).then(() => {
    //   indNumber.value = null;
    //   indName.value = null;
    // });
  }
</script>

<style scoped>
  section {
    display: table;
    width: 100%;
  }
</style>

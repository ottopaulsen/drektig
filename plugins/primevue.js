import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Tooltip from "primevue/tooltip";
import Checkbox from "primevue/checkbox";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: false });
  // Components
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("Calendar", Calendar);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
  nuxtApp.vueApp.component("InputNumber", InputNumber);
  nuxtApp.vueApp.component("InputText", InputText);
  // Directives
  nuxtApp.vueApp.directive("tooltip", Tooltip);
});

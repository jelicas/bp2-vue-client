<template>
  <div class="home">
    <tabs-menu :tabs="tabs"></tabs-menu>
    <notifications></notifications>
  </div>
</template>

<script>
import TabsMenu from "@/components/TabsMenu";
import Notifications from "@/components/Notifications";

export default {
  name: "home",
  components: {
    TabsMenu,
    Notifications,
  },
  data() {
    return {
      tabs: [
        { name: "Proizvod", icon: "fas fa-shopping-cart" },
        { name: "Lek", icon: "fas fa-capsules" },
        { name: "Tip pakovanja", icon: "fas fa-box-open" },
        { name: "Istorija cena", icon: "fas fa-tags" },
        { name: "Stanje", icon: "fas fa-archive" },
        { name: "Dobavljač", icon: "fas fa-truck" },
        // { name: "Zaposleni", icon: "fas fa-user" },
        { name: "Katalog", icon: "fas fa-copy" },
        { name: "Stavka kataloga", icon: "fas fa-tasks" },
        { name: "Stavka kataloga - proizvod", icon: "fas fa-retweet" },
      ],
    };
  },
};
</script>

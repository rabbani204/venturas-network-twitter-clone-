<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
// import SideMenu from "~/components/admin/SideMenu";
export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800",
        },
        {
          rel: "stylesheet",
          href: "/fonts/font-awesome-4.7.0/css/font-awesome.min.css",
        },
        { rel: "stylesheet", href: "/dashboard/css/styles.css" },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
        },
        {
          src: "https://use.fontawesome.com/releases/v6.1.0/js/all.js",
        },
        { src: "/dashboard/js/js/scripts.js" },
      ],
    };
  },
};
</script>

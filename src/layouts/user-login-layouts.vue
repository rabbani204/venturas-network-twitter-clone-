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
          //   rel: "stylesheet",
          //   href: "https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        },
        { rel: "stylesheet", href: "/vendor/bootstrap/css/bootstrap.min.css" },
        {
          rel: "stylesheet",
          href: "/fonts/font-awesome-4.7.0/css/font-awesome.min.css",
        },
        { rel: "stylesheet", href: "/vendor/animate/animate.css" },
        { rel: "stylesheet", href: "/vendor/select2/select2.min.css" },
        { rel: "stylesheet", href: "/css/util.css" },
        { rel: "stylesheet", href: "/css/main.css" },
      ],
      script: [
        // {
        //   src:
        //     "https://cdn.jsdelivr.net/npm/fullcalendar@3.9.0/dist/fullcalendar.min.js"
        // },
        { src: "/vendor/jquery/jquery-3.2.1.min.js" },
        { src: "/vendor/bootstrap/js/popper.js" },
        { src: "/vendor/bootstrap/js/bootstrap.min.js" },
        { src: "/vendor/countdowntime/moment.min.js" },
        { src: "/vendor/countdowntime/moment-timezone.min.js" },
        { src: "/vendor/countdowntime/countdowntime.js" },
        { src: "/vendor/tilt/tilt.jquery.min.js" },
        { src: "/js/main.js" },
      ],
    };
  },
};
</script>


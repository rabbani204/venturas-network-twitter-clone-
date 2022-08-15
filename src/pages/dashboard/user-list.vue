<template>
  <body>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="/">Venturas-Network</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto py-4 py-lg-0">
            <li class="nav-item">
              <a class="nav-link px-lg-3 py-3 py-lg-4" href="/dashboard"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link px-lg-3 py-3 py-lg-4"
                href="/dashboard/my-post"
                >My Post</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link px-lg-3 py-3 py-lg-4"
                href="dashboard/user-list"
                >User List</a
              >
            </li>
            <li class="nav-item">
              <a v-on:click="logout" class="nav-link px-lg-3 py-3 py-lg-4">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Page Header-->
    <header
      class="masthead"
      style="background-image: url('assets/img/home-bg.jpg')"
    >
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="site-heading">
              <h2 class="title">Hello, {{userInfo.name}}</h2>
              <span class="subheading">Find and follow user.</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Main Content-->
        <!-- Tost area -->
    <div
      class="alert alert-success alert-dismissible"
      v-if="regSubmitError == true"
    >
      <strong>Success!</strong>.
    </div>
    <!-- tost area End -->
    <div class="container px-4 px-lg-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Follow</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items">
                <td>{{ item.firstName }} {{ item.lastName }}</td>
                <td v-on:click="followUser(item)">
                  <i class="follow-button fa-solid fa-person-circle-plus">Follow</i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Footer-->
    <footer class="border-top">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="small text-center text-muted fst-italic">
              Copyright &copy; Your Website 2022
            </div>
          </div>
        </div>
      </div>
    </footer>
  </body>
</template>
<script>
import { async } from "q";

export default {
  layout: "dashboard-layouts",
  data: () => ({
    items: [],
    userInfo: {},
    regSubmitError: false,
  }),
  async mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/");
    }
    this.getData();
  },
  methods: {
    async getData() {
      const user = await this.$axios.$get("auth/get-user");
      this.items = user.data;
    },
    async followUser(item) {
      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}`};
      const user = await this.$axios.$get('/follow/follow/'+item.id, {headers});
      if( user.message == 'successful' ){
        this.regSubmitError = true;
        setTimeout(() => {
            this.regSubmitError = false;
        }, 3500);
      }
    },
    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        this.$router.push("/");
    }
  },
};
</script>
<style>
.follow-button {
  color: green !important;
  cursor: pointer !important;
}
.follow-button:hover {
  color: greenyellow !important;
}
.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  width: 20%;
  height: 6rem;
  margin-left: 1rem;
  text-align: center;
  font-size: 2rem;
}
</style>

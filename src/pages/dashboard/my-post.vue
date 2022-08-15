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
              <a class="nav-link px-lg-3 py-3 py-lg-4" href="/dashboard/my-post"
                >My Post</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link px-lg-3 py-3 py-lg-4"
                href="/dashboard/user-list"
                >User List</a
              >
            </li>
            <li class="nav-item">
              <a v-on:click="logout" class="nav-link px-lg-3 py-3 py-lg-4"
                >Logout</a
              >
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
              <h2 class="title">Hello, {{ userInfo.name }}</h2>
              <span class="subheading"
                >You will found awesome things here.</span
              >
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Main Content-->
    <div class="container px-4 px-lg-5">
      <!-- Tost area -->
      <div
        class="alert alert-success alert-dismissible"
        v-if="regSubmitError == true"
      >
        <strong>Success!</strong>.
      </div>
      <!-- tost area End -->
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7">
          <form id="contactForm" @submit.prevent="submitPost">
            <div class="form-floating">
              <input
                class="form-control"
                id="name"
                v-model="post.title"
                type="text"
                placeholder="Enter your title..."
                data-sb-validations="required"
              />
              <label for="name">Title</label>
              <div class="invalid-feedback" data-sb-feedback="name:required">
                A title is required.
              </div>
            </div>
            <div class="form-floating">
              <textarea
                class="form-control"
                id="message"
                placeholder="Enter your message here..."
                v-model="post.content"
                style="height: 12rem"
                data-sb-validations="required"
              ></textarea>
              <label for="message">Message</label>
              <div class="invalid-feedback" data-sb-feedback="message:required">
                A message is required.
              </div>
            </div>
            <br />
            <button
              class="btn btn-primary text-uppercase"
              id="submitButton"
              type="submit"
            >
              Post
            </button>
          </form>
          <br /><br />
          <div v-for="post in postList">
            <!-- Post preview-->
            <div class="post-preview">
              <h2 class="post-title">
                {{ post.title }}
              </h2>
              <p class="post-subtitle">
                {{ post.content }}
              </p>
              <div class="s">
                <div class="row">
                  <div class="col-sm">
                    <div class="total-like">
                      Liked
                      <span style="color: green">{{ post.totalLike }}</span>
                      time
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="like-icon-holder" v-on:click="likePost(post)">
                      <i
                        class="fa-solid fa-trash-arrow-up"
                        style="
                          color: green !important;
                          cursor: pointer !important;
                        "
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Divider-->
            <hr class="my-4" />
          </div>
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
export default {
  layout: "dashboard-layouts",
  data: () => ({
    post: {},
    userInfo: {},
    regSubmitError: false,
    postList: [],
  }),
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/");
    }
    this.getPost();
  },
  methods: {
    async submitPost() {
      console.log(this.post, "post");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const user = await this.$axios.$post("/content", this.post, { headers });
      if (user.data) {
        this.getPost();
        this.post = {};
        this.regSubmitError = true;
        setTimeout(() => {
          this.regSubmitError = false;
        }, 3500);
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      this.$router.push("/");
    },

    async likePost(post) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const deleteItem = await this.$axios.$get("/content/delete/" + post.id, {
        headers,
      });

      if (deleteItem.data) {
        this.getPost();
        this.regSubmitError = true;
        setTimeout(() => {
          this.regSubmitError = false;
        }, 3500);
      }
    },
    async getPost() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const paginationData = {
        sortOrder: "DESC",
        sortField: "id",
        pageNumber: 1,
        pageSize: 10,
      };
      const postList = await this.$axios.$post(
        "/content/get-user-post",
        paginationData,
        {
          headers,
        }
      );
      this.postList = postList.data.results;
    },
  },
};
</script>

<template>
  <div class="size1 bg0 where1-parent">
    <!-- Coutdown -->
    <div
      class="flex-c-m bg-img1 size2 where1 overlay1 where2 respon2"
      style="background-image: url('images/bg01.jpg')"
    >
      <div class="wsize2 flex-w flex-c-m cd100 js-tilt">
        <h1 class="title">Venturas-Network</h1>
        <h5 class="sub-title">You will found awesome things here.</h5>
      </div>
    </div>
    <!-- Tost area -->
    <div
      class="alert alert-success alert-dismissible"
      v-if="regSubmitError == false"
    >
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Success!</strong>.
    </div>
    <!-- tost area End -->
    <!-- Form -->
    <div class="size3 flex-col-sb flex-w p-l-75 p-r-75 p-t-45 p-b-45 respon1">
      <div class="wrap-pic1">
        <img src="images/icons/logo3.png" alt="LOGO" />
      </div>

      <div class="p-t-50 p-b-60">
        <p class="m1-txt1 p-b-36">
          This is an awesome <span class="m1-txt2">Social Network</span>, Join.
        </p>
        <!-- Login Form  -->
        <div class="errorHolder">
          <p v-for="error in loginErrors" class="errorList">{{ error }}</p>
          <p class="errorList" v-if="loginEmailError">{{ loginEmailError }}</p>
          <!-- <p class="errorList" v-if="regSubmitError">{{ regSubmitError }}</p> -->
        </div>
        <div class="formHolder" v-if="activeButton == 'login'">
          <form @submit.prevent="submitLoginForm">
            <div
              class="wrap-input100 m-b-20 validate-input"
              data-validate="Email is required: ex@abc.xyz"
            >
              <input
                class="s2-txt1 placeholder0 input100"
                type="text"
                name="email"
                v-model="loginData.email"
                placeholder="Email Address"
              />
              <span class="focus-input100"></span>
            </div>

            <div
              class="wrap-input100 m-b-10 validate-input"
              data-validate="Name is required"
            >
              <input
                class="s2-txt1 placeholder0 input100"
                type="password"
                name="name"
                v-model="loginData.password"
                placeholder="Your password"
              />
              <span class="focus-input100"></span>
            </div>

            <div class="w-full">
              <button
                class="flex-c-m s2-txt2 size4 bg1 bor1 hov1 trans-04"
                type="submit"
              >
                Login
              </button>
            </div>
            <div style="margin-top: 2rem !important">
              <p
                class="formSwitch"
                style="
                  color: #002347;
                  margin-top: 3rem !important;
                  cursor: pointer;
                "
                @click="activeButton = 'register'"
              >
                Don't have an account?
              </p>
            </div>
          </form>
        </div>
        <!-- Login Form End -->
        <!-- Registration form -->
        <div class="errorHolder">
          <p v-for="error in errors" class="errorList">{{ error }}</p>
          <p class="errorList" v-if="accountAlreadyExistError">
            Email already exist.
          </p>
          <!-- <p class="errorList" v-if="regSubmitError">{{ regSubmitError }}</p> -->
        </div>
        <div class="formHolder" v-if="activeButton == 'register'">
          <form @submit.prevent="submitRegistrationForm">
            <div
              class="wrap-input100 m-b-20 validate-input"
              data-validate="Email is required: ex@abc.xyz"
            >
              <input
                class="s2-txt1 placeholder0 input100"
                type="text"
                name="firstName"
                v-model="registrationData.firstName"
                placeholder="First Name"
              />
              <span class="focus-input100"></span>
            </div>

            <div
              class="wrap-input100 m-b-20 validate-input"
              data-validate="Email is required: ex@abc.xyz"
            >
              <input
                class="s2-txt1 placeholder0 input100"
                type="text"
                name="lastName"
                v-model="registrationData.lastName"
                placeholder="Last Name"
              />
              <span class="focus-input100"></span>
            </div>

            <div
              class="wrap-input100 m-b-20 validate-input"
              data-validate="Email is required: ex@abc.xyz"
            >
              <input
                class="s2-txt1 placeholder0 input100"
                type="email"
                name="email"
                v-model="registrationData.email"
                placeholder="Email Address"
              />
              <span class="focus-input100"></span>
            </div>

            <div
              class="wrap-input100 m-b-10 validate-input"
              data-validate="Name is required"
            >
              <input
                class="s2-txt1 placeholder0 input100"
                type="password"
                v-model="registrationData.password"
                name="name"
                placeholder="Your password"
              />
              <span class="focus-input100"></span>
            </div>
            <div class="w-full">
              <button
                class="flex-c-m s2-txt2 size4 bg1 bor1 hov1 trans-04"
                type="submit"
              >
                Register
              </button>
            </div>
            <p
              class="formSwitch"
              style="color: red:!important; margin-top: 3rem !important; cursor: pointer"
              @click="activeButton = 'login'"
            >
              Already have an account?
            </p>
          </form>
        </div>
        <!-- End Of Registration Form -->
        <p class="s2-txt3 p-t-18">Join with the world best online network.</p>
      </div>

      <div class="flex-w">
        <a href="#" class="flex-c-m size5 bg3 how1 trans-04 m-r-5">
          <i class="fa fa-facebook"></i>
        </a>

        <a href="#" class="flex-c-m size5 bg4 how1 trans-04 m-r-5">
          <i class="fa fa-twitter"></i>
        </a>

        <a href="#" class="flex-c-m size5 bg5 how1 trans-04 m-r-5">
          <i class="fa fa-youtube-play"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "user-login-layouts",
  mounted() {
    this.activeButton = "login";
    this.activeButton = "login";
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/dashboard");
    }
  },
  data: () => ({
    activeButton: "",
    loginData: {},
    loginErrors: [],
    loginEmailError: "",
    accountAlreadyExistError: false,
    errors: [],
    regSubmitError: true,
    registrationData: {},
  }),
  methods: {
    async submitRegistrationForm() {
      console.log("------>", this.registrationData.password.length);
      if (!this.registrationData.firstName) {
        this.errors.push("First Name is require.");
      }
      if (!this.registrationData.lastName) {
        this.errors.push("Last Name is require.");
      }
      if (!this.registrationData.email) {
        this.errors.push("Email is require.");
      }
      if (
        !this.registrationData.password ||
        this.registrationData.password.length < 6
      ) {
        this.errors.push("Minimum 6 digit password is require.");
      }
      if (!this.errors.length) {
        try {
          const response = await this.$axios.$post(
            "auth/registration",
            this.registrationData
          );
          console.log(response, "--->");
          if (!response.data.error) {
            this.regSubmitError = false;
            this.activeButton = "login";
            setTimeout(() => {
              this.regSubmitError = true;
            }, 4000);
          } else {
            this.accountAlreadyExistError = true;
            setTimeout(() => {
              this.accountAlreadyExistError = false;
            }, 3500);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (this.errors.length) {
        setTimeout(() => {
          this.errors = [];
        }, 3000);
      }
    },
    async submitLoginForm() {
      console.log(this.loginData);
      if (!this.loginData.email) {
        this.loginErrors.push("Email is require.");
      }
      if (!this.loginData.password || this.loginData.password.length < 6) {
        this.loginErrors.push("Minimum 6 digit password is require.");
      }
      if (!this.loginErrors.length) {
        const response = await this.$axios.$post("auth/login", this.loginData);
        console.log(response);
        if (response.data.data == false) {
          this.loginEmailError = "Email not found.";
          setTimeout(() => {
            this.loginEmailError = false;
          }, 3500);
        }
        if (response.data.data == "notResult") {
          this.loginEmailError = "Password not match.";
          setTimeout(() => {
            this.loginEmailError = "";
          }, 3500);
        }
        if (response.data.access_token) {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              id: response.data.id,
              name: response.data.firstName + " " + response.data.lastName,
              email: response.data.email,
            })
          );
          this.$router.push("/dashboard");
        }
      }
      if (this.loginErrors.length) {
        setTimeout(() => {
          this.loginErrors = [];
        }, 3000);
      }
    },
  },
};
</script>
<style>
.title {
  color: white;
  margin-bottom: 1rem;
  font-family: "Courier New", Courier, monospace;
}
.formSwitch {
  color: #57b846 !important;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}
.errorList {
  color: red;
  margin-bottom: 1rem;
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

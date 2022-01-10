const TIME_OUT = 6000;
let BASE_URL = "";
if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:8888";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://localhost:8888";
}

export { TIME_OUT, BASE_URL };

import Router from "next/router";
import Cookies from "js-cookie";
import { fetcher } from "./api";

export const setToken = (data) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.user.id);
  Cookies.set("email", data.user.email);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);

  if (Cookies.get("username")) {
    Router.reload("/");
  }
};

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("email");
  Cookies.remove("jwt");
  Cookies.remove("username");

  Router.reload("/");
};

export const getUserFromLocalCookie = async() => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return fetcher(`http://localhost:1337/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((data) => {
        return data.username;
      })
      .catch(() => unsetToken());
  } else {
    return;
  }
};

export const getIdFromLocalCookie = async() => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return fetcher(`http://localhost:1337/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((data) => {
        return data.id;
      })
      .catch(() => unsetToken());
  } else {
    return;
  }
};

export const getEmailFromLocalCookie = async() => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return fetcher(`http://localhost:1337/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((data) => {
        return data.email;
      })
      .catch(() => unsetToken());
  } else {
    return;
  }
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};

// export const getTokenFromServerCookie = (req) => {
//   if (!req.headers.cookie || "") {
//     return undefined;
//   }
//   const jwtCookie = req.headers.cookie
//     .split(";")
//     .find((c) => c.trim().startsWith("jwt="));
//   if (!jwtCookie) {
//     return undefined;
//   }
//   const jwt = jwtCookie.split("=")[1];
//   return id;
// };

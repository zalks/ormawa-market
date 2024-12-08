import React, { useState } from "react";
import "./CSS/MasukRegister.css";

const MasukRegister = () => {
  const [state, setState] = useState("Masuk");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login Berhasil", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };

  const signup = async () => {
    console.log("Signup Berhasil", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      window.location.replace("/login");
    } else {
      alert(responseData.error);
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Register" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Masukkan Nama"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Alamat Email"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Kata Sandi"
          />
        </div>
        <button
          onClick={() => {
            state === "Masuk" ? login() : signup();
          }}
        >
          Selanjutnya
        </button>
        {state === "Register" ? (
          <p className="loginsignup-login">
            Sudah Punya Akun?
            <span
              onClick={() => {
                setState("Masuk");
              }}
            >
              {" "}
              Masuk Yuk!
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Belum Punya Akun?
            <span
              onClick={() => {
                setState("Register");
              }}
            >
              {" "}
              Buat Akun!
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            Dengan melanjutkan, saya setuju dengan Syarat Penggunaan & Kebijakan
            Privasi
          </p>
        </div>
      </div>
    </div>
  );
};

export default MasukRegister;

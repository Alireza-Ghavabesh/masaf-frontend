"use client";
import React, { useRef, useState } from "react";
import masafLogo from "../../../public/svgs/auth/masafLogo.svg";
import dashIcon from "../../../public/svgs/auth/dash.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { getNestjsServerAdress, getNextjsServerAdress, validateEmail, validatePhoneNumber } from "@/utils/utils";

export default function AdminLoginPage() {
  const [loginState, setLoginState] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oneTimeCode, setOnTimeCode] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const adminAccessToken = searchParams.get("token") ?? "";

  const sendCode = () => {
    // call kavenegar OTP and wait for user to give us its code
    console.log("inputText");
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (loginState === "password" && password !== "") {
      console.log(
        `start process of userpass login email:${email} & password:${password}`
      );
      console.log(
        JSON.stringify({
          loginMethod: "userpass",
          email: email,
          password: password,
        })
      );
      // Trigger the sign-in process
      const res = await fetch(
        `${getNestjsServerAdress()}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            loginMethod: "userpass",
            email: email,
            password: password,
          }),
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        if (errorResponse.message === "WrongPassword") {
          toast.error("رمز عبور اشتباه است", {
            position: "top-right",
            autoClose: 20000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            style: {
              fontFamily: "IranYekanWebBold",
              textAlign: "right",
            },
          });
        } else if (errorResponse.message === "activateTokenStillValid") {
          toast.error(
            "لینک فعال سازی هنوز منقضی نشده است ، لطفا وارد ایمیل خود شوید و روی لینک کلیک کنید",
            {
              position: "top-right",
              autoClose: 20000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
              style: {
                fontFamily: "IranYekanWebBold",
                textAlign: "right",
              },
            }
          );
        } else if (errorResponse.message === "notActivated") {
          toast.error(
            "حساب شما فعال نیست ، لینک فعال سازی برای ایمیل شما فرستاده شد",
            {
              position: "top-right",
              autoClose: 20000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
              style: {
                fontFamily: "IranYekanWebBold",
                textAlign: "right",
              },
            }
          );
        } else if (errorResponse.message === "userNotFound") {
          toast.error("کاربری با این ایمیل یافت نشد", {
            position: "top-right",
            autoClose: 20000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            style: {
              fontFamily: "IranYekanWebBold",
              textAlign: "right",
            },
          });
        }
      } else {
        const responseLogin = await res.json();
        // Handle successful login
        toast.success("ورود به حساب کاربری", {
          position: "top-center",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          style: {
            fontFamily: "IranYekanWebBold",
            textAlign: "right",
          },
        });
        // redirect ...
        console.log("======before-sign-in");
        console.log({
          userId: responseLogin.data.id,
          firstName: responseLogin.data.firstName,
          lastName: responseLogin.data.lastName,
        });
        console.log("======before-sign-in");
        console.log({
          email: email,
          password: password,
          userId: responseLogin.data.id,
          firstName: responseLogin.data.firstName,
          lastName: responseLogin.data.lastName,
          redirect: true,
          callbackUrl: `${getNextjsServerAdress()}`,
        });
        
        try {
          await signIn("credentials", {
            email: email,
            password: password,
            userId: responseLogin.data.id,
            firstName: responseLogin.data.firstName,
            lastName: responseLogin.data.lastName,
            isAdmin: true,
            redirect: true,
            callbackUrl: `${getNextjsServerAdress()}/dashboard/etelaatkarbari`,
          });
        } catch (err) {
          console.log(err);
        }
      }
    } else if (loginState === "one_time_code") {
      console.log(
        `start process of one time code with ${email}:${oneTimeCode}`
      );
      // const res = await fetch(`${getNestjsServerAdress()}/api/login`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //         loginMethod: 'userpass',
      //         email: email,
      //         password: password,
      //     }),
      // });
      // toast ورود با موبایل به زودی
      toast.info("ورود با موبایل به زودی اضافه می شود", {
        position: "top-center",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        style: {
          fontFamily: "IranYekanWebBold",
          textAlign: "right",
        },
      });
    } else {
      if (validatePhoneNumber(email as any)) {
        console.log("is phone");
        setLoginState(() => "one_time_code");
      } else if (validateEmail(email as any)) {
        console.log("is email");
        setLoginState(() => "password");
      } else {
        alert("لطفا شماره همراه یا ایمیل وارد کنید");
      }
    }
  };

  return (
    adminAccessToken === process.env.NEXT_PUBLIC_ADMIN_ACCESS_TOKEN && (
      <div className="flex flex-col px-3 gap-2 py-10">
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full flex justify-center mt-10">
            <Image src={masafLogo} alt="" />
          </div>
          <div className="flex gap-2 justify-center">
            <div>به مصاف خوش آمدید</div>
            <Image src={dashIcon} alt="" />
          </div>
          <div className="flex justify-center text-nowrap">
            جهت ثبت نام در سایت مصاف شماره همراه یا ایمیل خود را وارد کنید
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col w-96 gap-2">
            <form className="flex flex-col px-3 gap-2 py-10">
              {loginState === "email" && (
                <div className="flex flex-col gap-2">
                  <input
                    onChange={(e) => setEmail(() => e.target.value)}
                    id="Email"
                    name="email"
                    type="text"
                    placeholder="ایمیل یا شماره همراه را وارد کنید"
                    className="rounded-lg focus:border-1 focus:border-zzomorod p-2 outline-none mt-2 border text-center"
                  />
                  <button
                    onClick={submitForm}
                    className="bg-[#1bd5f6] hover:bg-zzomorod text-white font-bold py-2 px-4 rounded focus:outline-none active:bg-green-800"
                  >
                    ادامه
                  </button>
                </div>
              )}
              {loginState === "password" && (
                <div className="flex flex-col gap-2">
                  <input
                    onChange={(e) => setPassword(() => e.target.value)}
                    name="password"
                    id="Password"
                    type="password"
                    placeholder="رمز عبور را وارد کنید"
                    className="rounded-lg focus:border-1 focus:border-zzomorod p-2 outline-none mt-2 border text-center"
                  />
                  <button
                    onClick={submitForm}
                    className="bg-[#1bd5f6] hover:bg-zzomorod text-white font-bold py-2 px-4 rounded focus:outline-none active:bg-green-800"
                  >
                    ورود
                  </button>
                </div>
              )}
              {loginState === "one_time_code" && (
                <div className="flex flex-col gap-2">
                  <input
                    onChange={(e) => setOnTimeCode(() => e.target.value)}
                    id="one_time_code"
                    type="number"
                    placeholder="ورود کد یکبار مصرف"
                    className="rounded-lg focus:border-1 focus:border-zzomorod p-2 outline-none mt-2 border text-center"
                  />
                  <button
                    onClick={submitForm}
                    className="bg-[#1bd5f6] hover:bg-zzomorod text-white font-bold py-2 px-4 rounded focus:outline-none active:bg-green-800"
                  >
                    ورود
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  );
}

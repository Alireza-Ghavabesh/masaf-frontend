"use client";
import { useState } from "react";
import masafLogo from "../../../public/svgs/auth/masafLogo.svg";
import dashIcon from "../../../public/svgs/auth/dash.svg";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { passwordStrength } from "check-password-strength";
import { getNestjsServerAdress, validateEmail } from "@/utils/utils";
import { Bounce, toast } from "react-toastify";


export default function AdminRegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passStrength, setPassStrength] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  //=======================
  const [phonenumber, setPhonenumber] = useState("");
  const searchParams = useSearchParams();
  const adminAccessToken = searchParams.get("token") ?? "";
  const sendCode = () => {
    // call kavenegar OTP and wait for user to give us its code
    console.log(phonenumber);
  };

  function formIsOk(
    password: string,
    confirmPassword: string,
    passwordStrength: string
  ) {
    const okPasswordStrengthList = ["متوسط", "قوی"];
    const passwordStatus = password !== "";
    const confirmPasswordStatus = confirmPassword !== "";
    const firstNameStatus = firstName !== "";
    const lastNameStatus = lastName !== "";
    const emailStatus = validateEmail(email);
    const passAndConfirmIsSame = password === confirmPassword;
    const passIsStrength = okPasswordStrengthList.includes(passwordStrength);
    const allStatusOk =
      passwordStatus &&
      confirmPasswordStatus &&
      firstNameStatus &&
      lastNameStatus &&
      emailStatus &&
      passIsStrength &&
      passAndConfirmIsSame;
    // if (allStatusOk && passAndConfirmIsSame && passIsStrength) {
    //     return true;
    // }
    return {
      allStatusOk,
      passwordStatus,
      confirmPasswordStatus,
      firstNameStatus,
      lastNameStatus,
      emailStatus,
      passAndConfirmIsSame,
      passIsStrength,
    };
  }

  const submitForm = async (e: any) => {
    e.preventDefault();
    const formStatus = formIsOk(password, confirmPassword, passStrength);
    if (formStatus.allStatusOk) {
      setIsRegistering(() => true);
      console.log({
        loginMethod: "userpass",
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      const res = await fetch(
        `${getNestjsServerAdress()}/auth/register`,
        {
          method: "POST",
          body: JSON.stringify({
            loginMethod: "userpass",
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            isAdmin: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const registerResult = await res.json();
      console.log(registerResult)
      if (registerResult.status === "OK") {
        toast.success("لینک فعال سازی به ایمیل شما فرستاده شد", {
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
        setIsRegistering(() => false);
      } else {
        toast.error("با این ایمیل قبلا ثبت نام کرده اید", {
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
      console.log("all is ok");
      console.log(registerResult);
      setIsRegistering(() => false);
      // router.push('/');
      // console.log(user);
      // console.log({firstName, lastName, email, password})
    } else {
      console.log(formStatus);
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
            جهت ثبت نام مدیر در سایت مصاف شماره همراه یا ایمیل خود را وارد کنید
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col w-96 gap-2">
            <form className="flex flex-col gap-2" onSubmit={submitForm}>
              <input
                disabled={isRegistering}
                onChange={(e) => setFirstName(() => e.target.value)}
                id="Email"
                name="firstname"
                type="text"
                placeholder="نام را وارد کنید"
                className="rounded-lg focus:border-1 focus:border-zzomorod p-2 outline-none mt-2 border text-center"
              />
              <input
                disabled={isRegistering}
                onChange={(e) => setLastName(() => e.target.value)}
                id="Email"
                name="lastname"
                type="text"
                placeholder="نام خانوادگی را وارد کنید"
                className="rounded-lg focus:border-1 focus:border-zzomorod p-2 outline-none mt-2 border text-center"
              />
              <input
                disabled={isRegistering}
                onChange={(e) => setEmail(() => e.target.value)}
                id="Email"
                name="email"
                type="email"
                placeholder="ایمیل را وارد کنید"
                className="rounded-lg focus:border-1 focus:border-zzomorod p-2 outline-none mt-2 border text-center"
              />
              <div className="flex gap-2 items-center">
                {passStrength && <div className="flex justify-center items-center border w-[20%] text-center rounded-lg h-full">
                  {passStrength}
                </div>}
                <input
                  className="w-[80%] h-full  rounded-lg focus:border-1 focus:border-zzomorod p-2 outline-none border text-center"
                  disabled={isRegistering}
                  onChange={async (e) => {
                    await (async () => {
                      if (e.target.value !== "") {
                        const r = passwordStrength(e.target.value).value;
                        setPassword(() => e.target.value);
                        if (r === "Too weak") {
                          setPassStrength(() => "خیلی ضعیف");
                        } else if (r === "Weak") {
                          setPassStrength(() => "ضعیف");
                        } else if (r === "Medium") {
                          setPassStrength(() => "متوسط");
                        } else if (r === "Strong") {
                          setPassStrength(() => "قوی");
                        }
                      } else {
                        setPassStrength(() => "");
                      }
                    })().then(() => {
                      console.log("after set password");
                    });
                  }}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="رمز عبور خود را وارد کنید"
                />

              </div>
              <input
                disabled={isRegistering}
                onChange={(e) => setConfirmPassword(() => e.target.value)}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="رمز عبور خود را تکرار کنید"
                className="rounded-lg focus:border-1 focus:border-zzomorod p-2 outline-none mt-2 border text-center"
              />
              <button
                disabled={isRegistering}
                type="submit"
                className="bg-[#1bd5f6] hover:bg-zzomorod text-white font-bold py-2 px-4 rounded focus:outline-none active:bg-green-800"
              >
                {!isRegistering && "ثبت نام"}
                {isRegistering &&
                  // <IconLoader className="inline-block shrink-0 animate-[spin_2s_linear_infinite] align-middle ltr:mr-2 rtl:ml-2" />
                  "درحال ثبت نام..."}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

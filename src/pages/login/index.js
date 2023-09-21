import Head from "next/head";
import Layout from "@/components/Layout"
import Link from "next/link";
import styles from '@/styles/Form.module.css'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";



export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "1Password"
    },
    validate: login_validate,
    onSubmit
  })

  // validation 
  function login_validate(values) {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required';
    } else if (values.email !== "user@example.com") {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = "Required"
    } else if (values.password !== "1Password") {
      errors.password = "Invalid password"
    }
    return errors
  }
  // **** ends

  // Sign in
  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/"
    })
    console.log(status);
    if(status.ok) {
      router.push(status.url)
    }
  }
// ***** Sign in ends













  return (
    <Layout>
      <Head><title>login</title></Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Welcome</h1>
          <p className="w-3/5 mx-auto text-gray-400">Login to explore an amazing image gallery of your favourite album</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div>
            <div className={styles.input_group}>
              <input
                {...formik.getFieldProps("email")}
                type="email"
                name="email"
                placeholder="user@example.com"
                className={styles.input_text}
                required
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={20} />
              </span>
            </div>
            {formik.errors.email && formik.touched.email ? <p className="text-rose-500 text-end"> {formik.errors.email} </p> : null}
          </div>

          <div>
            <div className={styles.input_group}>
              <input
                {...formik.getFieldProps("password")}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className={styles.input_text}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}
                className="icon flex items-center px-4">
                <HiFingerPrint size={20} />
              </span>
            </div>
            {formik.errors.password && formik.touched.password ? <p className="text-rose-500 text-end"> {formik.errors.password} </p> : null}
          </div>



          <div className="input-button">
            <button type="submit" className={styles.button}>Login</button>
          </div>

        </form>
      </section>
    </Layout>
  )
}

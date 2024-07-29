import type { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
// import Navbar from "@/components/Navbar"; // Adjusted import path to match the correct module path

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  let rout: string;

  if (router.query) {
    rout = JSON.stringify(router.query);
  } else {
    rout = "/home";
  }

  useEffect(() => {
    if (router.pathname !== "/home") {
      router.push("/home");
    }
  }, [router.pathname]);

  return <>{rout}</>;
};

Page.getLayout = function getLayout(page: ReactElement): ReactNode {
  return (
    <>
      {/* <Navbar /> */}
    <Head>
      <title>QP</title>
    </Head>
      {page}
    </>
  );
};

export default Page;

"use client";

import { Suspense } from "react";
import AboutPage from "@/components/root/about";
import Loading from "@/app/loading";
export default function Home() {
  return (
    <div>
      <Suspense
        fallback={
          <>
            <Loading></Loading>
          </>
        }
      >
        <AboutPage></AboutPage>
      </Suspense>
    </div>
  );
}

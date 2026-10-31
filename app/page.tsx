"use client";

import { Suspense } from "react";
import Loading from "./loading";
import HomePage from "@/components/root/home";
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
        <HomePage></HomePage>
      </Suspense>
    </div>
  );
}

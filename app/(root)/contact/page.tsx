"use client";

import { Suspense } from "react";
import Loading from "@/app/loading";
import ContactPage from "@/components/root/contact";
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
        <ContactPage></ContactPage>
      </Suspense>
    </div>
  );
}

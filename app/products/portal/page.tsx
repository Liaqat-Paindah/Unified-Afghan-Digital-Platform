import Loading from "@/app/loading";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const PortalCustomer = dynamic(  () => import("@/components/products/portal")
);



export default function Portal()
{
    return (
        <Suspense fallback={<Loading></Loading>}>
            <PortalCustomer/>
        </Suspense>
    )
}
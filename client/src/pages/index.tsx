import Link from "next/link"
import Header from "@/components/Header";
import Feature from "@/components/Feature";
import Products from "@/components/Products";

export default function HomePage(){
  return(
    <>
        <Header />
        <Feature/>
        <Products/>
    </>

  )
}

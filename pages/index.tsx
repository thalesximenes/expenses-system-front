import Head from "next/head";
import Navbar from "../components/Navbar";
import AddDespesa from "../components/Despesa/AddDespesa";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Expense System</title>
      </Head>
      <Navbar />
      <main>
        <AddDespesa />
      </main>
    </div>
  );
}

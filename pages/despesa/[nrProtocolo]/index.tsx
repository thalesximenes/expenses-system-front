import React from "react";
import Head from "next/head";
import Navbar from "../../../components/Navbar";
import AddEmpenho from "../../../components/Empenho/AddEmpenho";
import DespesaDetail from "../../../components/Despesa/DespesaDetail";

const despesaDetail = () => {
  return (
    <div>
      <div>
        <Head>
          <title>Expense System</title>
        </Head>
        <Navbar />
        <main>
          <DespesaDetail />
          <AddEmpenho />
        </main>
      </div>
    </div>
  );
};

export default despesaDetail;

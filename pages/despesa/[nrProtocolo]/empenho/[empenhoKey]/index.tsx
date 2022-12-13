import React from "react";
import Head from "next/head";
import Navbar from "../../../../../components/Navbar";
import AddPagamento from "../../../../../components/Pagamento/AddPagamento";
import DespesaDetail from "../../../../../components/Empenho/EmpenhoDetail";

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
          <AddPagamento />
        </main>
      </div>
    </div>
  );
};

export default despesaDetail;

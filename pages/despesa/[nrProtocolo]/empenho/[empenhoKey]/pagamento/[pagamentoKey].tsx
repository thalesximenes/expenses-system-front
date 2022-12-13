import React from "react";
import Head from "next/head";
import Navbar from "../../../../../../components/Navbar";
import PagamentoDetail from "../../../../../../components/Pagamento/PagamentoDetail";

const pagamento = () => {
  return (
    <div>
      <div>
        <Head>
          <title>Expense System</title>
        </Head>
        <Navbar />
        <main>
          <PagamentoDetail />
        </main>
      </div>
    </div>
  );
};

export default pagamento;

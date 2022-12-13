import Link from "next/link";
import React from "react";

interface Pagamento {
  anoPgto: number;
  nrPgto: string;
  anoPgtoEmpenho: number;
  nrPgtoEmpenho: string;
  dtPagamento: Date;
  valor: number;
  observacao: string;
}

function addHours(numOfHours: number, dateString: string) {
  let date = new Date(dateString);
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date.toLocaleDateString("pt-BR");
}

const Pagamento = ({ pagamentoOb, nrDespesaOb }: any) => {
  return (
    <tr key={pagamentoOb.nrProtocolo}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link
          href={`/despesa/${nrDespesaOb}/empenho/${pagamentoOb.nrPgtoEmpenho}-${pagamentoOb.anoPgtoEmpenho}/pagamento/${pagamentoOb.nrPgto}-${pagamentoOb.anoPgto}`}
        >
          <div className="text-sm text-gray-500">{pagamentoOb.nrPgto}</div>
        </Link>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link
          href={`/despesa/${nrDespesaOb}/empenho/${pagamentoOb.nrPgtoEmpenho}-${pagamentoOb.anoPgtoEmpenho}/pagamento/${pagamentoOb.nrPgto}-${pagamentoOb.anoPgto}`}
        >
          <div className="text-sm text-gray-500">{pagamentoOb.anoPgto}</div>
        </Link>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link
          href={`/despesa/${nrDespesaOb}/empenho/${pagamentoOb.nrPgtoEmpenho}-${pagamentoOb.anoPgtoEmpenho}/pagamento/${pagamentoOb.nrPgto}-${pagamentoOb.anoPgto}`}
        >
          <div className="text-sm text-gray-500">
            {addHours(3, pagamentoOb.dtPagamento)}
          </div>
        </Link>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link
          href={`/despesa/${nrDespesaOb}/empenho/${pagamentoOb.nrPgtoEmpenho}-${pagamentoOb.anoPgtoEmpenho}/pagamento/${pagamentoOb.nrPgto}-${pagamentoOb.anoPgto}`}
        >
          <div className="text-sm text-gray-500">{pagamentoOb.valor}</div>
        </Link>
      </td>
    </tr>
  );
};

export default Pagamento;

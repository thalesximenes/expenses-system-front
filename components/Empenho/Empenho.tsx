import Link from "next/link";
import React from "react";

interface Empenho {
  anoEmpenho: number;
  nrEmpenho: string;
  nrDespesa: string;
  data: Date;
  valor: number;
  observacao: string;
}

function addHours(numOfHours: number, dateString: string) {
  let date = new Date(dateString);
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date.toLocaleDateString("pt-BR");
}

const Empenho = ({ empenho }: any) => {
  return (
    <tr key={empenho.nrProtocolo}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link
          href={`/despesa/${empenho.nrDespesa}/empenho/${empenho.nrEmpenho}-${empenho.anoEmpenho}`}
        >
          <div className="text-sm text-gray-500">{empenho.nrEmpenho}</div>
        </Link>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link
          href={`/despesa/${empenho.nrDespesa}/empenho/${empenho.nrEmpenho}-${empenho.anoEmpenho}`}
        >
          <div className="text-sm text-gray-500">{empenho.anoEmpenho}</div>
        </Link>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link
          href={`/despesa/${empenho.nrDespesa}/empenho/${empenho.nrEmpenho}-${empenho.anoEmpenho}`}
        >
          <div className="text-sm text-gray-500">
            {addHours(3, empenho.data)}
          </div>
        </Link>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Link
          href={`/despesa/${empenho.nrDespesa}/empenho/${empenho.nrEmpenho}-${empenho.anoEmpenho}`}
        >
          <div className="text-sm text-gray-500">{empenho.valor}</div>
        </Link>
      </td>
    </tr>
  );
};

export default Empenho;

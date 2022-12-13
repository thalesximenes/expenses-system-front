import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Pagamento from "./Pagamento";

const PagamentoList = ({ pagamento }: any) => {
  const router = useRouter();
  const idEmpenhoRouter = router.query.empenhoKey;
  const nrProtocoloDespesa = router.query.nrProtocolo;

  const PAGAMENTO_API_BASE_URL = "http://localhost:8080/api/v1/pagamentos";

  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);

  const [pagamentoSearch, setPagamentoSearch] = useState({
    dtInicial: "",
    dtFinal: "",
  });

  const handleChange = (event: any) => {
    const value = event.target.value;
    setPagamentoSearch({ ...pagamentoSearch, [event.target.name]: value });
  };

  const searchEmpenho = async (e: any) => {
    e.preventDefault();
    let empenhoUrl = idEmpenhoRouter?.toString().replace("-", "/");

    const response = await fetch(
      `${PAGAMENTO_API_BASE_URL}/findByPeriod/${pagamentoSearch.dtInicial}/${pagamentoSearch.dtFinal}/${empenhoUrl}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _pagamentos = await response.json();
    setPagamentos(_pagamentos);
  };

  useEffect(() => {
    if (!router.isReady) return;
    let empenhoUrl = idEmpenhoRouter?.toString().replace("-", "/");
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${PAGAMENTO_API_BASE_URL}/findByEmpenho/${empenhoUrl}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const pagamentos = await response.json();
        setPagamentos(pagamentos);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [pagamento, router.isReady]);

  return (
    <div className="container mx-auto my-8">
      <div className="flex shadow border-b">
        <form
          className="flex h-12 justify-around w-max mx-auto my-4"
          onSubmit={searchEmpenho}
        >
          <label className="flex text-gray-600 font-normal items-center mt-2">
            Data Inicial:
            <p className="text-red-600 text-sm">*</p>
          </label>
          <input
            type="date"
            name="dtInicial"
            value={pagamentoSearch.dtInicial}
            onChange={(e) => handleChange(e)}
            className="h-10 w-80 border mt-2 px-2 py-2 mr-5"
            required
          />
          <label className="flex text-gray-600 font-normal items-center mt-2">
            Data Final:
            <p className="text-red-600 text-sm">*</p>
          </label>
          <input
            type="date"
            name="dtFinal"
            value={pagamentoSearch.dtFinal}
            onChange={(e) => handleChange(e)}
            className="h-10 w-80 border mt-2 px-2 py-2"
            required
          />
          <button
            type="submit"
            className="rounded text-white font-semibold bg-slate-700 hover:bg-slate-400 py-2 px-6 mt-2"
          >
            Buscar
          </button>
        </form>
      </div>
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Número do Pagamento
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Ano do Pagamento
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Data de Pagamento
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Valor do Pagamento
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {pagamentos?.map((pagamentoOb: Pagamento) => (
                <Pagamento
                  pagamentoOb={pagamentoOb}
                  key={pagamentoOb.nrPgto}
                  nrDespesaOb={nrProtocoloDespesa}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default PagamentoList;

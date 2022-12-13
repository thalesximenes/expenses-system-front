import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Empenho from "./Empenho";

const EmpenhoList = ({ empenho }: any) => {
  const router = useRouter();
  const nrDespesaRouter = router.query.nrProtocolo;

  const EMPENHO_API_BASE_URL =
    "https://expenses-system-back.herokuapp.com/api/v1/empenhos";

  const [empenhos, setEmpenhos] = useState<Empenho[]>([]);
  const [loading, setLoading] = useState(true);

  const [empenhoSearch, setEmpenhoSearch] = useState({
    dtInicial: "",
    dtFinal: "",
  });

  const handleChange = (event: any) => {
    const value = event.target.value;
    setEmpenhoSearch({ ...empenhoSearch, [event.target.name]: value });
  };

  const searchDespesa = async (e: any) => {
    e.preventDefault();

    const response = await fetch(
      `${EMPENHO_API_BASE_URL}/findByPeriod/${empenhoSearch.dtInicial}/${empenhoSearch.dtFinal}/${nrDespesaRouter}`,
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
    const _empenhos = await response.json();
    setEmpenhos(_empenhos);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${EMPENHO_API_BASE_URL}/findByDespesa/${nrDespesaRouter}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const empenhos = await response.json();
        setEmpenhos(empenhos);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [empenho, router.isReady]);

  return (
    <div className="container mx-auto my-8">
      <div className="flex shadow border-b">
        <form
          className="flex h-12 justify-around w-max mx-auto my-4"
          onSubmit={searchDespesa}
        >
          <label className="flex text-gray-600 font-normal items-center mt-2">
            Data Inicial:
            <p className="text-red-600 text-sm">*</p>
          </label>
          <input
            type="date"
            name="dtInicial"
            value={empenhoSearch.dtInicial}
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
            value={empenhoSearch.dtFinal}
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
                Número do Empenho
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Ano do Empenho
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Data de Empenho
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Valor do Empenho
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {empenhos?.map((empenho: Empenho) => (
                <Empenho empenho={empenho} key={empenho.nrEmpenho} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EmpenhoList;

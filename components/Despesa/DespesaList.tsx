import React, { useEffect, useState } from "react";
import Despesa from "./Despesa";

const DespesaList = ({ despesa }: any) => {
  const DESPESA_API_BASE_URL = "http://localhost:8080/api/v1/despesas";

  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [loading, setLoading] = useState(true);

  const [despesaSearch, setDespesaSearch] = useState({
    tipo: "",
    dtProtocolo: "",
    credor: "",
  });

  const handleChange = (event: any) => {
    const value = event.target.value;
    setDespesaSearch({ ...despesaSearch, [event.target.name]: value });
  };

  const searchDespesa = async (e: any) => {
    e.preventDefault();

    const response = await fetch(DESPESA_API_BASE_URL + "/busca", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(despesaSearch),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _despesas = await response.json();
    setDespesas(_despesas);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(DESPESA_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const despesas = await response.json();
        setDespesas(despesas);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [despesa]);

  return (
    <div className="container mx-auto my-8">
      <div className="flex shadow border-b">
        <form
          className="flex h-12 justify-around w-max mx-auto my-4"
          onSubmit={searchDespesa}
        >
          <input
            placeholder="Escreva um tipo..."
            type="text"
            name="tipo"
            value={despesaSearch.tipo}
            onChange={(e) => handleChange(e)}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <input
            type="date"
            name="dtProtocolo"
            value={despesaSearch.dtProtocolo}
            onChange={(e) => handleChange(e)}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <input
            placeholder="Escreva um Credor..."
            type="text"
            name="credor"
            value={despesaSearch.credor}
            onChange={(e) => handleChange(e)}
            className="h-10 w-80 border mt-2 px-2 py-2"
          />
          <button
            type="submit"
            className="rounded text-white font-semibold bg-slate-700 hover:bg-slate-400 py-2 px-6  mt-2"
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
                Número Protocolo
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Tipo de Depesa
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Data de Empenho
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Credor
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Situação
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {despesas?.map((despesa: Despesa) => (
                <Despesa despesa={despesa} key={despesa.nrProtocolo} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DespesaList;

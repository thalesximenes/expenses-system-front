import { Transition, Dialog } from "@headlessui/react";
import React from "react";
import { Fragment, useState } from "react";
import DespesaList from "./DespesaList";

const AddDespesa = () => {
  const DESPESA_API_BASE_URL = "http://localhost:8080/api/v1/despesas";

  const [isOpen, setIsOpen] = useState(false);
  const [despesa, setDespesa] = useState({
    nrProtocolo: "",
    tipo: "",
    dtProtocolo: "",
    dtVencimento: "",
    credor: "",
    descricao: "",
    situacaoDespesa: "AguardandoEmpenho",
    valor: "",
  });

  const [responseDespesa, setResponseDespesa] = useState({
    nrProtocolo: "",
    tipo: "",
    dtProtocolo: "",
    dtVencimento: "",
    credor: "",
    descricao: "",
    situacaoDespesa: "AguardandoEmpenho",
    valor: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event: any) => {
    const value = event.target.value;
    setDespesa({ ...despesa, [event.target.name]: value });
  };

  const saveDespesa = async (e: any) => {
    e.preventDefault();

    const response = await fetch(DESPESA_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(despesa),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _despesa = await response.json();
    setResponseDespesa(_despesa);
    reset(e);
  };

  const reset = (e: any) => {
    e.preventDefault();
    setDespesa({
      nrProtocolo: "",
      tipo: "",
      dtProtocolo: "",
      dtVencimento: "",
      credor: "",
      descricao: "",
      situacaoDespesa: "AguardandoEmpenho",
      valor: "",
    });
    setIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className=" flex h-12 justify-between">
          <button
            onClick={openModal}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold text-sm hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Adicionar Despesa
          </button>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screnn px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity=100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity=0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Adicionar Nova Despesa
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                    <form onSubmit={saveDespesa}>
                      <div className="h-14 mt-4">
                        <label className="flex text-gray-600 text-sm font-normal">
                          Tipo de Despesa
                          <p className="text-red-600 text-sm">*</p>
                        </label>
                        <input
                          type="text"
                          name="tipo"
                          value={despesa.tipo}
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2"
                          required
                        ></input>
                      </div>
                      <div className="h-14 mt-4">
                        <label className="flex text-gray-600 text-sm font-normal">
                          Credor da Despesa
                          <p className="text-red-600 text-sm">*</p>
                        </label>
                        <input
                          type="text"
                          name="credor"
                          value={despesa.credor}
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2"
                          required
                        ></input>
                      </div>
                      <div className="h-14 mt-4">
                        <label className="flex text-gray-600 text-sm font-normal">
                          Valor da Despesa
                          <p className="text-red-600 text-sm">*</p>
                        </label>
                        <input
                          type="number"
                          name="valor"
                          value={despesa.valor}
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2"
                          required
                        ></input>
                      </div>
                      <div className="h-14 mt-4">
                        <label className="flex text-gray-600 text-sm font-normal">
                          Data do Protocolo
                          <p className="text-red-600 text-sm">*</p>
                        </label>
                        <input
                          type="date"
                          name="dtProtocolo"
                          value={despesa.dtProtocolo}
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2"
                          required
                        ></input>
                      </div>
                      <div className="h-14 mt-4">
                        <label className="flex text-gray-600 text-sm font-normal">
                          Data de Vencimento
                          <p className="text-red-600 text-sm">*</p>
                        </label>
                        <input
                          type="date"
                          name="dtVencimento"
                          value={despesa.dtVencimento}
                          onChange={(e) => handleChange(e)}
                          className="h-10 w-96 border mt-2 px-2 py-2"
                          required
                        ></input>
                      </div>
                      <div className="h-28 mt-4">
                        <label className="flex text-gray-600 text-sm font-normal">
                          Descrição da Despesa
                          <p className="text-red-600 text-sm">*</p>
                        </label>
                        <textarea
                          name="descricao"
                          value={despesa.descricao}
                          onChange={(e) => handleChange(e)}
                          className="h-24 w-96 border mt-2 px-2 py-2"
                          required
                        ></textarea>
                      </div>
                      <div className="h-8 my-4 space-x-4 pt-4 text-right">
                        <button
                          type="submit"
                          className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={reset}
                          className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                        >
                          Fechar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <DespesaList despesa={responseDespesa} />
    </>
  );
};

export default AddDespesa;

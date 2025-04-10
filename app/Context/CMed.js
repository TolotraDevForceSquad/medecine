import { createContext, useContext, useState } from "react";
import { API_URL } from "../../config";

const ctxMed = createContext();

export const MedProvider = ({ children }) => {
    const [id, setId] = useState('');
    const [nom, setNom] = useState('');
    const [nbj, setnbj] = useState('');
    const [txj, setTxj] = useState('');
    const [med, setMed] = useState([]);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showOption, setShowOption] = useState(false);

    const [stats, setStats] = useState([]);


    // Liste tous les médecins avec prestation
    const list_med = async () => {
        try {
            const response = await fetch(`${API_URL}/api/medecins`);
            const data = await response.json();
            console.log("Liste des medecins", data);
            setMed(data);
        } catch (error) {
            console.error("Erreur lors du chargement des médecins :", error);
            return [];
        }
    };

    const select = (i,n,j,t) => {
        setId(i);
        setNom(n);
        setnbj(j);
        setTxj(t);
    }

    const clear = () => {
        setId("");
        setNom("");
        setnbj("");
        setTxj("");
    }

    // Ajouter un médecin
    const add_med = async (nom, nb_jours, taux_journalier) => {
        try {
            const response = await fetch(`${API_URL}/api/medecins`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ nom, nb_jours, taux_journalier }),
            });
            const data = await response.json();
            console.log("Liste des medecins", data);
            list_med();
            clear();
            setShowAdd(false);
            get_stats();
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            throw error;
        }
    };

    // Supprimer un médecin
    const del_med = async (id) => {
        try {
            await fetch(`${API_URL}/api/medecins/${id}`, {
                method: "DELETE",
            });
            list_med();
            setShowOption(false);
            clear();
            get_stats();
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            throw error;
        }
    };

    // Modifier un médecin
    const up_med = async (id, nom, nb_jours, taux_journalier) => {
        try {
            await fetch(`${API_URL}/api/medecins/${id}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ nom, nb_jours, taux_journalier }),
            });
            list_med();
            clear();
            setShowAdd(false);
            setShowEdit(false);
            setShowOption(false);
            get_stats();
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
            throw error;
        }
    };

    const get_stats = async () => {
        try {
            const response = await fetch(`${API_URL}/api/medecins/stats`);
            const data = await response.json();
            console.log("Statistiques des médecins", data);
            setStats(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des stats :", error);
            return { total: 0, min: 0, max: 0 };
        }
    };

    return(
        <ctxMed.Provider value={{
            id, setId,
            nom, setNom,
            nbj, setnbj,
            txj, setTxj,
            med, setMed,
            list_med,
            showAdd, setShowAdd,
            showEdit, setShowEdit,
            showOption, setShowOption,
            select,
            add_med,
            clear,
            del_med,
            up_med,
            get_stats,
            stats,
        }}>
            {children}
        </ctxMed.Provider>
    )
}

export const useMed = () => {
    const context = useContext(ctxMed);
    if(!context) {
        throw new Error("Mauvais");
    }
    return context;
}
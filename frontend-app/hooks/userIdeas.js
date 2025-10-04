import { useState, useEffect } from "react";
import * as ideaService from "../services/ideaServices";

export default function useIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const data = await ideaService.getIdeas();
      setIdeas(data);
      setError(null);
    } catch (err) {
      setError("Failed to load ideas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return { ideas, setIdeas, setIdeas, fetchIdeas, loading, error };
}

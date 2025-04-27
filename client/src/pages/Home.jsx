import { useQuery } from "@tanstack/react-query";
import api from "../api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Sort from "../components/Sort";
import Search from "../components/Search";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 500);
  const [order, setOrder] = useState(null);

  //params that will send to API
  const params = {
    search: debouncedTerm,
    order,
  };

  // get recipes from api folder
  // ***USER TARIFI ALMAK ICIN GET ISTEGI YAPAR O YUZDEN GET YAZIYORUZ. ONCE BASE URL GELIR O YUZDEN ONU YAZDIK SONRA USER NE YAZARSA URL DEN SONRA END POINT OLUR VE ONUNLA ILGILI TARIF GELIR, KOFTE ISE KOFTEYLE ILGILI ,TAVUK ISE TAVUKLA ILGILI. BUDA PARAM'A DENK GELDIGI ICIN {params} olarak BASE URL DAN SONRA EKLEDIK: api.get("/api/v1/recipes", { params })
  // React Query caches results based on the queryKey. If the key doesn’t change, it won’t re-fetch — so even if params changes, it ignores it unless the key is updated too. Adding order into the key ensures a new fetch is triggered every time the user selects “Ascending” or “Descending”.
  // queryFn is the function that runs to fetch the data.
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["recipes", debouncedTerm, order],
    queryFn: () =>
      api.get("/api/v1/recipes", { params }).then((res) => res.data.recipes),
  });

  return (
    <main className="overflow-y-auto">
        <Search setSearchTerm={setSearchTerm} />
      <section>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error info={error.message} refetch={refetch} />
        ) : (
          <>
              <div className="flex justify-between items-center">
              <h1 className="text-3xl my-5"> 
              {data.length} {data.length === 1 ? "Recipe" : "Recipes"} found
              </h1>

              <Sort setOrder={setOrder} />
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.map((i, key) => (
                <Card key={i.id} recipe={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
import { useParams, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";

const Edit = () => {
  const navigate = useNavigate();

  //url'den düzenlenecek elemanın id'sini al
  const { id } = useParams();

  //apiden düzenlenecek elemanın bilgilerinin al
  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });

  console.log(data);

  //api güncelleme isteği atacak mutasyonuhazırla
  const { isLoading, mutate } = useMutation({
    mutationFn: (updateData) => api.patch(`/api/v1/recipes/${id}`, updateData),

    onSuccess: () => {
      navigate("/");
      toast.success("Update is successfull");
    },

    onError: () => {
      toast.error("Error happened");
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Recipe</h1>

      <Form isLoading={isLoading} mutate={mutate} recipeData={data} />
    </div>
  );
};

export default Edit;

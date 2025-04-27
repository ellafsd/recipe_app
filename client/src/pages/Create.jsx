import Form from "../components/Form";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// 1. User fills out the form on this page.
// 2. The Form component calls mutate(formData).
// 3. mutate() sends a POST request to /api/v1/recipes.
// 4. If successful → toast + redirect home.
// 5. If error → error toast appears.
const Create = () => {
  const navigate = useNavigate();

  // Sending the new recipe to the backend with useMutation -handles POST request
  // Showing toast messages and redirecting on success or failure
  // mutationFn: Func that actually sends the data to backend using your api (axios)
  const { isLoading, mutate } = useMutation({
    mutationFn: (newRecipe) => api.post("/api/v1/recipes", newRecipe),

    onSuccess: () => {
      toast.success("New Recipe created.");
      navigate("/");
    },
    onError: () => {
      toast.error("An error happened");
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Create A New Recipe</h1>

      <Form isLoading={isLoading} mutate={mutate} />
    </div>
  );
};

export default Create;

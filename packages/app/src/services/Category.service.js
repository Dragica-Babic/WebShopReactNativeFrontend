

const getCategories= async({ setCategories })=>{
    try {
      const response = await fetch("http://localhost:8080/categories");
      const json = await response.json();
      setCategories(json);
    } catch (error) {
      console.error(error);
    }
  };

  const CategoryService={
    getCategories
  }

  export default CategoryService;
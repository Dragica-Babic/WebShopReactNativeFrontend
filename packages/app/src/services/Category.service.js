import url from '../environment/config.json';

const getCategories = async ({ setCategories }) => {
  try {
    const response = await fetch(url.url + "/categories");
    const json = await response.json();
    setCategories(json);
  } catch (error) {
    console.error(error);
  }
};

const CategoryService = {
  getCategories
}

export default CategoryService;
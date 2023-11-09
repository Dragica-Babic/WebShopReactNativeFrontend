

const getItems= async({setLoading, setItems})=>{
  try {
    const response = await fetch("http://localhost:8080/items/list");
    const json = await response.json();
    setItems(json);
  } catch (error) {
    console.error(error);
  } 
  finally{
    setLoading(false);
  }
};

const getItemById= async ({id, setItem})=>{
  try{
    const response=await fetch("http://localhost:8080/items/"+id);
    const json = await response.json();
    console.log(json);
    setItem(json);
  }
  catch(error){
    console.error(error);
  };
}

const ItemService={
  getItems,
  getItemById
}

export default ItemService;
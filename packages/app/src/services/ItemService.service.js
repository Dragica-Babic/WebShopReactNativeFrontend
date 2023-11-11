

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

const getActiveOffers=async({userId, setItems, setLoading})=>{
  try{
    const response = await fetch(`http://localhost:8080/items/user/${userId}`);
    const json=await response.json();
    setItems(json.content);
  } catch (error) {
    console.error(error);
  } 
  finally{
    setLoading(false);
  }
}

const getFinishedOffers=async({userId, setItems, setLoading})=>{
  try{
    const response=await fetch(`http://localhost:8080/items/user-finished/${userId}`);
    const json=await response.json();
    setItems(json.content);
  } catch (error) {
    console.error(error);
  } 
  finally{
    setLoading(false);
  }
}

const getHistory=async({userId, setItems, setLoading})=>{
  try{
    const response=await fetch(`http://localhost:8080/items/history/${userId}`);
    const json=await response.json();
    setItems(json.content);
  } catch (error) {
    console.error(error);
  } 
  finally{
    setLoading(false);
  }
}

const getItemById= async ({id, setItem})=>{
  try{
    const response=await fetch(`http://localhost:8080/items/${id}`);
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
  getItemById,
  getActiveOffers,
  getFinishedOffers,
  getHistory
}

export default ItemService;
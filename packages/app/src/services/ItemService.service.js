import url from '../environment/config.json';

const getItems= async({setLoading, setItems})=>{
  try {
    const response = await fetch(url.url+"/items/list");
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
    const response = await fetch(url.url+`/items/user/${userId}`);
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
    const response=await fetch(url.url+`/items/user-finished/${userId}`);
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
    const response=await fetch(url.url+`/items/history/${userId}`);
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
    const response=await fetch(url.url+`/items/${id}`);
    const json = await response.json();
    console.log(json);
    setItem(json);
  }
  catch(error){
    console.error(error);
  };
}

const buyItem= async({id, userId})=>{
  try{
    const response=await fetch(url.url+`/items/buy/${id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:userId
    });
    return response;
  }catch(error){
    console.error(error);
  }
}

const ItemService={
  getItems,
  getItemById,
  getActiveOffers,
  getFinishedOffers,
  getHistory,
  buyItem
}

export default ItemService;
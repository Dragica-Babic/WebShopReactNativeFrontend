import { Platform } from 'react-native';
import url from '../environment/config.json';

const getItems = async ({ page, searchTerm, categoryId, lowerPrice, upperPrice, location }) => {
  try {
    const response = await fetch(url.url + `/items/all?page=${page}&size=6&search=${searchTerm}&categoryId=${categoryId}&lowerPrice=${lowerPrice}&upperPrice=${upperPrice}&location=${location}`, {
      method: "GET"
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const getActiveOffers = async ({ page, userId }) => {
  try {
    const response = await fetch(url.url + `/items/user/${userId}?page=${page}&size=4`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

const getFinishedOffers = async ({ userId, page }) => {
  try {
    const response = await fetch(url.url + `/items/user-finished/${userId}?page=${page}&size=4`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

const getHistory = async ({ userId, page }) => {
  try {
    const response = await fetch(url.url + `/items/history/${userId}?page=${page}&size=4`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

const getItemById = async ({ id }) => {
  try {
    const response = await fetch(url.url + `/items/${id}`);
    const json = await response.json();
    return json;
  }
  catch (error) {
    console.error(error);
  };
}

const buyItem = async ({ id, userId }) => {
  try {
    const response = await fetch(url.url + `/items/buy/${id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: userId
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

const addItem = async (item) => {
  const response = await fetch(url.url + `/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item)
  })
  if (!response.ok)
    throw new Error("Error in addItem function!");
  return response.json();

}

const updateItem = async (id, item) => {
  const response = await fetch(url.url + `/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item)
  })
  if (!response.ok)
    throw new Error("Error in addItem function!");
  return response.json();
}

const uploadImage = async (id, image) => {
  const formData = new FormData();
  if (Platform.OS === 'android') {
    let uri = image.uri;
    let filename = image.uri.split('/').pop();
    let type = 'image/' + filename.split('.').pop();
    formData.append("file", { uri: uri, name: filename, type: type });
  }

  else if (Platform.OS === 'web') {
    let imageUri = image.uri.replace("file://", "");
    let parts = imageUri.split(';');
    let type = parts[0].replace('data:', "");
    let ext = type.split('/').pop();
    let fileName = id + "." + ext;
    console.log(fileName + " " + type);
    formData.append("file", { uri: imageUri, name: fileName, type: type });
  }

  try {
    await fetch(url.url + `/items/${id}/upload-image`, {
      method: "POST",
      body: formData,

    })
  } catch (error) {
    console.log("greska:" + error)
  }
}

const deleteItem = async ({ id }) => {
  await fetch(url.url + `/items/delete/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const ItemService = {
  getItems,
  getItemById,
  getActiveOffers,
  getFinishedOffers,
  getHistory,
  buyItem,
  addItem,
  updateItem,
  uploadImage,
  deleteItem
}

export default ItemService;
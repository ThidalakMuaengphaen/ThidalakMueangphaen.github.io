import axios from "axios";

const shopNoti = async (shop_email) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}shopacceptjob/${shop_email}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { shopNoti };
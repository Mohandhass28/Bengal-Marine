import { AxiosInstance } from "@/api";

const useSetApiDataForTen = <D extends Object>({
  endpoint,
}: {
  endpoint: string;
}) => {
  const SetFunction = async (datas?: D) => {
    const responce = await AxiosInstance.post(`${endpoint}`, datas, {
      headers: {
        "X-Powered-By": "Express",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((val) => {
      console.log(val.data);
      return val.data;
    });
    return responce;
  };

  return { SetFunction };
};

export default useSetApiDataForTen;

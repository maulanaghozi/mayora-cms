import axios from "axios";
import history from "./history";
import queryString from "query-string";
export const baseURL = process.env.REACT_APP_BASE_URL;

const CancelToken = axios.CancelToken;
let cancel;

export const http = async (params, progress, setProgress) => {
  try {
    let percentCompleted;
    params.showMessage =
      params.showMessage !== undefined ? params.showMessage : true;
    let auth = params.token ? params.token : localStorage.getItem("mayora-cms");
    let query = params.query
      ? "?" + queryString.stringify(params.query, { arrayFormat: "bracket" })
      : "";
    let config = {
      method: params.method ? params.method : "GET",
      baseURL: baseURL,
      url: params.path + (query || ""),
      data: params.data ? params.data : {},
      headers: {
        Authorization: "Bearer " + (auth ? auth : ""),
        "Content-Type": params.content_type
          ? params.content_type
          : "application/json",
      },
      onUploadProgress: function (progressEvent) {
        percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (progress || progress === 0) {
          setProgress(percentCompleted);
        }
      },
      responseType: params.responseType || "",
    };

    let { data } = await axios(config, {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
    });

    return data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      // if (err.response.status === 401) {
      //   localStorage.removeItem("mayora-cms");
      //   history.push("/auth/login");
      //   alert(err.response.data.message);
      // }

      if (typeof cancel === "function") {
        cancel();
      }
      console.log(err.response);
      return err.response.data.message;
    }
  }
};

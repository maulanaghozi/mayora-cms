import { useState, useEffect } from "react";
import { http } from "../../utility/http";
import { useAlert } from "react-alert";

const masterPaths = [
  "posting/master/production-type",
  "posting/master/job-role",
  "profiles/master/body-type",
  "profiles/master/clothes-size",
  "profiles/master/ethnicity",
  "profiles/master/experience",
  "profiles/master/gender",
  "profiles/master/hair-type",
  "profiles/master/location",
  "profiles/master/recruiter-type",
  "profiles/master/skin-color",
];

const masterName = [
  "productionType",
  "jobRole",
  "bodyType",
  "clothesSize",
  "ethnicity",
  "experience",
  "gender",
  "hairType",
  "location",
  "recruiterType",
  "skinColor",
];

export default function useMasterData() {
  const [masterData, setMasterData] = useState(null);

  useEffect(() => {
    fetchMasterData();
  }, []);

  const alert = useAlert();

  const fetchMasterData = () => {
    const fetching = masterPaths.map(path => {
      return http({
        method: "GET",
        path,
      });
    });

    Promise.all(fetching).then(results => {
      if (Array.isArray(results)) {
        const data = {};

        results.forEach((result, index) => {
          if (result) {
            data[masterName[index]] = result.payload;
          } else {
            alert.error("failed to fetch master data");
          }
        });

        setMasterData(data);
      } else {
        alert.error("failed to fetch master data");
      }
    });
  };

  return masterData;
}

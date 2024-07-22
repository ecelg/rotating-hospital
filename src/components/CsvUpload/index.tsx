import React, { useState } from "react";
import { useCSVReader } from "react-papaparse";
import aws from "aws-sdk";
import { Button, Input, Spin, Steps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { hasAllIHospitalFields, sampleHospital } from "@/util/typeCheck";
import _ from "lodash";
import { error } from "console";
const SECRET = process.env.NEXT_PUBLIC_CSV_UPLOAD_SECRET;
type CsvUploadPropsType = {
  setShowUploadAlert: (show: boolean) => void;
  setUploadAlertType: (type: "success" | "error") => void;
};
const CsvUpload: React.FC<CsvUploadPropsType> = ({
  setShowUploadAlert,
  setUploadAlertType,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [secret, setSecret] = useState<string>("");
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const { CSVReader } = useCSVReader();
  const validateSecret = () => {
    if (secret == SECRET) {
      setIsValidated(true);
      setSecret("");
    } else {
      setIsValidated(false);
    }
  };
  const convertCsvArrayToJson = (csv: any[][]) => {
    const colNames: string[] = csv[0];
    const rows = csv.slice(1);
    let jsonData = rows.map((row: any[]) => {
      const obj: { [key: string]: any } = {};
      colNames.forEach((key: string, index: number) => {
        // account for extra trailing comma
        if (key != "") {
          obj[key] = row[index];
        }
      });
      if (!colNames.includes("NumOfOutpatientVisits")) {
        obj["NumOfOutpatientVisits"] = -1;
      }
      if (!colNames.includes("NumOfInpatientVisits")) {
        obj["NumOfInpatientVisits"] = -1;
      }
      if (!hasAllIHospitalFields(obj)) {
        return {};
      }
      return obj;
    });
    jsonData = jsonData.filter((obj) => {
      return !_.isEmpty(obj);
    });
    return jsonData;
  };
  const handleFileUpload = async (data: { data: any[][] }) => {
    setIsLoading(true);
    try {
      const jsonData = convertCsvArrayToJson(data.data);
      const fileContent = JSON.stringify(jsonData);
      const s3 = new aws.S3({
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
          secretAccessKey: process.env
            .NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
        },
        region: process.env.NEXT_PUBLIC_AWS_REGION as string,
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
        Key: process.env.NEXT_PUBLIC_AWS_JSON_FILE_NAME as string,
        Body: fileContent,
        ContentType: "application/json",
      };

      await s3.putObject(params).promise();
      setUploadAlertType("success");
    } catch (error) {
      setUploadAlertType("error");
      console.log(error);
    } finally {
      setShowUploadAlert(true);
      setIsLoading(false);
      setTimeout(() => {
        setShowUploadAlert(false);
        window.location.reload();
      }, 200000);
    }
  };

  return (
    <Steps
      direction="vertical"
      current={isValidated ? 1 : 0}
      items={[
        {
          title: "Validate secret token",
          description: (
            <div className="flex gap-2">
              <Input
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                onPressEnter={validateSecret}
              />
              <Button type="primary" onClick={validateSecret}>
                Validate
              </Button>
            </div>
          ),
        },
        {
          title: (
            <CSVReader onUploadAccepted={handleFileUpload}>
              {({ getRootProps }: any) => (
                <div className="flex gap-2">
                  <Button
                    {...getRootProps()}
                    className="btn btn-primary"
                    type="primary"
                    disabled={!isValidated}
                    icon={
                      isLoading ? (
                        <Spin spinning={isLoading} />
                      ) : (
                        <UploadOutlined />
                      )
                    }
                  >
                    Click to Upload New CSV
                  </Button>
                </div>
              )}
            </CSVReader>
          ),
        },
      ]}
    />
  );
};

export default CsvUpload;

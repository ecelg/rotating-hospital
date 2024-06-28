# APAC Hospitals Map

## Configuring AWS Access Credentials

1. Navigate to `Security Credentials` in dropdown located at top right corner of your AWS management Console
2. At the `Access keys` section, create a new access key for this project.
3. Note down the `Access key` and `Secret access key` generated and update the `NEXT_PUBLIC_AWS_ACCESS_KEY_ID` and `NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY` environment variables respectively.

## Setting Up AWS S3 Bucket For CSV Upload

1. Navigate to AWS Management Console and set region as Asia-Pacific(Singapore) (You can use other regions, but remember to update the environment variable `NEXT_PUBLIC_AWS_REGION`)
2. Navigate to S3 and click on `Create bucket`
3. Set the `Bucket Name` as `apac-hospitals` (You can use other names, but remember to update the corresponding environment variable `NEXT_PUBLIC_AWS_BUCKET_NAME`)
4. Uncheck `Block all public access` as we want our web app to upload and retrieve files from the bucket.
5. Leave all other fields as default and click `Create bucket`
6. After the bucket is up, click on `Permissions`
7. Update the `Bucket Policy` as shown below

   ```JSON
   {
        "Version": "2012-10-17",
        "Id": "Policy1719369141815",
        "Statement": [
            {
                "Sid": "Stmt1719369140341",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::apac-hospitals/*"
            }
        ]
    }

   ```

8. Update `Cross-origin resource sharing (CORS)` as shown below

   ```JSON
   [
        {
            "AllowedHeaders": [
                "*"
            ],
            "AllowedMethods": [
                "PUT",
                "HEAD",
                "GET"
            ],
            "AllowedOrigins": [
                "*"
            ],
            "ExposeHeaders": []
        }
    ]
   ```

## CSV Upload Format

You can upload new .csv files for hospitals be there any update to the set of hospitals you wish to show on the map. The .csv file must conform to the following format

- Columns and data type

| Index  | Country | HealthcareGroupName | NumOfSites | SiteName | Beds                           | TrakProduct | NumOfOutpatientVisits | NumOfInpatientVisits  | Latitude | Longitude |
| ------ | ------- | ------------------- | ---------- | -------- | ------------------------------ | ----------- | --------------------- | --------------------- | -------- | --------- |
| number | string  | string              | number     | string   | number, 0 if unknown or clinic | string      | number, -1 if known   | number, -1 if unknown | number   | number    |

- No field should be left blank

## Running the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#!/bin/bash

curl -X POST "localhost:9200/"http://localhost:5601/api/apm/sourcemaps" \?pretty" -H 'Content-Type: application/json' -d'
-H \u0027Content-Type: multipart/form-data\u0027 \
-H \u0027kbn-xsrf: true\u0027 \
-H \u0027Authorization: ApiKey ${YOUR_API_KEY}\u0027 \ 
-F \u0027service_name=foo\u0027 \
-F \u0027service_version=$SERVICEVERSION\u0027 \
-F \u0027bundle_filepath=/test/e2e/general-usecase/app.min.js\u0027 \
-F \u0027sourcemap=@./dist/app.min.js.map\u0027
'
